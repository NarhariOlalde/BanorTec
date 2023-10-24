from flask import Flask, request, jsonify, send_file, render_template, redirect, url_for
import pandas as pd
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
import numpy as np
import random
import json
from datetime import datetime, timedelta

# Generate charts
import matplotlib.pyplot as plt
import io

# IBM bucket
import ibm_boto3
from ibm_botocore.client import Config
import boto3, botocore
import os
import matplotlib.image as mpimg

app = Flask(__name__)

# Load the model
model = tf.keras.models.load_model('calendario/content/calendario-model')

# Setup IBM cloud object storage
# COS_ENDPOINT = "cos://us-south/danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j/"
# COS_API_KEY_ID = "bylsPMhEbxXR55OAxSzuZohYlzmqeTaSvpORMGhTwtZT"
# COS_INSTANCE_CRN = "crn:v1:bluemix:public:cloud-object-storage:global:a/4adbfdc681b3f2442de266f31c7da19a:fcdc4de9-6a7b-457b-bcc4-50e063663208:bucket:danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j"
# COS_AUTH_ENDPOINT = "https://iam.cloud.ibm.com/oidc/token"
# COS_BUCKET = "danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j"
# Create a client
# cos = ibm_boto3.client(
#     "s3",
#     ibm_api_key_id=COS_API_KEY_ID,
#     ibm_service_instance_id=COS_INSTANCE_CRN,
#     ibm_auth_endpoint=COS_AUTH_ENDPOINT,
#     config=Config(signature_version="oauth"),
#     endpoint_url=COS_ENDPOINT
# )

# Connection to AWS 
AWS_BUCKET_NAME="practicantesbucket"
AWS_ACCESS_KEY="AKIA4BO45WH2U5NOA4WX"
AWS_SECRET_ACCESS_KEY="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"
AWS_DOMAIN="http://practicantesbucket.s3.amazonaws.com/"
AWS_REGION_NAME="us-east-1"

# Create an S3 client
cos = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION_NAME
)

# Secuenciar los datos
def crear_secuencias(data, len_secuencia):
    secuencias = []
    etiquetas = []

    for i in range(len(data) - len_secuencia):
        secuencia = data.iloc[i:i+len_secuencia].values
        etiqueta = data.iloc[i+len_secuencia].get('Concepto')
        secuencias.append(secuencia)
        etiquetas.append(etiqueta)

    return secuencias, etiquetas
    
@app.route('/recordatorioAutomatico', methods=['POST'])
def predict():
    # Preparar datos para la prediccion de un modelo
    # --------------------------------------
    data = {
        'Fecha': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09', '2023-01-10'],
        'Cantidad': [100, 150, 200, 125, 175, 190, 210, 50, 300, 220],
        'Concepto': ['Pago', 'Factura', 'Transferencia', 'Depósito', 'Compra', 'Pago', 'Factura', 'Transferencia', 'Depósito', 'Compra']
    }
    unique_concepts = ["Compra", "Pago", "Factura", "Transferencias", "Deposito"] # Definir diferencias a partir del archivo CSV

    df = pd.DataFrame(data)

    # Convertir la fecha
    df['Fecha'] = pd.to_datetime(df['Fecha'])
    df['Dias_desde_inicio'] = (df['Fecha'] - df['Fecha'].min()).dt.days

    # Codificación one-hot para 'Concepto'
    conceptos_dummies = pd.get_dummies(df['Concepto'], prefix='Concepto')
    df = pd.concat([df, conceptos_dummies], axis=1)

    # Normalizar la cantidad de cantidad
    scaler = StandardScaler()
    df['Cantidad_escalada'] = scaler.fit_transform(df[['Cantidad']])

    # Crear secuencia
    len_secuencia = 9
    caracteristicas = df[['Dias_desde_inicio', 'Cantidad_escalada']]
    secuencias, etiquetas = crear_secuencias(caracteristicas, len_secuencia)

    # La forma de 'secuencia_a_predecir' debe coincidir con la forma de entrada que el modelo espera
    secuencia_a_predecir = np.array(secuencias)  # Asegurarte de que tiene la forma adecuada, por ejemplo (1, 10, 2) si tu secuencia es de longitud 10 y tienes 2 características

    # data = request.json
    # prediction = model.predict(data['input'])

    prediccion = model.predict(secuencia_a_predecir)

    # Obtener la categoría predicha (el índice de la probabilidad más alta)
    categoria_predicha_idx = np.argmax(prediccion[0])
    categorias = list(unique_concepts)
    categoria_predicha = categorias[categoria_predicha_idx]

    print(f"El próximo pago se predice que será para el concepto: {categoria_predicha}")

    return {
        "recordatorio": "Hola Jos, how es 26 de Febrero! ¿Quieres pagar $700.00 de 'Colegiatura Vale' como cada mes?"
    }

@app.route('/tarjetas', methods=['POST'])
def tarjetasDisponibles():
    return [
        {
            "Tarjeta": "Tarjeta oro",
            "Disponible": "$9,000",
            "Numero": "****8090"
        },
        {
            "Tarjeta": "Tarjeta enlace",
            "Disponible": "$13,500",
            "Numero": "****1785"
        },
        {
            "Tarjeta": "Tarjeta nómina",
            "Disponible": "$2,500",
            "Numero": "****1234"
        }
    ]

@app.route('/recordatorioManual', methods=['POST'])
def recordatorioManual():
    return {
        "recordatorio": "dogtime.com/wp-content/uploads/sites/12/2011/01/GettyImages-1193591781-e1689606163833.jpg"
    }

def upload_image(buf, filename):
    # Use the IBM Cloud Object Storage client (or any other client) to upload the buffered image
    try:
        # Assuming you're using the IBM Cloud Object Storage client and the 'cos' client is initialized
        cos.upload_fileobj(buf, AWS_BUCKET_NAME, filename)
        return True
    except Exception as e:
        print(f"Error uploading file: {e}")
        return False

@app.route('/generate_chart', methods=['POST'])
def generate_chart():
    # Read file
    file = "datos.csv"
    df = pd.read_csv(file)

    # Filter the DataFrame for the desired value in the 'column_name' column
    # TODO: Cambiar por nombres de categorias
    categoria_1 = '7 ELEVEN PARICTURIN'  # Replace with the value you're interested in
    categoria_2 = '7 ELEVEN NVA FAISAN'  # Replace with the value you're interested in
    categoria_3 = 'CARLS JR GONZALITOS'  # Replace with the value you're interested in
    categoria_4 = 'OXXO PASEO NORA MTY'  # Replace with the value you're interested in
    month = "NOV"

    # Filter by 'FEC_PROC' containing 'MAR'
    filtro_mes = df[df['FEC_PROC'].str.contains(month)]

    # Filtro de categoria
    filtro_categoria_1 = filtro_mes[filtro_mes['NOM_COM'] == categoria_1]
    filtro_categoria_2 = filtro_mes[filtro_mes['NOM_COM'] == categoria_2]
    filtro_categoria_3 = filtro_mes[filtro_mes['NOM_COM'] == categoria_3]
    filtro_categoria_4 = filtro_mes[filtro_mes['NOM_COM'] == categoria_4]

    total_rows = df.shape[0]
    count_of_value_1 = round((len(filtro_categoria_1)*2500.0 / total_rows) * 100.0, 1)
    count_of_value_2 = round((len(filtro_categoria_2)*2500.0 / total_rows) * 100.0, 1)
    count_of_value_3 = round((len(filtro_categoria_3)*2500.0 / total_rows) * 100.0, 1)
    count_of_value_4 = round((len(filtro_categoria_4)*2500.0 / total_rows) * 100.0, 1)
    count_otros = round(100.0 - count_of_value_1 - count_of_value_2 - count_of_value_3 - count_of_value_4)

    # Sample data: labels and corresponding sizes
    colors = ['#FAC310', '#B01657', '#E4415D', '#FF8029', '#808080']
    labels = ['Renta', 'Transporte', 'Comida', 'Diversión', "Otros"] # TODO: Cambiar por categorias
    sizes = [count_of_value_1, count_of_value_2, count_of_value_3, count_of_value_4, count_otros] # TODO: Quitar el peso extra

    # Plotting the pie chart
    fig, ax = plt.subplots()
    wedges, texts = ax.pie(sizes, labels=[f"{size}%" for size in sizes], colors=colors, startangle=310, textprops={'fontsize': 18})

    # Set the color of each label to match its segment
    for text, color in zip(texts, colors):
        text.set_color(color)

    ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.\

    # Adding legends
    ax.legend(wedges, labels, loc="center left", bbox_to_anchor=(1, 0, 0.5, 1), frameon=False, fontsize=16)

    # Adjust layout to account for the external legend
    plt.tight_layout()

    ### Add a hole in the pie  
    # Hole - a white-colored circle of radius 0.65
    hole = plt.Circle((0, 0), 0.4, facecolor='white')

    label_text = month.lower().capitalize()
    ax.text(0, 0, label_text, ha='center', va='center', fontsize=25, color='gray')

    # Current Figure ( plt.gcf() ) 
    # --> Current Axis ( gca() ) 
    # --> add the hole 
    plt.gcf().gca().add_artist(hole)

    # Save the plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    return send_file(buf, mimetype='image/png')

    # Use the IBM Cloud Object Storage client to upload the file
    # try:
    #     cos.upload_fileobj(buf, COS_BUCKET, "imagen")
    #     return jsonify({"status": "File uploaded successfully"}), 200
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

    # Uploda to AWS 
    imageName = f"chart-{random.randint(0, 10000000)}.png"
    success = upload_image(buf, imageName)
    url = f"https://practicantesbucket.s3.amazonaws.com/{imageName}"

    if success:
        return jsonify({"status": "File uploaded successfully", "url": url}), 200
    else:
        return jsonify({"error": "Failed to upload image"}), 500

@app.route('/gasto_mensual', methods=['POST'])
def gasto_mensual():
    # Read file
    file = "datos.csv"
    df = pd.read_csv(file)
    mes = "MAR"
    categoria_mensual = '7 ELEVEN PARICTURIN' # TODO: cambiar a categoria actual

    # Filters
    filtro_mes = df[df['FEC_PROC'].str.contains(mes)]
    filtro_categoria = filtro_mes[filtro_mes['NOM_COM'] == categoria_mensual]
    monto_total = sum(filtro_categoria['IMP_DES'].tolist())

    return {
        "Gasto mensual" : monto_total,
        "Categoria": categoria_mensual
    }

@app.route('/check_card', methods=['POST'])
def check_card():
    # Read the JSON
    data = request.json
    userId = data.get('_userId')
    user = get_user(userId)

    # Funcion para checar vencimiento de la tarjeta
    # ---------------------------------------------
    fecha_actual = datetime.now()
    siguiente_mes = fecha_actual + timedelta(days=30)
    message = ""

        
    # Funcion para solicitar aumento de la linea de credito
    for tarjeta in user["Tarjetas"]:
        if tarjeta["lineaCredito"]:
            isCreditLow = ((tarjeta["saldo"] / tarjeta["lineaCredito"]) * 100) <= 5.0
            message = "Hola " + user["Alias"] + " considera que solo quedan " + str(tarjeta["saldo"]) + ".00 MXN disponibles en tu tarjeta ****" + str(tarjeta["numero"][-4:]) + " ¿Quieres solicitar un aumento en tu línea de crédito?"

    # Itera sobre las tarjetas para saber a cuales les falta menos de un mes
    for tarjeta in user["Tarjetas"]:
        month, year = tarjeta["vencimiento"].split('/')
        vencimiento_date = datetime.strptime(f"{month}/20{year}", '%m/%Y')

        # Check if "vencimiento" date is equal to or less than one month from now
        if vencimiento_date <= siguiente_mes:
            message = "Hola " + user["Alias"] + ", tu tarjeta " + tarjeta["nombre"] + " ****" + str(tarjeta["numero"][-4:] + " se vence en un mes. ¿Quieres solicitar una nueva?")

    return {"message": message}

@app.route('/get_random_user', methods=['POST'])
def get_random_user():
    filename = "usuarios.json"
    users = read_json_from_file(filename)

    return {
        "CreatedUser" : users[random.randint(0, 2)]["_userId"],
    }

def get_user(userId):
    # Read the users info
    filename = "usuarios.json"
    users = read_json_from_file(filename)
    # Get the matching user
    matching_user = [user for user in users if user["_userId"] == userId]
    # Return user
    return matching_user[0]

def read_json_from_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data
# @app.route('/generate_progress', methods=['POST'])
# def generate_progress():

#     # Progress value
#     progress_value = 65

#     # Set the figure and axis
#     fig, ax = plt.subplots(figsize=(3, 0.5))  # Adjust the size to your preference

#     # Adjustments for padding
#     title_adjustment = 0.2  # Increase this value to move the title further up
#     subtitle_adjustment = 1  # Increase this value to move the subtitle further down
#     chart_adjustment = 1  # Increase this value to move the chart further down

#     # Original positions
#     bar_position = -0.6 - chart_adjustment  # Adjusted position for the bar
#     title_y = 1 + title_adjustment
#     subtitle_y = 0.1 - subtitle_adjustment

#     ax.barh(bar_position, 100, color='lightgray')
#     ax.barh(bar_position, progress_value, color='blue')

#     # Set the x-axis limits to represent the percentage (0-100%)
#     ax.set_xlim(0, 100)
#     ax.set_ylim(-1.1 - chart_adjustment, 1 + title_adjustment)  # Adjust these values for the desired view

#     # Removing y-axis label for cleaner look
#     ax.get_yaxis().set_visible(False)

#     # Display the progress value on top of the blue bar
#     ax.text(progress_value + 2, bar_position, f'{progress_value}%', va='center', color='white' if progress_value > 50 else 'black')

#     # Title with icon
#     img = mpimg.imread('image.png')
#     ax.imshow(img, aspect='auto', extent=[2, 8, title_y - 0.2, title_y + 0.2], zorder=2)  # Adjust numbers in 'extent' for positioning and sizing
#     ax.text(10, title_y, 'Progress Bar', va='center', ha='left', fontsize=14, fontweight='bold', color='orange')

#     # Add subtitle below the title
#     ax.text(10, subtitle_y, 'Subtitle text here', va='center', ha='left', fontsize=12, color='orange')

#     # Optional: Removing the axis
#     ax.axis('off')

#     # Save the plot to a BytesIO object
#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)

#     return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
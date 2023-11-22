from helpers.users import get_user
from flask import request, request, jsonify, send_file, render_template, redirect, url_for, Response
import matplotlib.pyplot as plt
import io
import pandas as pd
from selenium import webdriver
import imgkit
from PIL import Image, ImageDraw, ImageFont
import random
import math
import imgkit

# AWS bucket
import ibm_boto3
from ibm_botocore.client import Config
import boto3, botocore
import os

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

def gasto_mensual(categoria, mes, userId):
    # Read file
    file = "../DataClusterMCC/test_dataset_with_predictions.csv"
    df = pd.read_csv(file)

    # Traducir categorias
    translation_dict = {
        "Comida": "Food",
        "Transporte": "Transport"
    }
    categoria = translation_dict[categoria]

    # Filters
    filtro_mes = df[df['FEC_PROC'].str.contains(mes)]
    filtro_categoria = filtro_mes[filtro_mes['Predicted_Category'] == categoria]
    monto_total = math.ceil(sum(filtro_categoria['IMP_DES'].tolist()) / 10)

    # Obtener la salud financiera por una categoria
    user = get_user(userId)
    presupuesto = user["Presupuestos"][categoria]
    estado = "buena"

    if(monto_total / presupuesto > 0.95):
        estado = "mala"
    elif(monto_total / presupuesto > 85):
        estado = "media"

    gastosTotalesMes = math.ceil(sum(filtro_mes['IMP_DES'].tolist()) / 10)

    return {
        "Categoria": categoria,
        "GastoMensual" : "{:,.0f}".format(monto_total),
        "GastosTotales": "{:,.0f}".format(gastosTotalesMes),
        "SaludFinanciera": estado
    }

def generate_chart(mes):
    # Read file
    file = "../DataClusterMCC/test_dataset_with_predictions.csv"
    df = pd.read_csv(file)
    filtro_mes = df[df['FEC_PROC'].str.contains(mes)]

    # Filtro de categoria
    etiquetas = ["Food", "Transport", "Clothes", "Health", "Entertainment", "Technology", "Services", "Viajes", "Casa", "Vehiculo", "Departamental", "Super", "Mascotas", "Deportes", "Educacion", "Belleza", "Compras en Linea", "Otros"]
    categorias = [{"categoria": categoria, "count": 0} for categoria in etiquetas]

    for index, obj in enumerate(categorias):
        categorias[index]["count"] = round((len(filtro_mes[filtro_mes['Predicted_Category'] == obj["categoria"]]) / len(filtro_mes)) * 100.0, 1)
    top_6 = sorted(categorias, key=lambda x: x['count'], reverse=True)[:6]

    count_otros = round(100.0 - sum(item["count"] for item in top_6), 1)

    # Sample data: labels and corresponding sizes
    colors = ['#FAC310', '#B01657', '#E4415D', '#FF8029','#E35122','#E6201B', '#808080']
    labels =  [item["categoria"] for item in top_6] + ["Otros"]
    sizes =  [item["count"] for item in top_6] + [count_otros]

    # Plotting the pie chart
    fig, ax = plt.subplots()
    wedges, texts = ax.pie(sizes, labels=[f"{size}%" for size in sizes], colors=colors, startangle=310, textprops={'fontsize': 18})

    # Set the color of each label to match its segment
    for text, color in zip(texts, colors):
        text.set_color(color)

    ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.\

    # Adding legends
    ax.legend(wedges, labels, loc="center left", bbox_to_anchor=(1.1, 0, 0.5, 1), frameon=False, fontsize=16)

    # Adjust layout to account for the external legend
    plt.tight_layout()

    ### Add a hole in the pie  
    # Hole - a white-colored circle of radius 0.65
    hole = plt.Circle((0, 0), 0.4, facecolor='white')

    label_text = mes.lower().capitalize()
    ax.text(0, 0, label_text, ha='center', va='center', fontsize=25, color='gray')

    # Current Figure ( plt.gcf() ) 
    # --> Current Axis ( gca() ) 
    # --> add the hole 
    plt.gcf().gca().add_artist(hole)

    # Save the plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    # return send_file(buf, mimetype='image/png')

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

def rounded_rectangle(draw, xy, corner_radius, fill=None, outline=None):
    upper_left_point = xy[0]
    bottom_right_point = xy[1]
    draw.rectangle(
        [
            (upper_left_point[0], upper_left_point[1] + corner_radius),
            (bottom_right_point[0], bottom_right_point[1] - corner_radius)
        ],
        fill=fill, outline=outline
    )
    draw.rectangle(
        [
            (upper_left_point[0] + corner_radius, upper_left_point[1]),
            (bottom_right_point[0] - corner_radius, bottom_right_point[1])
        ],
        fill=fill, outline=outline
    )
    draw.pieslice([upper_left_point, (upper_left_point[0] + corner_radius*2, upper_left_point[1] + corner_radius*2)], 180, 270, fill=fill, outline=outline)
    draw.pieslice([(bottom_right_point[0] - corner_radius*2, bottom_right_point[1] - corner_radius*2), bottom_right_point], 0, 90, fill=fill, outline=outline)
    draw.pieslice([(upper_left_point[0], bottom_right_point[1] - corner_radius*2), (upper_left_point[0] + corner_radius*2, bottom_right_point[1])], 90, 180, fill=fill, outline=outline)
    draw.pieslice([(bottom_right_point[0] - corner_radius*2, upper_left_point[1]), (bottom_right_point[0], upper_left_point[1] + corner_radius*2)], 270, 360, fill=fill, outline=outline)

def crea_imagen_mes(categoriasFlags, mes, userId):
    categoriasFlags = [categoriasFlags[0]["value"]]
    
    # Traducir categorias
    translation_dict = {
        "Comida": "Food",
        "Transporte": "Transport"
    }
    english_words = [translation_dict[word] for word in categoriasFlags if word in translation_dict]
    categoriasFlags = english_words

    categorias = {
        "Food": {"category": "Comida", "icon": "faUtensils", "color": "rgb(255, 128, 41)"},
        "Transport": {"category": "Transporte", "icon": "faBus", "color": "rgba(190, 82, 128)"}, 
    }

    # Obtener el presupuesto de la categoria
    user = get_user(userId)

    # Read file
    file = "../DataClusterMCC/test_dataset_with_predictions.csv"
    df = pd.read_csv(file)

    # Filtro de mes
    filtro_mes = df[df['FEC_PROC'].str.contains(mes, na=False)]

    gastosPorCategoria = []

    for categoria in categoriasFlags:
        presupuesto = user["Presupuestos"][categoria]

        # Filtro de categoria para conocer el valor total
        filtro_categoria = filtro_mes[filtro_mes['Predicted_Category'] == categoria]
        gastado = sum(filtro_categoria['IMP_DES'].tolist()) / 10 # TODO: Remove the /10
        porcentaje = str(math.ceil((gastado / presupuesto) * 100))

        gastosPorCategoria.append({
        "categoria" : categorias[categoria]["category"],
        "presupuesto": "{:,.0f}".format(presupuesto),
        "porcentaje": porcentaje,
        "gastado": "{:,.0f}".format(gastado),
        "color": categorias[categoria]["color"],
        "icon": categorias[categoria]["icon"]
    })

    return gastosPorCategoria

def generate_progress_bar(percentage, budget, spent):
    # Dimensions
    width, height = 400, 120
    progress_height = 30
    corner_radius = 15

    # Create a new image with white background
    img = Image.new('RGB', (width, height), color = 'white')
    draw = ImageDraw.Draw(img)

    # Draw the progress bar background with rounded corners
    rounded_rectangle(draw, [10, height/2 - progress_height/2, width-10, height/2 + progress_height/2], corner_radius, fill="lightgray")

    # Draw the progress with rounded corners
    progress_width = (width-20) * (percentage / 100.0)
    if progress_width > corner_radius * 2:
        rounded_rectangle(draw, [10, height/2 - progress_height/2, 10 + progress_width, height/2 + progress_height/2], corner_radius, fill="orange")
    else:
        draw.rectangle([10, height/2 - progress_height/2, 10 + progress_width, height/2 + progress_height/2], fill="orange")

    # Load a font
    font = ImageFont.truetype("arial.ttf", 25)

    # Draw text
    draw.text((10, 10), "Comida", fill="black", font=font)
    draw.text((10, 40), f"Presupuesto ${budget}", fill="black", font=font)
    draw.text((width-100, 10), f"{percentage}%", fill="black", font=font)
    draw.text((width-100, 40), f"${spent}", fill="black", font=font)
    draw.text((10, height-40), "Gastado", fill="black", font=font)

    return img
    
# This function returns a BytesIO stream for Flask to serve
def get_image_stream(img):
    img_byte_array = io.BytesIO()
    img.save(img_byte_array, format="PNG")
    img_byte_array.seek(0)
    return img_byte_array


def upload_image(buf, filename):
    # Use the IBM Cloud Object Storage client (or any other client) to upload the buffered image
    try:
        # Assuming you're using the IBM Cloud Object Storage client and the 'cos' client is initialized
        cos.upload_fileobj(buf, AWS_BUCKET_NAME, filename)
        return True
    except Exception as e:
        print(f"Error uploading file: {e}")
        return False
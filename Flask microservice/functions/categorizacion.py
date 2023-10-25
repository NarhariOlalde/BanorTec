from helpers.users import get_user
from flask import request, request, jsonify, send_file, render_template, redirect, url_for
import matplotlib.pyplot as plt
import io
import pandas as pd

def gasto_mensual():
    # Read file
    file = "data/datos.csv"
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

def generate_chart():
    # Read file
    file = "../DataClusterMCC/test_dataset_with_predictions.csv"
    df = pd.read_csv(file)

    # Filtro de mes
    month = "NOV"
    filtro_mes = df[df['FEC_PROC'].str.contains(month)]

    # Filtro de categoria
    etiquetas = ["Food", "Transport", "Clothes", "Health", "Entertainment", "Technology", "Services", "Viajes", "Casa", "Vehiculo", "Departamental", "Super", "Mascotas", "Deportes", "Educacion", "Belleza", "Compras en Linea", "Otros"]
    categorias = [{"categoria": categoria, "count": 0} for categoria in etiquetas]

    for index, obj in enumerate(categorias):
        print(obj["categoria"])
        print(filtro_mes['Predicted_Category'] == obj["categoria"])

        print(len(filtro_mes[filtro_mes['Predicted_Category'] == obj["categoria"]]))

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
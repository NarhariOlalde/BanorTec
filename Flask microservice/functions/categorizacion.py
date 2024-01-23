from helpers.users import get_user
from helpers.db import mongo
import io
import pandas as pd
import math
import re

def gasto_mensual(categoria, mes, userId):
    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.test_dataset_with_predictions.find()))

    # Filtro de mes
    pattern = r'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre'

    # Busca el mes o regresa el mes actual
    match = re.search(pattern, mes, re.IGNORECASE)
    if match:
        filtro_mes = df[df['FEC_PROC'].str.contains(match.group()[:3].upper())]
    else:
        filtro_mes = df[df['FEC_PROC'].str.contains("NOV")]

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
    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.test_dataset_with_predictions.find()))

    # Filtro de mes
    pattern = r'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre'

    # Busca el mes especifico o regresa el actual
    match = re.search(pattern, mes, re.IGNORECASE)
    if match:
        filtro_mes = df[df['FEC_PROC'].str.contains(match.group()[:3].upper())]
        mes = match.group()[:3].upper()
    else:
        filtro_mes = df[df['FEC_PROC'].str.contains("NOV")]
        mes = "NOV"
    
    # Filtro de categoria
    etiquetas = ["Comida", "Transporte", "Ropa", "Salud", "Entretenimiento", "Tecnologia", "Servicios", "Viajes", "Casa", "Vehiculo", "Departamental", "Super", "Mascotas", "Deportes", "Educacion", "Belleza", "Compras en Linea", "Otros"]
    categorias = [{"categoria": categoria, "count": 0} for categoria in etiquetas]
    colors = ['#FAC310', '#B01657', '#E4415D', '#FF8029','#E35122','#E6201B', '#808080']
    total = 0

    for index, obj in enumerate(categorias):
        categorias[index]["count"] = round(sum(filtro_mes[filtro_mes['Predicted_Category'] == obj["categoria"]]['IMP_DES'].tolist()), 2)
        total += categorias[index]["count"]
        
    # Agregar categoria de "Otros"
    top_6 = sorted(categorias, key=lambda x: x['count'], reverse=True)[:6]
    count_otros = round(total - sum(item['count'] for item in top_6), 2)
    top_6.append({"categoria": "Otros", "count": count_otros})

    for index, category in enumerate(top_6):
        color_index = index % len(colors)
        category['color'] = colors[color_index]

    return top_6

def crea_imagen_mes(categoriasFlags, mes, userId):
    categoriasFlags = [categoriasFlags[0]["value"]]

    categorias = {
        "Comida": {"category": "Comida", "color": "rgb(255, 128, 41)"},
        "Transporte": {"category": "Transporte", "color": "rgba(190, 82, 128)"}, 
        "Ropa": {"category": "Ropa", "color": "rgba(190, 82, 128)"}, 
        "Salud": {"category": "Salud", "color": "rgba(190, 82, 128)"}, 
        "Entretenimiento": {"category": "Entretenimiento", "color": "rgba(190, 82, 128)"}, 
        "Tecnologia": {"category": "Tecnologia", "color": "rgba(190, 82, 128)"}, 
        "Servicios": {"category": "Servicios", "color": "rgba(190, 82, 128)"}, 
        "Viajes": {"category": "Viajes", "color": "rgba(190, 82, 128)"}, 
        "Casa": {"category": "Casa", "color": "rgba(190, 82, 128)"},
        "Vehiculo": {"category": "Vehiculo", "color": "rgba(190, 82, 128)"}, 
        "Departamental": {"category": "Departamental", "color": "rgba(190, 82, 128)"}, 
        "Super": {"category": "Super", "color": "rgba(190, 82, 128)"}, 
        "Mascotas": {"category": "Mascotas", "color": "rgba(190, 82, 128)"}, 
        "Deportes": {"category": "Deportes", "color": "rgba(190, 82, 128)"}, 
        "Educacion": {"category": "Educacion", "color": "rgba(190, 82, 128)"}, 
        "Belleza": {"category": "Belleza", "color": "rgba(190, 82, 128)"},  
        "Compras en Linea": {"category": "Compras en Linea", "color": "rgba(190, 82, 128)"},  
        "Otros": {"category": "Otros", "color": "rgba(190, 82, 128)"},  
    }

    # Obtener el presupuesto de la categoria
    user = get_user(userId)

    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.test_dataset_with_predictions.find()))

    # Filtro de mes
    pattern = r'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre'
    # Busca el mes especifico o regresa el actual
    match = re.search(pattern, mes, re.IGNORECASE)
    if match:
        filtro_mes = df[df['FEC_PROC'].str.contains(match.group()[:3].upper())]
    else:
        filtro_mes = df[df['FEC_PROC'].str.contains("NOV")]

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
    })

    return gastosPorCategoria
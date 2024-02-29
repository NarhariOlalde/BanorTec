from helpers.users import get_user
from helpers.db import mongo
import io
import pandas as pd
import math
import re

spanish_to_english = {
    'enero': 'January',
    'febrero': 'February',
    'marzo': 'March',
    'abril': 'April',
    'mayo': 'May',
    'junio': 'June',
    'julio': 'July',
    'agosto': 'August',
    'septiembre': 'September',
    'octubre': 'October',
    'noviembre': 'November',
    'diciembre': 'December'
}
def gasto_mensual(categoria, mes, userId):
    categoria = categoria.capitalize()
    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.test_dataset_with_predictions.find()))

    # Filtro de mes
    pattern = r'enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre'

    # Busca el mes o regresa el mes actual
    match = re.search(pattern, mes, re.IGNORECASE)
    if match:
        # filtro_mes = df[df['FEC_PROC'].str.contains(match.group()[:3].upper())]
        mes_ingles = spanish_to_english.get(match.group(0).lower(), match.group(0))
        filtro_mes = df[df['FEC_PROC'].str.contains(mes_ingles[:3].upper())]
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
        mes_ingles = spanish_to_english.get(match.group(0).lower(), match.group(0))
        filtro_mes = df[df['FEC_PROC'].str.contains(mes_ingles[:3].upper())]
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

categoriasColor = {
    "Comida": "rgb(255, 128, 41)",
    "Transporte": "rgba(190, 82, 128)",
    "Ropa": "#FAC310",
    "Salud": "#B01657",
    "Entretenimiento": "#E4415D",
    "Tecnologia": "#E35122",
    "Servicios": "#E6201B",
    "Viajes": "rgb(255, 128, 41)",
    "Casa": "rgba(190, 82, 128)",
    "Vehiculo": "#FAC310",
    "Departamental": "#B01657",
    "Super": "#E4415D",
    "Mascotas": "#E35122",
    "Deportes": "#E6201B",
    "Educacion": "rgb(255, 128, 41)",
    "Belleza": "rgba(190, 82, 128)",
    "Compras en Linea": "#FAC310",
    "Otros": "rgba(190,82,128)",
}
   
def crea_imagen_mes(categoriasFlags, mes, userId):
    categoriasFlags = [categoriasFlags[0]["value"]]

    categorias = {
        "Comida": {"category": "Comida", "color": categoriasColor["Comida"]},
        "Transporte": {"category": "Transporte", "color": categoriasColor["Transporte"]}, 
        "Ropa": {"category": "Ropa", "color": categoriasColor["Ropa"]}, 
        "Salud": {"category": "Salud", "color": categoriasColor["Salud"]}, 
        "Entretenimiento": {"category": "Entretenimiento", "color": categoriasColor["Entretenimiento"]}, 
        "Tecnologia": {"category": "Tecnologia", "color": categoriasColor["Tecnologia"]}, 
        "Servicios": {"category": "Servicios", "color": categoriasColor["Servicios"]}, 
        "Viajes": {"category": "Viajes", "color": categoriasColor["Viajes"]}, 
        "Casa": {"category": "Casa", "color": categoriasColor["Casa"]},
        "Vehiculo": {"category": "Vehiculo", "color": categoriasColor["Vehiculo"]}, 
        "Departamental": {"category": "Departamental", "color": categoriasColor["Departamental"]}, 
        "Super": {"category": "Super", "color": categoriasColor["Super"]}, 
        "Mascotas": {"category": "Mascotas", "color": categoriasColor["Mascotas"]}, 
        "Deportes": {"category": "Deportes", "color": categoriasColor["Deportes"]}, 
        "Educacion": {"category": "Educacion", "color": categoriasColor["Educacion"]}, 
        "Belleza": {"category": "Belleza", "color": categoriasColor["Belleza"]},  
        "Compras en Linea": {"category": "Compras en Linea", "color": categoriasColor["Compras en Linea"]},  
        "Otros": {"category": "Otros", "color": categoriasColor["Transporte"]},  
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
        # filtro_mes = df[df['FEC_PROC'].str.contains(match.group()[:3].upper())]
        mes_ingles = spanish_to_english.get(match.group(0).lower(), match.group(0))
        filtro_mes = df[df['FEC_PROC'].str.contains(mes_ingles[:3].upper())]
    else:
        filtro_mes = df[df['FEC_PROC'].str.contains("NOV")]

    gastosPorCategoria = []

    for categoria in categoriasFlags:
        categoria = categoria.capitalize()
        presupuesto = user["Presupuestos"][categoria]

        # Filtro de categoria para conocer el valor total
        filtro_categoria = filtro_mes[filtro_mes['Predicted_Category'] == categoria]
        gastado = math.ceil(sum(filtro_categoria['IMP_DES'].tolist()) / 10)
        porcentaje = str(math.ceil((gastado / presupuesto) * 100))

        gastosPorCategoria.append({
        "categoria" : categorias[categoria]["category"],
        "presupuesto": "{:,.0f}".format(presupuesto),
        "porcentaje": porcentaje,
        "gastado": "{:,.0f}".format(gastado),
        "color": categorias[categoria]["color"],
    })

    return gastosPorCategoria
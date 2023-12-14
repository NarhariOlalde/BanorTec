# import pandas as pd
# from sklearn.preprocessing import StandardScaler
# import tensorflow as tf
# import numpy as np

# Load the model
# model = tf.keras.models.load_model('calendario/content/calendario-model')

def recordatorioAutomatico():
    # Preparar datos para la prediccion de un modelo
    # --------------------------------------
    # data = {
    #     'Fecha': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09', '2023-01-10'],
    #     'Cantidad': [100, 150, 200, 125, 175, 190, 210, 50, 300, 220],
    #     'Concepto': ['Pago', 'Factura', 'Transferencia', 'Depósito', 'Compra', 'Pago', 'Factura', 'Transferencia', 'Depósito', 'Compra']
    # }
    # unique_concepts = ["Compra", "Pago", "Factura", "Transferencias", "Deposito"] # Definir diferencias a partir del archivo CSV

    # df = pd.DataFrame(data)

    # # Convertir la fecha
    # df['Fecha'] = pd.to_datetime(df['Fecha'])
    # df['Dias_desde_inicio'] = (df['Fecha'] - df['Fecha'].min()).dt.days

    # # Codificación one-hot para 'Concepto'
    # conceptos_dummies = pd.get_dummies(df['Concepto'], prefix='Concepto')
    # df = pd.concat([df, conceptos_dummies], axis=1)

    # # Normalizar la cantidad de cantidad
    # scaler = StandardScaler()
    # df['Cantidad_escalada'] = scaler.fit_transform(df[['Cantidad']])

    # # Crear secuencia
    # len_secuencia = 9
    # caracteristicas = df[['Dias_desde_inicio', 'Cantidad_escalada']]
    # secuencias, etiquetas = crear_secuencias(caracteristicas, len_secuencia)

    # # La forma de 'secuencia_a_predecir' debe coincidir con la forma de entrada que el modelo espera
    # secuencia_a_predecir = np.array(secuencias)  # Asegurarte de que tiene la forma adecuada, por ejemplo (1, 10, 2) si tu secuencia es de longitud 10 y tienes 2 características

    # # data = request.json
    # # prediction = model.predict(data['input'])

    # prediccion = model.predict(secuencia_a_predecir)

    # # Obtener la categoría predicha (el índice de la probabilidad más alta)
    # categoria_predicha_idx = np.argmax(prediccion[0])
    # categorias = list(unique_concepts)
    # categoria_predicha = categorias[categoria_predicha_idx]

    # print(f"El próximo pago se predice que será para el concepto: {categoria_predicha}")

    return {
        "recordatorio": "Hola Jos, hoy es 26 de Febrero! ¿Quieres pagar $700.00 de 'Colegiatura Vale' como cada mes?"
    }

def recordatorioManual():
    return {
        "recordatorio": "recordatorio"
    }

def tarjetasDisponibles():
    return [
        {
            "Tarjeta": "Oro",
            "Disponible": "9,000",
            "Numero": "****8090"
        },
        {
            "Tarjeta": "Enlace",
            "Disponible": "13,500",
            "Numero": "****1785"
        },
        {
            "Tarjeta": "Nómina",
            "Disponible": "2,500",
            "Numero": "****1234"
        }
    ]

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
from datetime import datetime
from helpers.users import get_user
import pandas as pd
import math

meses = {
    "January": "Enero",
    "February": "Febrero",
    "March": "Marzo",
    "April": "Abril",
    "May": "Mayo",
    "June": "Junio",
    "July": "Julio",
    "August": "Agosto",
    "September": "Septiembre",
    "October": "Octubre",
    "November": "Noviembre",
    "December": "Diciembre"
}

def recordatorioAutomatico():
    # Read file
    file = "./data/projectPaymentReminder_MONTHLY.csv"
    df = pd.read_csv(file)

    currentIdUser = "1234"
    today = datetime.now().date()

    # Busca el usuario actual y los recordatorios correspondientes a hoy em "REMINDER_DATE"
    filtro_usuario_dia = df[(df['CUST_NUM'] == int(currentIdUser)) & (df['REMINDER_DATE'] == today.strftime("%Y-%m-%d"))]
    datosRecordatorio = filtro_usuario_dia.iloc[0]

    # Cuenta destino:
    acc_dest = get_user(str(datosRecordatorio["ACC_DEST"]))["Nombre"]

    # Monto (Prediccion):
    pred_monto = math.ceil(datosRecordatorio["PRED_MONTO"])

    # Dia actual en espanol
    dia, mes = today.strftime("%d de %B").split(' de ')
    fecha_recordatorio = f"{dia} de {meses.get(mes, mes)}"

    return {
        "recordatorio": f"Hola Jos, hoy es {fecha_recordatorio}! ¿Quieres pagar ${pred_monto}.00 a la cuenta de '{acc_dest}' como cada mes?"
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
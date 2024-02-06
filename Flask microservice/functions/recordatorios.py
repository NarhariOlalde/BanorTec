from datetime import datetime
from helpers.users import get_user
from helpers.db import mongo
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
    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.projectPaymentReminder_MONTHLY.find()))

    currentIdUser = "1234"
    today = datetime.now().date()

    # Busca el usuario actual y los recordatorios correspondientes a hoy em "REMINDER_DATE"
    filtro_usuario_dia = df[(df['CUST_NUM'] == int(currentIdUser)) & (df['REMINDER_DATE'] == today.strftime("%Y-%m-%d"))]

    listaRecordatorios = []

    for datosRecordatorio in filtro_usuario_dia.iloc:
        # Cuenta destino:
        acc_cust = get_user(currentIdUser)["Alias"]
        acc_dest = get_user(str(datosRecordatorio["ACC_DEST"]))["Nombre"]

        # Monto (Prediccion):
        pred_monto = math.ceil(datosRecordatorio["PRED_MONTO"])

        # Dia actual en espanol
        dia, mes = today.strftime("%d de %B").split(' de ')
        fecha_recordatorio = f"{dia} de {meses.get(mes, mes)}"

        listaRecordatorios.append({
            "customerAlias": acc_cust,
            "fechaRecordatorio": fecha_recordatorio,
            "predMonto": pred_monto,
            "accountDestination": acc_dest
        })

    return listaRecordatorios

def recordatorioManual():
    return {
        "recordatorio": "recordatorio"
    }

def tarjetasDisponibles():
    currentIdUser = "1234"
    tarjetas_cust = get_user(currentIdUser)["Tarjetas"]

    return tarjetas_cust
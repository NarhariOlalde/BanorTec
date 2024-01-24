from helpers.users import get_user
from datetime import datetime, timedelta

def check_card(userId):
    user = get_user(userId)
    message = ""

    tarjetaNombre = ""
    numero = ""
    saldo = ""
    fechaVencimiento = ""

    # F: para solicitar aumento de la linea de credito
    for tarjeta in user["Tarjetas"]:
        if tarjeta["lineaCredito"]:
            isCreditLow = ((tarjeta["saldo"] / tarjeta["lineaCredito"]) * 100) <= 5.0
            if(isCreditLow):
                message = "Hola " + user["Alias"] + " considera que solo quedan " + str(tarjeta["saldo"]) + ".00 MXN disponibles en tu tarjeta ****" + str(tarjeta["numero"][-4:]) + " ¿Quieres solicitar un aumento en tu línea de crédito?"
                tarjetaNombre = "oro"
                numero = "****" + str(tarjeta["numero"][-4:])
                saldo = tarjeta["saldo"]
                fechaVencimiento = tarjeta["vencimiento"]

    # F: Revisar el vencimiento de la tarjeta
    fecha_actual = datetime.now()
    siguiente_mes = fecha_actual + timedelta(days=30)
    for tarjeta in user["Tarjetas"]:
        month, year = tarjeta["vencimiento"].split('/')
        vencimiento_date = datetime.strptime(f"{month}/20{year}", '%m/%Y')

        # Revisar la fecha de "vencimiento" que sea menor a un mes de ahora
        if vencimiento_date <= siguiente_mes:
            message = "Hola " + user["Alias"] + ", tu tarjeta " + tarjeta["nombre"] + " ****" + str(tarjeta["numero"][-4:] + " se vence en un mes. ¿Quieres solicitar una nueva?")
            tarjetaNombre = tarjeta["nombre"]
            numero = "****" + str(tarjeta["numero"][-4:])
            saldo = tarjeta["saldo"]
            fechaVencimiento = tarjeta["vencimiento"]
            
    return {
        "message": message,
        "tarjetaNombre": tarjetaNombre,
        "numero": numero,
        "saldo": "{:,.0f}".format(saldo),
        "fechaVencimiento": fechaVencimiento
    }

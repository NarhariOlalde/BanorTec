from helpers.users import get_user
from helpers.db import mongo
import pandas as pd
import math

def saludFinanciera(userId, mes, costo):
    # Obtener el usuario
    user = get_user(userId)
    costo = int(costo)

    # Read MongoDB database
    df = pd.DataFrame(list(mongo.db.test_dataset_with_predictions.find()))

    # Filtro de mes
    filtro_mes = df[df['FEC_PROC'].str.contains(mes, na=False)]
    gastoMensual = math.ceil(sum(filtro_mes['IMP_DES'].tolist()) / 10) - 1000 # TODO: Remove the /100
    ingresoMensual = user["IngresoMensual"]
    saldoTotal = ingresoMensual

    # Calculo de salud financiera
    calculoSalud = gastoMensual/ingresoMensual
    # Ahorro del 40% de Ingresos - Gastos
    ahorroMensual = (ingresoMensual - gastoMensual) * 0.4
    frase = ""

    if(calculoSalud > 0.95):
        estadoSalud = "baja"
        frase = "Tus ingresos son casi iguales a tus egresos, por lo que no te lo recomiendo. Sin embargo, puedo ayudarte a ahorrar"
    elif(calculoSalud > 0.85):
        estadoSalud = "media"
        if(ahorroMensual * 6 >= costo):
            ahorroNetoMensual = math.ceil(costo / 6)
            frase = "Con un ahorro de $**" + str(ahorroNetoMensual) + "** durante los siguientes **6 meses** podrías realizar la compra."
        elif(ahorroMensual * 9 >= costo):
            ahorroNetoMensual = math.ceil(costo / 9)
            frase = "Con un ahorro de $**" + str(ahorroNetoMensual) + "** durante los siguientes **9 meses** podrías realizar la compra."
        elif(ahorroMensual * 12 >= costo):
            ahorroNetoMensual = math.ceil(costo / 12)
            frase = "Con un ahorro de $**" + str(ahorroNetoMensual) + "** durante los siguientes **12 meses** podrías realizar la compra."
        else:
            frase = "Tus ingresos son casi iguales a tus egresos, por lo que no te lo recomiendo. Sin embargo, puedo ayudarte a ahorrar"
    else: 
        estadoSalud = "buena"
        if(ahorroMensual * 6 >= costo):
            ahorroNetoMensual = math.ceil(costo / 6)
            frase = "Con un ahorro de **$" + str(ahorroNetoMensual) + "** durante los siguientes **6 meses** podrías realizar la compra."
        elif(ahorroMensual * 9 >= costo):
            ahorroNetoMensual = math.ceil(costo / 9)
            frase = "Con un ahorro de **$" + str(ahorroNetoMensual) + "** durante los siguientes **9 meses** podrías realizar la compra."
        elif(ahorroMensual * 12 >= costo):
            ahorroNetoMensual = math.ceil(costo / 12)
            frase = "Con un ahorro de **$" + str(ahorroNetoMensual) + "** durante los siguientes **12 meses** podrías realizar la compra."
        else:
            frase = "Tus ingresos son casi iguales a tus egresos, por lo que no te lo recomiendo. Sin embargo, puedo ayudarte a ahorrar"

    return {
        "costo": costo,
        "estadoSalud": estadoSalud,
        "ingresos": ingresoMensual,
        "gastos": gastoMensual,
        "saldoTotal": saldoTotal,
        "frase": frase
    }

def tipFinanciero(userId, estadoSalud):
    frase = ""
    mensajeWidget = ""

    if(estadoSalud == "buena"):
        frase = "Clientes como tú, que tienen más ingresos que egresos, pueden hacer crecer sus ahorros hasta 10% con productos de inversión"
        mensajeWidget = "Crece tus ahorros hasta 10% con una inversión"
    elif(estadoSalud == "media"):
        frase = "Clientes como tú, que tienen más ingresos que egresos, pueden hacer crecer sus ahorros hasta 10% con productos de inversión"
        mensajeWidget = "Crece tus ahorros hasta 10% con una inversión"
    else:
        frase = "Clientes como tú, que tienen más ingresos que egresos, pueden hacer crecer sus ahorros hasta 10% con productos de inversión"
        mensajeWidget = "Crece tus ahorros hasta 10% con una inversión"

    return {
        "tip": frase,
        "mensajeWidget": mensajeWidget
    }
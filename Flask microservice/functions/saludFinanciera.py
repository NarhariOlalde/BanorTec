def saludFinanciera():
    gasto_mensual = 1000 #encontrar forma de que esto se obtenga del canal
    ingreso_mensual = 1200 #encontrar forma de que esto se obtenga del canal
    
    estado_mensual = 1 - gasto_mensual/ingreso_mensual
    if estado_mensual < 0.2:
        return "Tu estado financiero es malo, intenta ahorrar un poco más"
    elif estado_mensual < 0.5:
        return "Tu estado financiero es regular, intenta ahorrar un poco más"
    else:
        return "Tu estado financiero es bueno, sigue así"
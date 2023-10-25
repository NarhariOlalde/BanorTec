from helpers.users import generate_random_user, get_user, read_json_from_file
from functions.categorizacion import gasto_mensual, generate_chart
from functions.proponerAlternativas import check_card
from functions.recordatorios import recordatorioAutomatico, recordatorioManual, tarjetasDisponibles
from flask import Flask, request

app = Flask(__name__)

# 1. Recordatorios
@app.route('/recordatorioAutomatico', methods=['POST'])
def get_recordatorio_automatico():
    return recordatorioAutomatico()

@app.route('/recordatorioManual', methods=['POST'])
def get_recordatorio_manual():
    return recordatorioManual()

@app.route('/tarjetas', methods=['POST'])
def get_tarjetas_disponibles():
    return tarjetasDisponibles()


# 2. Proponer alternativas
@app.route('/revisa_tarjeta', methods=['POST'])
def get_card_status():
    data = request.json
    userId = data.get('_userId')
    return check_card(userId)


# 3. Identificar gastos (Categorizacion)
@app.route('/genera_grafica_categorias', methods=['POST'])
def create_chart_expenses():
    return generate_chart()

@app.route('/gasto_mensual_categoria', methods=['POST'])
def get_gasto_mensual():
    return gasto_mensual()


# 4. Mejorar la salud financiera


# Helper functions
@app.route('/genera_usuario', methods=['POST'])
def get_random_user():
    return generate_random_user()


if __name__ == '__main__':
    app.run(debug=True)
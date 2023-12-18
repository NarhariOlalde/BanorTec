# Banorte - Maya funciones
Este repositorio está tiene 3 secciones dividias entre las carpetas
* **Flask Microservice:** API realizada en Flask
* **Models:** Modelos de Machine Learning generados
* **react-banorte:** Frontend para visualizar el chat de IBM Watson junto con los widgets

## API - Flask Microservice
Descargar dependencias. Se requiere tener una versión de pip mayor a 2.23 y python 3.9 o superior
```
pip install -r requirements.txt
```

Para correr la API, ejecutar en el directorio principal
```
python app.py
```

## FrontEnd widgets - React Banorte
Descargar dependencias (Desde el directorio principal). Se utiliza la versión de node 18.12.0
```
npm install
```

Correr la aplicación. En automático se corre en el puerto 3000
```
npm start
```

Realizar un Build
```
npm run build
```

## Models
La carpeta de modelos contiene sus propios archivos README.md, por lo que referirse a dicha carpeta para conocer los detalles

## Uso 
Para realizar cambios en la API, componentes de React o modelos, referirse a la siguinete guía técnica:

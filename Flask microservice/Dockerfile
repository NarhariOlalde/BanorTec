FROM python:3-alpine3.15
WORKDIR /app
COPY ./requirements.txt /app
RUN pip install -r  requirements.txt
COPY . .
EXPOSE 3000
CMD python ./app.py

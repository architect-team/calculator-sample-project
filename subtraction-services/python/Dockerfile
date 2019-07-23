FROM grpc/python:1.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY requirements.txt /usr/src/app/
ONBUILD RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

CMD ["python3", "-u", "main.py"]

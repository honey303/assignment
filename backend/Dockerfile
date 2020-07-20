FROM python:3.6-alpine

WORKDIR /app

ADD requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt


ADD . /app

EXPOSE 8087

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8087", "--log-file", "-", "--access-logfile", "-", "--workers", "4", "--keep-alive", "0"]

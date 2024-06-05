FROM python:3.9

WORKDIR /usr/src/app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && pipenv install --system --deploy

RUN apt-get update && apt-get install -y libreoffice

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
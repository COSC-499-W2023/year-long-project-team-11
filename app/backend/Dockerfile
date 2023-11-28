FROM python:3.9

WORKDIR /usr/src/app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && pipenv install --system --deploy

COPY . .

EXPOSE 8000

# RUN python manage.py migrate

CMD ["python", "manage.py", "runserver", "--noreload", "0.0.0.0:8000"]
FROM postgres:16.2
ENV POSTGRES_DB=expenses
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
COPY init.sql /docker-entrypoint-initdb.d/

#!/bin/sh
# wait-for-postgres.sh

# Esperar a que PostgreSQL esté listo, porque aveces se cuelca y esta primero la conexion que lo demas
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" 2>/dev/null; do
  >&2 echo "PostgreSQL no está disponible - esperando..."
  sleep 3
done

>&2 echo "PostgreSQL está listo - iniciando la aplicación"
npm start
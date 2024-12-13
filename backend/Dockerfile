# Usar imagen base de Node.js 
FROM node:18-alpine 

# Instalar herramientas de espera y PostgreSQL client
RUN apk add --no-cache bash postgresql-client

# Establecer directorio de trabajo 
WORKDIR /app/backend 

# Copiar script de espera (lo crearás a continuación)
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Copiar package.json y package-lock.json 
COPY package*.json ./

# Instalar dependencias 
RUN npm install 

# Copiar el resto del código 
COPY . .

# Exponer el puerto que usa la aplicación 
EXPOSE 3000 

# Comando para iniciar la aplicación 
CMD ["/wait-for-postgres.sh"]
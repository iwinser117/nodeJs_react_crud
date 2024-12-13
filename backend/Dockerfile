# Usar imagen base de Node.js 
FROM node:18-alpine 

# Instalar herramientas necesarias
RUN apk add --no-cache bash postgresql-client

# Establecer directorio de trabajo 
WORKDIR /app/backend 

# Copiar package.json y package-lock.json 
COPY package*.json ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del código 
COPY . . 

# Exponer el puerto que usa la aplicación 
EXPOSE 3000 

# Comando para esperar la base de datos y luego iniciar la app
CMD ["node", "src/server.js"]

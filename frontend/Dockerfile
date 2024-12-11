# Use una imagen de Node.js como base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app/frontend

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3001
EXPOSE 3001

# Establecer la variable de entorno para la URL del backend
ENV REACT_APP_API_URL=http://backend:3000

# Iniciar la aplicación
CMD ["npm", "start"]
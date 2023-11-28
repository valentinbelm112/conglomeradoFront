# Utiliza la imagen oficial de Node como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . /app

# Instala las dependencias
RUN npm install

# Construye la aplicación React
RUN npm run build

# Expone el puerto 3002
EXPOSE 3002

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]


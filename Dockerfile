# Utiliza la imagen oficial de Node como base
FROM node:16-alpine 

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install


# Construye la aplicación React
RUN npm run build

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]

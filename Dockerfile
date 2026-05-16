# Etapa 1: Construcción con Node 20
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
# Usamos legacy-peer-deps igual que en tu terminal para evitar errores
RUN npm install --legacy-peer-deps
COPY . .
# Compilamos la aplicación de Angular para producción
RUN npm run build --configuration=production

# Etapa 2: Servidor Web con Nginx
FROM nginx:alpine
# Copiamos los archivos compilados de Angular a la carpeta pública de Nginx
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html
# Exponemos el puerto 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
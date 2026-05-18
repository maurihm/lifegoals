# Etapa 1: Construcción con Node 20
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Web con Nginx
FROM nginx:alpine
# Borramos la configuración vieja de Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copiamos nuestra configuración recién creada
COPY nginx.conf /etc/nginx/conf.d/
# Copiamos los archivos de Angular
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
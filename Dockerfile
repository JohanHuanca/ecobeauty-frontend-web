# Etapa 1: Instalación de dependencias
FROM node:20-alpine as dev-deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Etapa 2: Construcción de la aplicación React
FROM node:20-alpine as builder
WORKDIR /app

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_FUNCTIONS_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN echo "DEBUG: VITE_SUPABASE_URL es $VITE_SUPABASE_URL"
RUN echo "DEBUG: VITE_SUPABASE_ANON_KEY es $VITE_SUPABASE_ANON_KEY"

RUN npm run build

# Etapa 3: Preparación del entorno de producción con Nginx
FROM nginx:alpine as prod
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]
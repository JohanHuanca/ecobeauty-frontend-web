#!/bin/sh

# Escribe la configuración de Nginx directamente en el archivo de destino
# usando un "here document" (EOF...EOF) para crear el contenido.
# La variable ${PORT} será reemplazada automáticamente por su valor.
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen ${PORT};
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Inicia Nginx
nginx -g 'daemon off;'
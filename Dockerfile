FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Définir les variables d'environnement comme requises
ENV MESSAGING_SECRET=
ENV MESSAGING_APP_ID=

# Vérifier la présence des variables d'environnement au démarrage
CMD [ "sh", "-c", "if [ -z \"$MESSAGING_SECRET\" ] || [ -z \"$MESSAGING_APP_ID\" ]; then \
    echo 'Erreur: MESSAGING_SECRET et MESSAGING_APP_ID sont requis'; \
    exit 1; \
    else \
    echo 'Variables trouvées:'; \
    echo \"MESSAGING_APP_ID=${MESSAGING_APP_ID}\"; \
    echo \"MESSAGING_SECRET=${MESSAGING_SECRET}\"; \
    npm start; \
    fi" ] 
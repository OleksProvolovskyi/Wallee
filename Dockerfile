FROM mcr.microsoft.com/playwright:v1.53.1-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--grep", "@ci"]

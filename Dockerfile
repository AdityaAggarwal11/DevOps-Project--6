# ---------- Build React Frontend ----------
FROM node:22 AS frontend

WORKDIR /app/notes-client

# Install frontend dependencies
COPY notes-client/package*.json ./
RUN npm install

# Copy the rest of the frontend and build it
COPY notes-client/ ./
RUN npm run build


# ---------- Setup Backend ----------
FROM node:22 AS backend

WORKDIR /app

# Copy backend package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend source
COPY server ./server

# Copy React build from frontend stage into backend folder
COPY --from=frontend /app/notes-client/build ./server/frontend/build

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "index.js"]

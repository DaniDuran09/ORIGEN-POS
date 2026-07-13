# ORIGEN POS

Backend for the ORIGEN POS system built with **Node.js**, **TypeScript**, **Express**, **Prisma ORM**, and **PostgreSQL**.

---

# Prerequisites

Make sure you have the following installed:

- Node.js 22+
- Docker Desktop
- Git

Verify your installation:

```bash
node -v
npm -v
docker -v
docker compose version
```

---

# 1. Clone the repository

```bash
git clone <repository-url>

cd ORIGEN-POS
```

---

# 2. Install dependencies

```bash
npm install
```

---

# 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values in `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=posApp

DATABASE_URL="postgresql://postgres:password@localhost:5432/posApp?schema=public"
```

---

# 4. Start PostgreSQL

Launch the database container:

```bash
docker compose up -d
```

Verify that the container is running:

```bash
docker ps
```

You should see something similar to:

```text
posApp-postgres
```

---

# 5. Apply database migrations

Once PostgreSQL is running, execute:

```bash
npx prisma migrate dev
```

This command will:

- Apply all pending migrations
- Create the database schema
- Generate the Prisma Client

---

# 6. Generate Prisma Client

If needed, regenerate the client manually:

```bash
npx prisma generate
```

---

# 7. Run the application

Start the development server:

```bash
npm run dev
```

---

# Useful Commands

## Docker

Start PostgreSQL:

```bash
docker compose up -d
```

Stop PostgreSQL:

```bash
docker compose down
```

View container logs:

```bash
docker compose logs -f
```

Restart containers:

```bash
docker compose restart
```

---

## Prisma

Create a new migration:

```bash
npx prisma migrate dev --name <migration-name>
```

Generate Prisma Client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

Reset the database:

```bash
npx prisma migrate reset
```

---

# Project Structure

```text
.
├── prisma/
│   ├── schema/
│   ├── migrations/
│   ├── prisma.config.ts
│   └── schema.prisma
│
├── src/
│   ├── app.ts
│   ├── config/
│   ├── domain/
│   ├── infrastructure/
│   ├── presentation/
│   └── shared/
│
├── docker-compose.yml
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker
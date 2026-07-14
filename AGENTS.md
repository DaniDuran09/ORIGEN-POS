# AGENTS.md — Origen POS · Contexto del Proyecto

> Este archivo es leído automáticamente por el asistente de IA al inicio de cada conversación.
> Mantenerlo actualizado a medida que el proyecto evoluciona.

---

## 📌 Descripción General

**Origen POS** es un backend REST API construido con **Node.js + TypeScript** que forma parte de una plataforma SaaS escalable para negocios locales (tiendas, ferreterías, restaurantes, etc.). El sistema cubre: punto de venta, inventario, soporte multi-sucursal, permisos por empleado y analíticas en tiempo real.

- **Repositorio**: https://github.com/DaniDuran09/origen-POS
- **Estado actual**: En desarrollo activo — módulo de autenticación en construcción.
- **Runtime**: Node.js 22+, `type: "module"` (ESM nativo)

---

## 🧰 Tech Stack

| Capa | Tecnología |
|------|-----------|
| Lenguaje | TypeScript 6, `strict: true` |
| Framework HTTP | Express 5 |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| Base de datos | PostgreSQL 18 (via Docker) |
| Auth | JWT (`jsonwebtoken`) + bcrypt |
| Dev runner | `tsx watch` |
| Build | `tsc` + `rimraf` |
| Contenedores | Docker Compose |

---

## 🗂️ Estructura del Proyecto

```
origen-POS/
├── prisma/
│   ├── schema.prisma          # Solo modelo User por ahora
│   └── migrations/
├── src/
│   ├── app.ts                 # Entry point, registra rutas
│   ├── config/
│   │   └── env.ts             # Variables de entorno validadas (fail-fast)
│   ├── database/
│   │   └── prisma.ts          # Singleton del PrismaClient
│   ├── modules/
│   │   └── auth/              # Único módulo existente
│   │       ├── auth.module.ts         # Composición de dependencias (DI manual)
│   │       ├── controllers/
│   │       │   └── auth.controller.ts
│   │       ├── dtos/
│   │       │   └── login-response.dto.ts
│   │       ├── repositories/
│   │       │   ├── user.repository.ts         # Interface
│   │       │   └── prisma-user.repository.ts  # Implementación
│   │       ├── routes/
│   │       │   └── auth.routes.ts
│   │       └── use-cases/
│   │           └── login.use-case.ts
│   └── shared/
│       ├── index.ts                  # (vacío aún)
│       └── security/
│           ├── interfaces/
│           │   ├── hash.adapter.ts   # Interface HashAdapter
│           │   └── token.adapter.ts  # Interface TokenAdapter
│           └── adapters/
│               ├── hash/
│               │   └── bcrypt.adapter.ts  # Implementación con bcrypt
│               └── token/
│                   └── jwt.adapter.ts     # Implementación con jsonwebtoken
├── generated/
│   └── prisma/                # Cliente Prisma generado (no editar)
├── docker-compose.yml
├── tsconfig.json
└── package.json
```

---

## 🏛️ Arquitectura y Patrones

El proyecto sigue una arquitectura **modular por feature** con principios de **Clean Architecture / Ports & Adapters**:

### Patrón de composición (Manual DI en `auth.module.ts`)
```
PrismaClient → PrismaUserRepository → LoginUseCase → AuthController → Router
BcryptAdapter ──────────────────────────┘
JwtAdapter ─────────────────────────────┘
```
Cada módulo tiene su propio archivo `.module.ts` que instancia y conecta todas sus dependencias. No hay contenedor IoC externo.

### Convenciones de nombrado
- Interfaces → `*.adapter.ts` (dentro de `interfaces/`) o `*.repository.ts`
- Implementaciones → `[lib].adapter.ts` (ej. `bcrypt.adapter.ts`, `jwt.adapter.ts`)
- Use cases → `[accion].use-case.ts`
- Controllers → `[modulo].controller.ts`
- Routes → `[modulo].routes.ts` con factory `create[Modulo]Routes(controller)`
- DTOs → `[accion]-[tipo].dto.ts`

### Resolución de módulos
Usa `NodeNext` (`"module": "NodeNext"`), por lo que **todos los imports relativos deben incluir la extensión `.js`** (aunque el archivo fuente sea `.ts`).

---

## 🔐 Módulo Auth — Estado Actual

### Lo que está implementado:
- ✅ `BcryptAdapter` — hash y compare de contraseñas
- ✅ `JwtAdapter` — sign y verify de tokens
- ✅ `PrismaUserRepository` — `findByEmail` en Postgres
- ✅ `AuthController.login` — recibe `email` + `password`, llama al use case
- ✅ Ruta `POST /auth/login`
- ✅ Configuración de env con fail-fast

### Lo que está **incompleto / pendiente**:
- ⚠️ `LoginUseCase.execute()` — no valida contraseña, no genera token, solo retorna `accessToken: ""`
- ⚠️ `AuthController.login` — no maneja errores (usuario no existe, contraseña incorrecta, errores de BD)
- ⚠️ No existe `POST /auth/register` ni `RegisterUseCase`
- ⚠️ No hay middleware de autenticación para rutas protegidas
- ⚠️ No hay validación del body de la request

---

## 🗄️ Base de Datos

### Schema actual (Prisma)
```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**Modelos pendientes** (según visión del producto):
- `Business` / `Branch` (multi-sucursal)
- `Employee` + `Role` + `Permission`
- `Product` / `Category` / `Inventory`
- `Sale` / `SaleItem`
- `Customer`

### Comandos de BD
```bash
docker compose up -d               # Levantar Postgres
npx prisma migrate dev --name X    # Nueva migración
npx prisma generate                # Regenerar cliente
npx prisma studio                  # GUI de la BD
```

---

## ⚙️ Variables de Entorno

```env
# Docker / Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=posApp

# Prisma
DATABASE_URL="postgresql://postgres:password@localhost:5432/posApp?schema=public"

# Auth
JWT_SECRET=tu_secreto_muy_seguro
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10

# Server
PORT=3000
```

---

## 🚀 Comandos de Desarrollo

```bash
npm run dev          # Servidor con hot-reload (tsx watch)
npm run build        # Compilar a dist/
npm start            # Ejecutar dist/app.js

docker compose up -d
docker compose down
docker compose logs -f
```

---

## ⚠️ Issues Conocidos / Deuda Técnica

1. **`LoginUseCase` incompleto** — no valida contraseña ni genera token (prioridad alta)
2. **Sin error handler global** — no hay middleware de errores en `app.ts`
3. **Sin validación de inputs** — considerar `zod` para validar body de requests
4. ~~**Archivo huérfano**: `adapters/hash/hash.adapter.ts` vacío~~ ✅ Eliminado
5. ~~**`TokenAdapter` interface duplicada** en `adapters/token/token.adapter.ts`~~ ✅ Movida a `interfaces/` y eliminado el duplicado
6. **`shared/index.ts` vacío** — definir exports públicos del módulo
7. **README desactualizado** — menciona `domain/`, `infrastructure/`, `presentation/` que no existen
8. **Volumen Docker incompleto**: debería ser `/var/lib/postgresql/data` no `/var/lib/postgresql`
9. **`dotenv` no listado en package.json** pero sí importado en `env.ts`
10. **`JWT_ACCESS_EXPIRES_IN`** definido en env pero no conectado al `tokenAdapter.sign()`
11. **Sin path aliases en tsconfig** — imports con `../../../../` muy profundos

---

## 🗺️ Roadmap Sugerido (por orden de prioridad)

1. Completar `LoginUseCase` — validación de contraseña + generación de token
2. Agregar error handler global en `app.ts`
3. Agregar `RegisterUseCase` + ruta `POST /auth/register`
4. Validación de inputs con `zod`
5. Middleware de autenticación JWT para rutas protegidas
6. Expandir schema de Prisma — modelos de negocio
7. Nuevo módulo: Products (mismo patrón que auth)
8. Tests — unitarios para use cases, integration para rutas

---

## 📐 Convenciones de Código a Respetar

- Usar `import type` para importar solo tipos TypeScript
- `camelCase` para variables/funciones, `PascalCase` para clases/interfaces
- Archivos en `kebab-case`
- Interfaces de adaptadores en `src/shared/security/interfaces/`
- Implementaciones concretas en `src/shared/security/adapters/[categoria]/`
- Cada módulo es auto-contenido: su `module.ts` orquesta todas sus dependencias
- No usar `any` — el proyecto tiene `strict: true`
- Imports relativos siempre con extensión `.js`

---

*Última actualización: 2026-07-14 — Estado: módulo Auth en construcción*

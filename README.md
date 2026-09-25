# 🖋️ Qabas (قبس)

 ### Arabic Knowledge-Sharing & Blogging Platform

 Qabas (قبس) is a full-stack, RTL-first Arabic publishing platform built around a moderated content pipeline. It provides writers with a lightweight writing experience and gives administrators full control over content moderation and user management.

 ## 🚀 Live Demo & Repository

 - 🌐 **Live Platform:** [qabasun.vercel.app](<https://qabasun.vercel.app>)
- 💻 **GitHub Repository:** [github.com/b4rbarroja/qabas](<https://github.com/b4rbarroja/qabas>)

---

 ## ✨ Features

 ### 🌐 RTL-First Architecture

 - Built specifically for Arabic-first content and interfaces.
- Full right-to-left (RTL) support.
- Custom self-hosted **Thmanyah Serif Display** typography.
- Proper bidirectional text handling.
- LTR isolation for code blocks and technical inputs.

 ### 🔐 Authentication & Authorization

 - JWT-based authentication.
- Bearer token + `httpOnly` cookie authentication.
- Role-Based Access Control (RBAC).
- Two access levels:
  - `USER` — Author
  - `ADMIN` — Administrator
- Password hashing using `bcrypt`.

 ### 📝 Lightweight Markdown Editor

 - Custom controlled Markdown editor.
- Real-time formatting.
- Block prefixes.
- Selection restoration.
- Automatic reading-time calculation.
- Markdown support for rich article formatting.

 ### 🛡️ Moderated Publishing Pipeline

 Every article goes through a moderation workflow before becoming publicly available:

```
PENDING
   │
   ├── APPROVED → Published
   │
   └── REJECTED → Returned to author
```

 This allows administrators to review submitted content and maintain publishing quality.

 ### ⚡ Author Dashboard

 Authors have access to a dedicated dashboard at:

```
/dashboard
```

 Features include:

 - Create articles.
- Edit articles.
- Track article status.
- View publishing progress.
- Customize author profile.
- Manage biography and specialization.
- Add selected categories and portfolio links.

 ### 🛡️ Admin Dashboard

 Administrators can access:

```
/addash
```

 The admin panel provides:

 - Pending article approval.
- Article moderation.
- User management.
- Report moderation.
- Real-time moderation queue.
- Content management.

---

 ## 🛠️ Tech Stack

 Qabas is structured as a monorepo containing two decoupled workspaces:

```
qabas/
├── frontend/
└── backend/
```

 Both applications can be deployed independently as Vercel/serverless services.

 ### Frontend

 | Technology | Purpose |
| --- | --- |
| Next.js 16 | React framework & App Router |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| `@tailwindcss/typography` | Typography utilities |
| `lucide-react` | Icons |
| `framer-motion` | Animations |
| `react-markdown` | Markdown rendering |
| `remark-gfm` | GitHub-Flavored Markdown |
| `rehype-highlight` | Syntax highlighting |

### Backend

 | Technology | Purpose |
| --- | --- |
| Node.js | Runtime |
| Express 5 | REST API |
| Prisma 7 | ORM |
| PostgreSQL | Database |
| `jsonwebtoken` | JWT authentication |
| `bcrypt` | Password hashing |
| `express-rate-limit` | API rate limiting |
| CORS | Cross-origin configuration |

---

 ## 🏗️ Architecture

```
                     ┌─────────────────────┐
                     │       Qabas         │
                     │   Arabic Platform   │
                     └──────────┬──────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
        ┌────────▼────────┐          ┌─────────▼────────┐
        │    Frontend     │          │      Backend      │
        │                 │          │                   │
        │   Next.js 16    │◄────────►│   Express 5       │
        │   React 19      │   REST   │   Node.js         │
        │   TypeScript    │   API    │   Prisma 7        │
        │   Tailwind CSS  │          │                   │
        └─────────────────┘          └─────────┬─────────┘
                                               │
                                      ┌────────▼────────┐
                                      │   PostgreSQL     │
                                      │     Database     │
                                      └──────────────────┘
```

---

 ## 🗄️ Database Schema

 The application uses **Prisma ORM** with PostgreSQL.

 ### Enums

```
enum Role {
  USER
  ADMIN
}

enum PostStatus {
  PENDING
  APPROVED
  REJECTED
}
```

 ### User

```
model User {
  id                 String   @id @default(cuid())
  name               String
  email              String   @unique
  password           String
  role               Role     @default(USER)
  bio                String?
  specialization     String?
  selectedCategories String[] @default([])
  portfolioUrl       String?
  agreeTerms         Boolean  @default(false)
  agreeOriginality   Boolean  @default(false)
  userImage          String?
  posts              Post[]
}
```

 ### Post

```
model Post {
  id          String     @id @default(cuid())
  title       String
  description String
  content     String
  hashtags    String[]
  readTime    Int
  status      PostStatus @default(PENDING)
  imageUrl    String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  authorId    String
  author      User       @relation(
    fields: [authorId],
    references: [id],
    onDelete: Cascade
  )
}
```

 ### Reports

```
model Reports {
  id     String @id @default(cuid())
  postId String
  reason String
}
```

 ### Messages

```
model Message {
  id      Int    @id @default(autoincrement())
  name    String
  email   String
  subject String
  message String
}
```

---

 # ⚙️ Local Development

 ## Prerequisites

 Make sure you have the following installed:

 - [Node.js](<https://nodejs.org/>) `v18+`
- PostgreSQL
- Git
- npm

---

 ## 1\. Clone the Repository

```
git clone https://github.com/b4rbarroja/qabas.git
cd qabas
```

---

 ## 2\. Configure the Backend

 Navigate to the backend:

```
cd backend
npm install
```

 Create your environment file:

```
cp .env.example .env
```

 Then configure `backend/.env`:

```
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/qabas?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

 ### Run Database Migrations

```
npx prisma migrate dev
```

 ### Start the Backend

```
npm run dev
```

 The API should now be available at:

```
http://localhost:5000
```

---

 ## 3\. Configure the Frontend

 Open a new terminal:

```
cd frontend
npm install
```

 Create the environment file:

```
cp .env.example .env.local
```

 Configure `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

 ### Start the Frontend

```
npm run dev
```

 The frontend will be available at:

```
http://localhost:3000
```

---

 ## 📁 Project Structure

```
qabas/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

 ## 🔄 Publishing Workflow

 The publishing process is intentionally moderated:

```
Author
  │
  │ Create Article
  ▼
┌───────────┐
│  PENDING  │
└─────┬─────┘
      │
      │ Admin Review
      │
 ┌────┴─────┐
 ▼          ▼
APPROVED   REJECTED
   │          │
   ▼          ▼
Published   Returned
```

 This ensures that articles are reviewed before appearing publicly on the platform.

---

 ## 🔐 Security

 Qabas includes several security mechanisms:

 - JWT authentication.
- `httpOnly` cookies.
- Password hashing with `bcrypt`.
- Role-Based Access Control.
- API rate limiting.
- CORS configuration.
- Protected author and admin routes.
- Server-side authorization checks.

 > **Production Note:** Always use a strong, randomly generated `JWT_SECRET` and never commit `.env` files or secrets to Git.

---

 ## 🌍 Deployment

 The project is designed to deploy the frontend and backend independently.

 ### Frontend

 The Next.js frontend can be deployed as a Vercel application.

 Required environment variable:

```
NEXT_PUBLIC_API_URL="https://your-api-domain.com/api"
```

 ### Backend

 The Express API can be deployed as a serverless/backend service.

 Required environment variables:

```
PORT=5000
DATABASE_URL="your-production-postgresql-url"
JWT_SECRET="your-production-jwt-secret"
FRONTEND_URL="https://your-frontend-domain.com"
NODE_ENV="production"
```

 Make sure your production PostgreSQL database is accessible from your backend deployment environment.

---

 ## 👤 Author

 ### Muhammad Jabr

 - 🌐 **Portfolio:** jabriev.vercel.app
- 💻 **GitHub:** @b4rbarroja

---

 ## ⭐ Support

 If you find Qabas useful or interesting, consider giving the repository a ⭐ on GitHub.

 **Qabas — قبس**

 > A space for knowledge, ideas, and Arabic writing.

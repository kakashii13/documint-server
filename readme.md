# ⚙️ Configuración de Variables de Entorno

Crea un archivo `.env` en la raiz del proyecto con las siguientes variables:

```env
# 📧 Email / Resend
MAIL_USER=tu_email@ejemplo.com
MAIL_PASS=tu_contraseña
RESEND_API_KEY=clave_de_resend

# 🌐 Frontend
FRONTEND_URL=https://tusitio.com

# 🔐 JWT
JWT_SECRET=clave_super_secreta

# 🛢️ Base de Datos (PostgreSQL + Prisma)
DATABASE_URL="postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>?schema=public"

# 🌍 CORS
ALLOWED_ORIGINS=https://tusitio.com,http://localhost:3000
```

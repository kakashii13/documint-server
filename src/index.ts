import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorManager } from "./middlewares/errorMiddleware";
// routes imports
import formularioRouter from "./routes/formulario";
import usersRouter from "./routes/users";
import clientsRouter from "./routes/clients";
import invitationRouter from "./routes/invitation";
import authRouter from "./routes/auth";
import advisorsRouter from "./routes/advisors";
import rolesRouter from "./routes/roles";

const app = express();
const PORT = process.env.PORT || 3000;

const whitelist = [
  "https://documint.ar",
  "https://www.documint.ar", // por si Cloudflare u otra CDN agrega el www
  "http://localhost:5173", // dev local
];

// if (process.env.NODE_ENV === "production") {
// }

app.set("trust proxy", 1);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (como Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    credentials: true,
    optionsSuccessStatus: 200, // Cambiar a 200 para mayor compatibilidad
    preflightContinue: false, // Asegurar que preflight se maneje completamente
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.method === "OPTIONS", // Skip rate limiting for preflight requests
  })
);

app.use("/", invitationRouter);
app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", clientsRouter);
app.use("/", formularioRouter);
app.use("/", advisorsRouter);
app.use("/", rolesRouter);

app.use(errorManager);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

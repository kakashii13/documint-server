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

app.use((req, _res, next) => {
  if (req.method === "OPTIONS") {
    console.log("--- Preflight ---");
    console.log("Origin:", req.headers.origin);
    console.log(
      "Access-Control-Request-Method:",
      req.headers["access-control-request-method"]
    );
    console.log(
      "Access-Control-Request-Headers:",
      req.headers["access-control-request-headers"]
    );
    console.log("─────────────────");
  }
  next();
});

app.use(
  cors({
    origin: (origin, cb) => {
      // peticiones del mismo servidor (curl, Postman) no traen origin
      if (!origin || whitelist.includes(origin)) return cb(null, true);
      cb(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204, // Render usa nginx; evita 404 en OPTIONS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
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

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

const allowedOrigins = process.env.ALLOWED_ORIGINS;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
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

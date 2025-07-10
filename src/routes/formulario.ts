import express from "express";
import multer from "multer";
import formularioController from "../controllers/formulario";
import { parseFormData } from "../middlewares/parseFormData";
import ValidateAdvisorMiddleware from "../middlewares/validateAdvisor";

const router = express.Router();

// Tipos MIME permitidos
const allowedMimeTypes = ["application/pdf", "image/jpeg"];

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF o JPEG"));
    }
  },
});

const uploadFields = upload.fields([{ name: "adjuntos", maxCount: 10 }]);

router.post(
  "/form/:slug",
  ValidateAdvisorMiddleware.checkSlug,
  uploadFields,
  parseFormData,
  formularioController
);

export default router;

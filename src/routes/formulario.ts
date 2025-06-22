import express from "express";
import multer from "multer";
import formularioController from "../controllers/formulario";
import { parseFormData } from "../middlewares/parseFormData";

const router = express.Router();

// configuracion de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFields = upload.fields([{ name: "adjuntos", maxCount: 10 }]);

router.post("/submit", uploadFields, parseFormData, (req, res) => {
  formularioController(req, res);
});

export default router;

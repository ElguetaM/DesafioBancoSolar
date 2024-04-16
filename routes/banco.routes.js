import { Router } from "express";
import {
  postUser,
  deleteUser,
  putUser,
  getUser,
  postTransferencia,
  getTransferencias,
} from "../querys/banco.query.js";
import path from "path";

const router = Router();
const __dirname = import.meta.dirname;

//Ver Index//
router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//Ver Usuarios//
router.get("/usuarios", getUser);

//Agregar Usuario//
router.post("/usuario", postUser);

//Editar Usuario//
router.put("/usuario", putUser);

//Eliminar Usuario//
router.delete("/usuario", deleteUser);

//Hacer Transferencia//
router.post("/transferencia", postTransferencia);

//Ver Transferencias//
router.get("/transferencias", getTransferencias);

//ver 404//
router.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/404.html"));
});

export default router;

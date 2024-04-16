import { Router } from "express";
import {
  newUsuario,
  deleteUsuario,
  editUsuario,
  getUsuario,
  transferencia,
  getTransferencias,
} from "../controllers/banco.controllers.js";
import path from "path";

const router = Router();
const __dirname = import.meta.dirname;

//Ver Index//
router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//Ver Usuarios//
router.get("/usuarios", async (req, res) => {
  const usuarios = await getUsuario();
  res.json(usuarios);
});

//Agregar Usuario//
router.post("/usuario", async (req, res) => {
  const data = Object.values(req.body);
  const usuario = await newUsuario(data);
  res.send(usuario);
});

//Editar Usuario//
router.put("/usuario", async (req, res) => {
  const { nombre, balance, id } = Object.values(req.body);
  const usuario = [nombre, balance, id];
  //console.log(usuario);
  const newEdit = await editUsuario(usuario);
  res.json(newEdit);
});

//Eliminar Usuario//
router.delete("/usuario", async (req, res) => {
  const { id } = req.query;
  const usuario = await deleteUsuario(id);
  res.json(usuario);
});

//Hacer Transferencia//
router.post("/transferencia", async (req, res) => {

});

//Ver Transferencias//
router.get("/transferencias", async (req, res) => {

});

//ver 404//
router.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/404.html"));
});

export default router;

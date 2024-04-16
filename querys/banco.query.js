import {
  postUsuario,
  getUsuario,
  editUsuario,
  deleteUsuario,
  newTransferencia,
  getTransfere,
} from "../controllers/banco.controllers.js";

//Ver Usuarios//
const getUser = async (req, res) => {
  try {
    const usuarios = await getUsuario();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Agregar Usuario//
const postUser = async (req, res) => {
  try {
    const data = Object.values(req.body);
    const usuario = await postUsuario(data);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Editar Usuario//
const putUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, balance } = req.body;
    const usuario = [name, balance, id];
    const result = await editUsuario(usuario);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Eliminar Usuario//
const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const usuario = await deleteUsuario(id);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const postTransferencia = async (req, res) => {
  try {
    const data = Object.values(req.body);
    const usuario = await newTransferencia(data);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Ver Transferencias//
const getTransferencias = async (req, res) => {
  try {
    const transferencias = await getTransfere();
    res.status(200).json(transferencias);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getUser, postUser, putUser, deleteUser, postTransferencia, getTransferencias };

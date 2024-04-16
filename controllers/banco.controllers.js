import pool from "../config/db.js";

const getUsuario = async () => {
  try {
    const query = {
      text: "SELECT * FROM usuarios",
    };
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const newUsuario = async (nombre, balance) => {
  try {
    const query = {
      text: `INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *`,
      values: nombre,
      balance,
    };
    const res = await pool.query(query);
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const editUsuario = async (datos) => {
  try {
    const query = {
      text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *",
      values: datos,
    };
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUsuario = async (id) => {
  try {
    const query = {
      text: "DELETE FROM usuarios WHERE id = $1",
      values: [id],
    };
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

const transferencia = async (data) => {
  //     const
  //   try {
  //       await pool.query('begin');
  //       await pool.query(query);
  //     const res = await pool.query(query);
  //     return res.rows;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
};

const getTransferencias = async () => {
  try {
    const query = {
      text: "SELECT * FROM transferencias",
    };
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

export {
  newUsuario,
  deleteUsuario,
  editUsuario,
  getUsuario,
  transferencia,
  getTransferencias,
};

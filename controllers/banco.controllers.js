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

const postUsuario = async ([nombre, balance]) => {
  try {
    const query = {
      text: `INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *`,
      values: [nombre, balance],
    };
    const res = await pool.query(query);
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

const newTransferencia = async ([emisor, receptor, monto]) => {
  const { id: emisorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];

  const { id: receptorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];

  const insAcount = {
    text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
    values: [emisorId, receptorId, monto],
  };

  const updAccount1 = {
    text: `UPDATE usuarios SET balance = balance - $2 WHERE nombre = $1 RETURNING *`,
    values: [emisor, monto],
  };

  const updAccount2 = {
    text: `UPDATE usuarios SET balance = balance + $2 WHERE nombre = $1 RETURNING *`,
    values: [receptor, monto],
  };

  try {
    await pool.query("begin");
    await pool.query(insAcount);
    await pool.query(updAccount1);
    await pool.query(updAccount2);
    await pool.query("commit");
    return true;
  } catch (error) {
    await pool.query("rollback");
    console.log(error.message);
  }
};

const getTransfere = async () => {
  try {
    const query = {
      text: "SELECT tr.fecha, em.nombre AS emisor, re.nombre AS receptor, tr.monto FROM transferencias tr JOIN usuarios em ON tr.emisor = em.id JOIN usuarios re ON tr.receptor = re.id",
      rowMode: "array",
    };
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
};

export {
  postUsuario,
  getUsuario,
  editUsuario,
  deleteUsuario,
  newTransferencia,
  getTransfere,
};

import express from "express";
import bancoRoutes from "./routes/banco.routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));
app.use(bancoRoutes);

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);

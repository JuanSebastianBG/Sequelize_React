import express from "express";
const app = express();
import cors from "cors"; // Para permitir peticiones desde el frontend (Vite/React)

app.use(cors());
app.use(express.json()); // Para parsear JSON en las peticiones

// Importa el modelo
import Usuario from "../server/models/usuarios.js";

// Ruta para obtener todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/usuarios", async (req, res) => {
  const { name, email, edad } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({ name, email, edad });
    res.status(201).json(nuevoUsuario); // Respondemos con el nuevo usuario creado
  } catch (error) {
    console.error("Error al agregar usuario:", error); // Muestra el error en la consola del servidor
    res.status(500).json({ error: error.message }); // Devolvemos el error detallado en la respuesta
  }
});

app.put("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, edad } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.update({ name, email, edad });
    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.status(204).send(); // No devuelve contenido
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: error.message });
  }
});

// Inicia el servidor
app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});

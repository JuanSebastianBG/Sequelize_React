// src/components/Usuarios.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState(""); // Estado para el nombre del usuario
  const [email, setEmail] = useState(""); // Estado para el email del usuario
  const [edad, setEdad] = useState("");
  useEffect(() => {
    // Realizamos la petición GET al backend
    axios
      .get("http://localhost:3001/api/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    try {
      // Hacemos una petición POST al backend para agregar un nuevo usuario
      const response = await axios.post("http://localhost:3001/api/usuarios", {
        name: nombre, // Enviamos el nombre
        email: email, // Enviamos el email
        edad: edad, // Enviamos la edad
      });

      // Al agregar el usuario, actualizamos la lista de usuarios
      setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);

      // Limpiamos el formulario después de agregar el usuario
      setNombre("");
      setEmail("");
      setEdad("");
    } catch (error) {
      console.error("Hubo un error al agregar el usuario:", error);
    }
  };
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.name} - {usuario.email}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
};

export default Usuarios;

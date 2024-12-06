import { useEffect, useState } from "react";
import axios from "axios";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [editandoUsuario, setEditandoUsuario] = useState(null); // Estado para el usuario en edición

  // Obtener usuarios
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  }, []);

  // Agregar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoUsuario) {
        // Actualizar usuario
        const response = await axios.put(
          `http://localhost:3001/api/usuarios/${editandoUsuario.id}`,
          { name: nombre, email: email, edad: edad }
        );
        setUsuarios((usuarios) =>
          usuarios.map((usuario) =>
            usuario.id === editandoUsuario.id ? response.data : usuario
          )
        );
        setEditandoUsuario(null); // Salimos del modo edición
      } else {
        // Crear nuevo usuario
        const response = await axios.post("http://localhost:3001/api/usuarios", {
          name: nombre,
          email: email,
          edad: edad,
        });
        setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
      }

      // Limpiar formulario
      setNombre("");
      setEmail("");
      setEdad("");
    } catch (error) {
      console.error("Hubo un error al agregar o actualizar el usuario:", error);
    }
  };

  // Preparar usuario para edición
  const prepararEdicion = (usuario) => {
    setEditandoUsuario(usuario);
    setNombre(usuario.name);
    setEmail(usuario.email);
    setEdad(usuario.edad);
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
      setUsuarios((usuarios) =>
        usuarios.filter((usuario) => usuario.id !== id)
      );
    } catch (error) {
      console.error("Hubo un error al eliminar el usuario:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table
        border="1"
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.edad}</td>
              <td>
                <button
                  onClick={() => prepararEdicion(usuario)}
                  style={{ marginRight: "10px" }}
                >
                  Editar
                </button>
                <button onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editandoUsuario ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Edad</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          {editandoUsuario ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
        {editandoUsuario && (
          <button
            type="button"
            onClick={() => {
              setEditandoUsuario(null);
              setNombre("");
              setEmail("");
              setEdad("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default Usuarios;

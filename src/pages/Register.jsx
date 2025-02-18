import { useState } from "react";
import { Layout } from "../components/Layout";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
      });

      setSuccessMessage("¡Registro exitoso!");
      setErrorMessage("");

      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("El correo electrónico ya está en uso.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setErrorMessage("Error al registrar. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario logueado con Google:", user);
    } catch (error) {
      console.error("Error al loguear con Google:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">REGISTRO</h1>
        <p className="lead">Completa los siguientes campos:</p>
      </div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="w-50 mx-auto">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>

          <button
            type="button"
            className="btn btn-danger w-100  mt-3 mb-3"
            onClick={handleGoogleLogin}
          >
            Iniciar sesión con Google
          </button>
        </form>

        {successMessage && (
          <div className="alert alert-success mt-3 text-center">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger mt-3 text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </Layout>
  );
};

export { Register };

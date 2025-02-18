import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "../config/auth";
import { useUser } from "../context/UserContext";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile, setUserProfile } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        setLoading(true);
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
        setLoading(false);
      };
      fetchUserProfile();
    }
  }, [user, setUserProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      if (error.code === "auth/invalid-email") {
        setErrorMessage("El correo electrónico no es válido.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("El usuario no está registrado.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("La contraseña es incorrecta.");
      } else {
        setErrorMessage(
          "Error al iniciar sesión. Por favor, intenta nuevamente."
        );
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      setErrorMessage(
        "Error al iniciar sesión con Google. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <>
            {user ? (
              <div className="alert alert-success text-center">
                <h4>
                  Bienvenido, {userProfile ? userProfile.nombre : user.email}
                </h4>
                {userProfile && (
                  <p>
                    {userProfile.nombre} {userProfile.apellido}
                  </p>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Iniciar Sesión
                  </button>

                  <div className="text-center mt-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleGoogleLogin}
                    >
                      Iniciar sesión con Google
                    </button>
                  </div>
                </form>
              </>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3 text-center">
                {errorMessage}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export { Login };

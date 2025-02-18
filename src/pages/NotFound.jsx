import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Página no encontrada</p>
        <Link
          to="/"
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </Layout>
  );
};

export { NotFound };

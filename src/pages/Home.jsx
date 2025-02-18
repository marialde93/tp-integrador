import { Layout } from "../components/Layout";
import { useState } from "react";
import { ProductDetail } from "../components/ProductDetail";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Zapatillas NIKE",
      price: 100,
      sku: "123",
      description:
        "Zapatillas deportivas modernas, ideales para correr o entrenar.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      details:
        "Material: Cuero sintético. Color: Rojo. Tallas disponibles: 38-45.",
    },
    {
      id: 2,
      name: "Auriculares JVC",
      price: 200,
      sku: "456",
      description: "Auriculares inalámbricos con cancelación de ruido.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      details:
        "Batería: 20 horas de duración. Bluetooth 5.0. Incluye estuche de carga.",
    },
    {
      id: 3,
      name: "Reloj Inteligente",
      price: 300,
      sku: "789",
      description:
        "Reloj inteligente con pantalla táctil y monitoreo de salud.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      details:
        "Resistente al agua. Notificaciones de llamadas y mensajes. Batería: 7 días.",
    },
    {
      id: 4,
      name: "Cámara DSLR",
      price: 400,
      sku: "101",
      description: "Cámara DSLR profesional para fotografía de alta calidad.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      details: "Sensor: 24.2 MP. Grabación de video 4K. Incluye lente 18-55mm.",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Bienvenido a nuestro Ecommerce</h1>
        <p className="lead">Encuentra los mejores productos al mejor precio.</p>
      </div>

      {/* Productos Destacados */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div
                className="card h-100"
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card-img-top"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text text-muted">{product.sku}</p>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={handleCloseModal} />
      )}
    </Layout>
  );
};

export { Home };

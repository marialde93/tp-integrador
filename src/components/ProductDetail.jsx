const ProductDetail = ({ product, onClose }) => {
  const { name, image, price, sku, description, details } = product;
  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <img src={image} alt={name} className="img-fluid mb-3" />
            <p>
              <strong>Precio:</strong> ${price}
            </p>
            <p>
              <strong>SKU:</strong> {sku}
            </p>
            <p>
              <strong>Descripción:</strong> {description}
            </p>
            <p>
              <strong>Detalles adicionales:</strong> {details}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };

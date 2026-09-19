import "./ProductDetails.css";

function ProductDetails({ product, isFavorite, onToggleFavorite, onClose }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <img className="modal-image" src={product.image} alt={product.title} />
        <div className="modal-info">
          <h2>{product.title}</h2>
          <p className="modal-category">{product.category}</p>
          <p className="modal-price">R$ {product.price.toFixed(2)}</p>
          <p className="modal-rating">
            ⭐ {product.rating?.rate} ({product.rating?.count} avaliações)
          </p>
          <p className="modal-description">{product.description}</p>
          <button
            type="button"
            className="favorite"
            onClick={() => onToggleFavorite(product.id)}
          >
            {isFavorite ? "❤️ Remover dos favoritos" : "🤍 Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

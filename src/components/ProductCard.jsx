import "./ProductCard.css";

function ProductCard({
  product,
  isFavorite,
  isComparing,
  onToggleFavorite,
  onToggleCompare,
  onOpen,
}) {
  return (
    <article className="card">
      <img className="card-image" src={product.image} alt={product.title} />
      <h2 className="card-title">{product.title}</h2>
      <p className="card-price">R$ {product.price.toFixed(2)}</p>
      <p className="card-category">{product.category}</p>
      <p className="card-description">{product.description}</p>

      <div className="card-actions">
        <button type="button" onClick={onOpen}>
          📋 Detalhes
        </button>
        <button
          type="button"
          className={isFavorite ? "favorite active" : "favorite"}
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label="Favoritar"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button
          type="button"
          className={isComparing ? "compare active" : "compare"}
          onClick={() => onToggleCompare(product.id)}
          aria-pressed={isComparing}
          aria-label="Comparar"
        >
          📊
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

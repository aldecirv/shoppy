import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import ProductDetails from "./ProductDetails.jsx";
import CompareTable from "./CompareTable.jsx";
import "./Main.css";

const FAVORITES_KEY = "shoppy:favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function Main({ products, loading, error, category }) {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [compare, setCompare] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(term);
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesFavorite = !onlyFavorites || favorites.includes(product.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [products, search, category, onlyFavorites, favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id]
    );
  }

  function toggleCompare(id) {
    setCompare((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      return current.length >= 3 ? current : [...current, id];
    });
  }

  return (
    <main className="main">
      <div className="toolbar">
        <label className="search-field">
          <span aria-hidden="true">🔎</span>
          <input
            type="search"
            placeholder="Buscar produto..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar produto"
          />
        </label>

        <button
          type="button"
          className={onlyFavorites ? "toggle active" : "toggle"}
          onClick={() => setOnlyFavorites((value) => !value)}
        >
          ❤️ Favoritos ({favorites.length})
        </button>

        <button
          type="button"
          className="toggle"
          onClick={() => setShowCompare(true)}
          disabled={compare.length < 2}
        >
          📊 Comparar ({compare.length})
        </button>
      </div>

      {loading && <p className="status">Carregando produtos...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && visibleProducts.length === 0 && (
        <p className="status">Nenhum produto encontrado.</p>
      )}

      <div className="products">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            isComparing={compare.includes(product.id)}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onOpen={() => setSelected(product)}
          />
        ))}
      </div>

      {selected && (
        <ProductDetails
          product={selected}
          isFavorite={favorites.includes(selected.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelected(null)}
        />
      )}

      {showCompare && (
        <CompareTable
          products={products.filter((product) =>
            compare.includes(product.id)
          )}
          onRemove={toggleCompare}
          onClose={() => setShowCompare(false)}
        />
      )}
    </main>
  );
}

export default Main;

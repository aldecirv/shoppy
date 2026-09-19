import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";
import ProductDetails from "./ProductDetails.jsx";
import CompareTable from "./CompareTable.jsx";
import { translateProducts } from "../data/productTranslations.js";
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

function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [compare, setCompare] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(translateProducts(response.data)))
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

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

        <label className="select-field">
          <span aria-hidden="true">🌎</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filtrar por categoria"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "Todas as categorias" : item}
              </option>
            ))}
          </select>
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

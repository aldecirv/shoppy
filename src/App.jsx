import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import { translateProducts } from "./data/productTranslations.js";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(translateProducts(response.data)))
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

  return (
    <div className="app">
      <Header
        categories={categories}
        category={category}
        onSelectCategory={setCategory}
      />
      <Main
        products={products}
        loading={loading}
        error={error}
        category={category}
      />
      <Footer />
    </div>
  );
}

export default App;

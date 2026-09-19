import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Main() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <main className="main">
      <div className="products">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <img
              className="card-image"
              src={product.image}
              alt={product.title}
            />
            <h2 className="card-title">{product.title}</h2>
            <p className="card-price">R$ {product.price.toFixed(2)}</p>
            <p className="card-description">{product.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Main;

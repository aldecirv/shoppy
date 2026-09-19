import "./Header.css";

function Header({ categories, category, onSelectCategory }) {
  return (
    <header className="header">
      <h1>Shoppy</h1>
      <nav className="categories" aria-label="Categorias">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={item === category ? "category active" : "category"}
            onClick={() => onSelectCategory(item)}
          >
            {item === "all" ? "Todas" : item}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;

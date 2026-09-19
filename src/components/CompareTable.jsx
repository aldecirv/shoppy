import "./CompareTable.css";

function CompareTable({ products, onRemove, onClose }) {
  const rows = [
    {
      label: "Imagem",
      render: (product) => <img src={product.image} alt={product.title} />,
    },
    { label: "Preço", render: (product) => `R$ ${product.price.toFixed(2)}` },
    { label: "Categoria", render: (product) => product.category },
    { label: "Avaliação", render: (product) => `⭐ ${product.rating?.rate}` },
    { label: "Descrição", render: (product) => product.description },
  ];

  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="modal compare-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <h2>📊 Comparação</h2>

        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th />
                {products.map((product) => (
                  <th key={product.id}>
                    <span className="compare-title">{product.title}</span>
                    <button type="button" onClick={() => onRemove(product.id)}>
                      Remover
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {products.map((product) => (
                    <td key={product.id}>{row.render(product)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CompareTable;

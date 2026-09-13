# Shoppy

E-commerce fictício criado para **aprender na prática como consumir uma API REST** em React.js com **Axios**, **useState** e **useEffect**.

O foco do projeto é didático: `API → Estado → Renderização dos produtos → Responsividade`.

## Tecnologias

- [React.js](https://react.dev/) 18
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- CSS puro (arquivos separados, sem estilos inline)

## API utilizada

[Fake Store API](https://fakestoreapi.com/products) — `GET https://fakestoreapi.com/products`

## Estrutura do projeto

```
shoppy/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Header.jsx
        ├── Header.css
        ├── Main.jsx
        ├── Main.css
        ├── Footer.jsx
        └── Footer.css
```

- **Header**: exibe apenas o título "Shoppy".
- **Main**: consome a API, guarda os produtos no estado e renderiza os cards (imagem, título, preço e descrição).
- **Footer**: exibe "Todos os direitos reservados.".
- **App**: apenas organiza Header, Main e Footer.

## Como rodar

```bash
# 1. Instalar as dependências (inclui o Axios)
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Depois abra o endereço exibido no terminal, normalmente:

```
http://localhost:5173
```

### Outros comandos

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # pré-visualiza a build de produção
```

## Como funciona o consumo da API

No componente `Main.jsx`:

```jsx
const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("https://fakestoreapi.com/products").then((response) => {
    setProducts(response.data);
  });
}, []);
```

1. `useState([])` cria o estado `products`, que começa como um array vazio.
2. `useEffect(..., [])` roda uma única vez, quando o componente é montado.
3. `axios.get(...)` faz a requisição HTTP GET.
4. `response.data` contém a lista de produtos retornada pela API.
5. `setProducts(...)` atualiza o estado e o React renderiza os cards.
6. `.map()` percorre a lista e cria um card para cada produto, usando `key` e `alt`.

## Responsividade

Os produtos são organizados com **CSS Grid**:

```css
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
```

O número de colunas se adapta automaticamente ao tamanho da tela (desktop, tablet e smartphone), sem rolagem horizontal.

## Escopo

Este projeto é **estritamente didático**. Não inclui carrinho de compras, login, checkout, favoritos, filtros, categorias, paginação, rotas ou estado global.

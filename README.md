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
        ├── ProductCard.jsx
        ├── ProductCard.css
        ├── ProductDetails.jsx
        ├── ProductDetails.css
        ├── CompareTable.jsx
        ├── CompareTable.css
        ├── Footer.jsx
        └── Footer.css
```

- **Header**: exibe apenas o título "Shoppy".
- **Main**: consome a API, guarda os produtos no estado, aplica busca/filtro/favoritos e renderiza os cards.
- **ProductCard**: card de um produto (imagem, título, preço, categoria, descrição) com ações de detalhes, favorito e comparação.
- **ProductDetails**: modal com as informações completas de um produto.
- **CompareTable**: modal que compara lado a lado até 3 produtos.
- **Footer**: exibe "Todos os direitos reservados.".
- **App**: apenas organiza Header, Main e Footer.

## Funcionalidades

- 🔎 **Busca**: filtra os produtos pelo título em tempo real.
- 🌎 **Filtro**: filtra por categoria; a lista de categorias é gerada a partir dos próprios produtos.
- ❤️ **Favoritos**: marca/desmarca produtos e permite ver apenas os favoritos. Os favoritos são salvos no `localStorage` do navegador.
- 📊 **Comparação**: seleciona até 3 produtos e abre uma tabela comparando imagem, preço, categoria, avaliação e descrição.
- 📋 **Detalhes**: abre um modal com imagem ampliada, preço, avaliação e descrição do produto.

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
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => setProducts(response.data))
    .catch(() => setError("Não foi possível carregar os produtos."))
    .finally(() => setLoading(false));
}, []);
```

1. `useState([])` cria o estado `products`, que começa como um array vazio.
2. `useEffect(..., [])` roda uma única vez, quando o componente é montado.
3. `axios.get(...)` faz a requisição HTTP GET.
4. `response.data` contém a lista de produtos retornada pela API.
5. `setProducts(...)` atualiza o estado e o React renderiza os cards.
6. `loading` e `error` controlam os estados de carregamento e de falha na requisição.
7. `.map()` percorre a lista e cria um card para cada produto, usando `key` e `alt`.

## Responsividade

Os produtos são organizados com **CSS Grid**:

```css
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
```

O número de colunas se adapta automaticamente ao tamanho da tela (desktop, tablet e smartphone), sem rolagem horizontal.

## Deploy

O projeto é publicado automaticamente no Vercel a cada `git push` na branch `main`.

- Produção: <https://shoppy-dusky-gamma.vercel.app>

## Escopo

Este projeto é **estritamente didático**. Inclui busca, filtro por categoria, favoritos, comparação e visualização de detalhes. Não inclui carrinho de compras, login, checkout, paginação, rotas ou estado global.

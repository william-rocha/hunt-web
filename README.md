## hunt-web

crie o componente header
```jsx
import React from 'react';
import "./styles.css";

const Header = () => <header id="main-header">JsHunt</header>
 
export default Header;
```
> lembre de usar o id para únicos
```css
header#main-header {
    height: 60px;
    background:#da552f;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
}
```
crie o arquivo `service/api.js`

```jsx
import axios from 'axios'

const api = axios.create({baseURL: "http://localhost:3001/api"})
// api da rocketseat
// const api = axios.create({baseURL: "http://rocketseat-node.herokuapp.com/api"})

export default api
```
crie a rota
```jsx 
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product';

const Routes = () => (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/products/:id" component={Product}/>
            </Switch>
        </BrowserRouter>
)

export default Routes
```
crie o arquivo `src/app.js`
```jsx
const App = () => ( 
    <div>
      <Header />
      <Routes />
    </div>
)
export default App;
```
crie o arquivo `pages/main/index.js`

```jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from "react-router-dom";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    loadProducts();
  }, []);

// async, spread, desistruturação
  const loadProducts = async (pageNumber = 1) => {
    console.log("page", page);
    const response = await api.get(`/products?page=${pageNumber}`);
    const { docs, ...productInfo } = response.data;
    console.log("docs", docs);
    setProducts(docs);
    setProductInfo(productInfo);
    setPage(pageNumber);
  };

  const nextPage = () => {
    console.log("productInfo.pages", productInfo.pages);
    if (page === productInfo.pages) return;
    const pageNumber = page + 1;
    loadProducts(pageNumber);
  };

  const prevPage = () => {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadProducts(pageNumber);
  };

  return (
    <>
      <div className="product-list">
        {products.map((product) => (
	
	// lembre de usar as tags semanticamente
	
          <article key={products._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
            {/* <a href={product.url}>Acessar</a> */}
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={prevPage}>
            Anterior
          </button>
          <button disabled={page === productInfo.pages} onClick={nextPage}>
            Proximo
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
```
e seu arquivo .css

```css 
/* usse a classe que define o componete para fechar o escopo */

.product-list {
    max-width: 700px;
    margin: 20px auto 0;
    padding: 0 20px;
}

.product-list article {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
}

.product-list article p {
    font-size: 16px;
    color: #999;
    margin-top: 5px;
    line-height: 24px;
}

.product-list article a {
    height: 42px;
    border: 2px solid #da552f;
    background: none;
    margin-top: 10px;
    color: #da552f;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
}

.product-list article a:hover {
    background: #da552f;
    color: #fff;
}

.product-list .actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.product-list .actions button {
    padding: 10px;
    border-radius: 5px;
    border: 0px;
    background: #da552f;
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

// classe para btns disabled

.product-list .actions button[disabled] {
    opacity: 0.5;
    cursor: default;
}

.product-list .actions button[disabled]:hover {
    opacity: 0.5;
}

.product-list .actions button:hover {
    opacity: 0.7;
}
```
crie o arquivo `pages/product/index.js`

```jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
  
    // pegando o params (/:id)
    
    const { id } = props.match.params;
    const response = await api.get(`/products/${id}`);
    setProduct(response.data);
  };
  
  return (
    <>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          URL: <a href={product.url}>{product.url}</a>
        </p>
      </div>
    </>
  );
};

export default Product;
```
arquivo css
```css
.product-info {
	max-width: 700px;
	margin: 20px auto 0;
	padding: 20px;
	background: #fff;
	border-radius: 5px;
	border: 1px solid #ddd;
}
	
.product-info h1 {
	font-size: 32px;
}

.product-info p {
	color: #666;
	line-height: 24px;
	margin-top: 5px;
}

.product-info p a {
	color: #069;
}
```



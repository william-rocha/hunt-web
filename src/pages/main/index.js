import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import "./styles.css";
import { Link } from 'react-router-dom';

const Main = () => {
    const [products, setProducts] = useState([])
    const [productInfo, setProductInfo] = useState({})
    const [page, setPage] = useState(1)
    useEffect(() => {
        loadProducts()
    },[])

    const loadProducts = async (pageNumber = 1) => {
        console.log('page', page);
        const response = await api.get(`/products?page=${pageNumber}`)
        const {docs, ...productInfo} = response.data;
        console.log('docs', docs);
        setProducts(docs)
        setProductInfo(productInfo)
        setPage(pageNumber)
      
    }

    const nextPage = () => {
        console.log('productInfo.pages', productInfo.pages);
        if (page === productInfo.pages) return
        const pageNumber = page + 1;
		loadProducts(pageNumber);
    }
    const prevPage = () => {
        if (page === 1) return
		const pageNumber = page - 1;
		loadProducts(pageNumber);
    }
return ( <>
<div className="product-list">
    {products.map(product => (
        <article key={products._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
            {/* <a href={product.url}>Acessar</a> */}
        </article>
    ))}
    <div className="actions">
        <button disabled={page === 1} onClick={prevPage}>Anterior</button>
        <button disabled={page === productInfo.pages} onClick={nextPage}>Proximo</button>
    </div>
</div>
</> 
);
}
 
export default Main;
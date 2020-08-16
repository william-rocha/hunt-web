import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import "./styles.css";

const Main = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        loadProducts()
    })

    const loadProducts = async () => {
        const response = await api.get(`/products`)
        setProducts(response.data.docs)
        console.log('response', response);
    }
return ( <>
<div className="product-list">
    {products.map(product => (
        <article key={products._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <a href={product.url}>Acessar</a>
        </article>
    ))}
</div>
</> 
);
}
 
export default Main;
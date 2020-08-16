import React, { useEffect, useState } from 'react';
import api from '../../services/api';

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
return ( <><div>{products.map(product => (<h2 key={products._id}>{product.title}</h2>))}</div></> );
}
 
export default Main;
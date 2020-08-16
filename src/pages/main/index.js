import React, { useEffect } from 'react';
import api from '../../services/api';

const Main = () => {
    useEffect(() => {
        loadProducts()
    })

    const loadProducts = async () => {
        const response = await api.get(`/products`)
        console.log('response', response);
    }
    return ( <><div>hello rocketseat</div></> );
}
 
export default Main;
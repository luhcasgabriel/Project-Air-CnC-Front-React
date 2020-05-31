import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';


export default function DashBoard() {

    /* estado para spots */
    const [spots , setSpots] = useState([]); /* inicia com uma lista vazia, pois vem do back end como lista */

    /* função asincrona para chamar back quando inicia tela  */
    useEffect(() => {

        async function loadSpots() {
            

            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            /* chama estado */
            setSpots(response.data);
        }

        /* chama método */
        loadSpots();

    }, []); /*[ filter ] para filtros caso seja um componente de pesquisa, mas se estiver vazio, ele vai executar somente uma vez a função*/



    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id} >
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
        </>
    )
}
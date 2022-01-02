import React from 'react';
import {Link} from 'react-router-dom'
import {shopsList} from '../utils/Data'

function CoffeePlaces() {

    
    const list = shopsList.map((shop) => {
        return (
            <div key={shop.id} className="coffeePlaces-item">
                <Link to={`/coffeePlaces/${shop.id}`} style={{textDecoration: 'none'}}>
                <img className='coffeePlaces-img' src={shop.img} alt="" width="300px" height="200px"/>
                <div className='coffeePlaces-text'>
                    <p className='name'>{shop.name}</p>
                    <p className='location'>{shop.location}</p>
                </div>      
                </Link> 
            </div>
        )
    })

        return (
            <div className='coffeePlaces-container'>         
                {list}
            </div>
        );
}

export default CoffeePlaces;
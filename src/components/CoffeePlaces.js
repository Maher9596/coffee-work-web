import React from 'react';
import {Link} from 'react-router-dom'
import {shopsList} from '../utils/Data'

function CoffeePlaces() {

    
    const list = shopsList.map((shop) => {
        return (
            <div className="coffeePlaces-item">
                <img key={shop.id} className='coffeePlaces-img' src={shop.img} alt="" width="300px" height="200px"/>
                <div className='coffeePlaces-text'>
                    <Link to={`/coffeePlaces/${shop.id}`} style={{textDecoration: 'none'}}>
                        <p key={shop.id} className='name'>{shop.name}</p>
                    </Link> 
                    <p key={shop.id} className='location'>{shop.location}</p>
                </div>       
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
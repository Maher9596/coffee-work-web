import React from 'react';
import CoffeePlaces from './CoffeePlaces';

function Home() {
    return (
        <div className='home-container'>
            <p className='home-text'>Choose Where You Want To Work Today!</p>
            <div className='coffeePlaces'>
                <CoffeePlaces />
            </div>
        </div>
    );
}

export default Home;
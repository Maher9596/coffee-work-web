import React from 'react';
import {Link, Routes, Route} from 'react-router-dom'
import Home from './Home'
import PlaceDetails from './PlaceDetails';


function Header() {
    return (
    <div>
        <nav>

            <Link to="/" style={{textDecoration: 'none'}}><h2>Coffee&Work</h2></Link>
        </nav>
            
        <Routes>
            <Route exact path ="/" element={<Home />} />
            <Route path ="/coffeePlaces/:placeDetails" element={<PlaceDetails />} />
        </Routes> 
    </div>
    );
}

export default Header;
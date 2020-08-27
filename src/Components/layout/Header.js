import React from 'react';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header style={headerStyle}>
            <h1>Ajankohtaista Vantaalla</h1>
            <Link to="/" style={linkStyle}>Duunit</Link> | <Link to="/weather" style={linkStyle}>Säätiedot</Link> 

        </header>
    )
}
const linkStyle={
    color:'#ffffff',
    textDecoration:'none'
}
const headerStyle={
    background:'#333333',
    color:'#ffffff',
    padding:'10px'
}
export default Header
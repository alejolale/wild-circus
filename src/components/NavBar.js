import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({auth}) =>{
    return (
        <div className="NavBar">
            {!auth?
                <Link to="/login">Admin</Link> :
                <button>Log out</button>
            }
        </div>
    )
};

export default NavBar;

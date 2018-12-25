import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-primary fixed-top'>
      <Link className='navbar-brand' to='/'>Q&A APP</Link>
    </nav>
  );
}
export default Navbar;
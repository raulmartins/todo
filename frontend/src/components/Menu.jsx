import './Menu.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props =>
<nav className="navbar navbar-dark">
   <div className="container">
    <Link className="navbar-brand" to="/#">Home</Link>
    <Link className="navbar-brand" to="/about">About</Link>
   </div>
  </nav>
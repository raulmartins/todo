import './Header.css'
import React from 'react'
import Menu from '../components/Menu'

export default props =>
 <div className="header">
  <Menu />
  <h1>{props.title}</h1>
  <h2>{props.subtitle}</h2>
 </div>
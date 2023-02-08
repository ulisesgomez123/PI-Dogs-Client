import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';
import img from '../../perro.png'

export default function NavBar() {
    return (
        <header className={style.navbar}>
            <nav>
                <ul className={style.list}>
                    <li >
   <NavLink className={style.link} activeClassName={style.active} to="/main_page">Home</NavLink>
   <NavLink className={style.link} activeClassName={style.active} to='/dogs/creation'>Create Dog</NavLink>
                    </li>
                </ul>
            </nav>
        <div className={style.container}>
            <div className={style.nameApp}>Dog App</div>
            <img className={style.img} src={img} alt='icono'/> 
        </div>
    </header>
    )
}
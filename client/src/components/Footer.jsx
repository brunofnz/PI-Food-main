import React from 'react'
import { Link } from 'react-router-dom';
import style from "../assets/styles/Footer.module.css";
import logoPerfilLinkedin from "../assets/svg/LOGO_LINKEDIN.svg";

const Footer = () => {
  return (
    <nav className={style.footer}>
      <div className={style.containerNav}>
          <a href='https://www.soyhenry.com/' className={style.buttonLinks}>Henry</a>
          <p style={{color: 'white', fontSize: '23px', paddingTop: '15px'}}>Hecho por Bruno Ulises Fernandez</p>
            <a target="_blank" href="https://www.linkedin.com/in/bruno-fernandez-462bba1b8/" className={style.buttonLinks}>
                <img src={logoPerfilLinkedin} alt="logo" className={style.imageLogo} />
            </a>
      </div>
    </nav>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom';
import style from '../assets/styles/ContainerCards.module.css'

const Card = ({ id, name, image, diets }) => {
    return (
      <Link to={`/recipes/${id}`} className={style.buttonLinks}>
        <div className={style.cardContainer} id={id}>
          <div 
            style={{backgroundImage:`url(${image})`}}
            className={style.image}>
          </div>
          <div>
            <h3>{name}</h3>
            <div  className={style.containerDiets} >
              {diets?.map((item, index) => {
                return <p key={index} className={style.diet}>#{item.name}</p>;
              })}
            </div>
          </div>
        </div>
      </Link>
    );
};

export default Card
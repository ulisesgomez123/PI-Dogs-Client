import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './dogsCard.module.css'

export default function DogCard ({weightImperial,weightMetric, temperament, name, img, id}) {
    return ( 
      <div className={style.card}>
        <div className={style.cardBody}>
           <div className={style.name}> 
          <NavLink className={style.link} activeClassName={style.active} to={`/dog/${id}`} > 
           <div className={style.nameDiv}> {name}</div>
           </NavLink>
           </div>

          <div>
            <div>
             <label className={style.atributes}>Temperaments: </label>
             <div className={style.content}>{temperament}</div>
            </div>

            <div>
            <div className={style.atributes}>Weight: </div>
            <label className={style.atributes}>kilograms: </label> <div className={style.content}>{weightMetric}</div>
            <label className={style.atributes}> pounds: </label><div className={style.content}>{weightImperial}</div>
            </div>

            <div className={style.divImg}>
             <img className={style.img} src={img} alt='dog image'/>
            </div>

          </div>
        </div>
      </div>
    );
}
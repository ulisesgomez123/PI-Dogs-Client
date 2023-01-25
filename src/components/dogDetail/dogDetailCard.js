import React from 'react';
import style from '../dogsCard/dogsCard.module.css'

export default function DogDetailCard ({weightImperial,weightMetric,temperament,name,img,heightMetric,heightImperial,lifeSpan}) {
    return ( 
      <div className={style.align}>
      <div className={style.card} >
        <div className={style.cardBody}>
           <div className={style.name}>{name}</div>
          <div>

          <div className={style.divImg}>
             <img className={style.img} src={img} alt='dog image'/>
            </div>
          <div>

             <label className={style.atributes}>Temperaments: </label>
             <div className={style.content}>{temperament}</div>
            </div>

            <div>
            <div className={style.atributes}>Weight: </div>
  <label className={style.atributes}>kilograms: </label> <div className={style.content}>{weightMetric}</div>
  <label className={style.atributes}> pounds: </label><div className={style.content}>{weightImperial}</div>
            </div>

            <div>
            <div className={style.atributes}>Height: </div>
            <label className={style.atributes}>Centimeters: </label> <div className={style.content}>{heightMetric}</div>
            <label className={style.atributes}>Inches: </label> <div className={style.content}>{heightImperial}</div>
            </div>

            <div className={style.space}>
            <div className={style.atributes}>Life span: </div>
            <div className={style.content}>{lifeSpan}</div>
            </div>

          </div>
        </div>
      </div>
   </div>   
);
}
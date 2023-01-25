import React from 'react';
import style from '../dogsCard/dogsCard.module.css'

export default function CreateDog ({weight,temperament,name,img,height,lifeSpan}) {
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
  <label className={style.atributes}>kilograms: </label> <div className={style.content}>{weight}</div>
            </div>

            <div>
            <div className={style.atributes}>Height: </div>
            <label className={style.atributes}>Centimeters: </label> <div className={style.content}>{height}</div>
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
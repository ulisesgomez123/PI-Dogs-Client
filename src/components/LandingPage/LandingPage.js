import React, { Component } from "react";
import style from './LandingPage.module.css'
import dog from './dog.png'


export class LandingPage extends Component {
    
    render() {
      return (

        <div>
          <h1>  </h1>
            <p className={style.p}>Hello Friend!!!, are you ready for the action?</p>
            <h1>  </h1>
            <p className={style.p}>then, go to Home and</p>
            <p className={style.p}>look for your favorite dogs </p>
            <div className={style.imgContainer}>
            <img src={dog} alt='dogs' className={style.img}/>
            </div>
        </div>
        
      );
    }
  }
 
  
  export default LandingPage;
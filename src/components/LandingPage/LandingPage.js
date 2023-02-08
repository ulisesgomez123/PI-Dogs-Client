import React, { Component } from "react";
import style from './LandingPage.module.css'



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
            <img src='https://firebasestorage.googleapis.com/v0/b/rentalibre-fbbda.appspot.com/o/dog.png?alt=media&token=5925180b-451a-425e-9af2-9b9543559b65'
             alt='dogs' className={style.img}/>
            </div>
        </div>
        
      );
    }
  }
 
  
  export default LandingPage;
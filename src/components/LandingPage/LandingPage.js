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
        </div>
        
      );
    }
  }
 
  
  export default LandingPage;
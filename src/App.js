import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import MainPage from './components/MainPage/mainPage';
import Query from './components/query/query.js';
import DogDetails from './components/dogDetail/dogDetail';
import CreateDog from './components/createDog/createDog';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';




function App () {
  return (
    <React.Fragment>
           <NavBar/>
          <Route exact path="/" component={LandingPage}/> 
          <Route exact path="/dogs/creation" component={CreateDog}/>
          <Route exact path="/dog/:breedId" component={DogDetails}/> 
          <Route exact path="/main_page" component={MainPage}/>
          <Route exact path="/dogs" component={Query}/> 
      </React.Fragment>
  );
}

export default App;


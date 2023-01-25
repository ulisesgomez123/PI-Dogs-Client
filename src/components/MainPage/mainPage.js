import React from "react";
import img from '../../perrito.png';
import {getDogs,getTemperaments} from '../../redux/actions';
import { getDogByName } from "../../redux/actions";
import style from './mainPage.module.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 
import {buttonTemperaments,handleChangeSelect,next,dogCard,filter
       ,nextFilter,order,previous} from './functions';
import CreateDog from "../createdDog/createdDogCard";

function MainPage () {
  let dispatch= useDispatch();
  let dogsloadedBySearch= useSelector( state => state.dogsloadedBySearch);
  let dogsloaded= useSelector( state => state.dogsLoaded);
  let createdDogs= useSelector( state => state.createdDogs);
  let temperaments= useSelector( state => state.temperaments);

  const [mainPage,setMainPage] = React.useState({
    beginning: true,
    value: '',
    currentPage: 1,
    dogsReverse:[],
    numOfDogsCreated: createdDogs.length,
    prev: false,
    alphabetical: true,
    byWeight: false,
    ascending: true,
    descending: false,
    orderByWeightAscending: false,
    orderByWeightDescending: false,
    temperaments: false,
    madeDogs: [false,true,true]
  })
  
  React.useEffect( ()=>{
    dispatch(getDogs())
    dispatch(getTemperaments())
   },[]) 

  React.useEffect( ()=>{
    order(mainPage,setMainPage,dogsloaded)
   },[mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong,mainPage.temperaments]) 

   React.useEffect( ()=>{
   filter(mainPage,setMainPage,dogsloaded,createdDogs)
   },[mainPage.temperamentString,mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong]) 

   function  handleChange (e)  {
    setMainPage((prevState) => {return {...prevState,
      value: e.target.value
     }
   })
  }
    
  function searchFunction () {
      dispatch(getDogByName(mainPage.value))
      setMainPage((prevState) => {return {...prevState,
        value: '',
        temperaments: false,
       }
     })
    }

    function onChange (e) {
     if (e.target.value === 'alphabetical') {
      setMainPage((prevState) => {return {...prevState,
        alphabetical: true,
        byWeight: false
       } 
     })
   }
     if (e.target.value === 'by weight') {
      setMainPage((prevState) => {return {...prevState,
        byWeight: true,
        alphabetical: false,
       } 
     })
    }
  }

    function onChangeDirection (e) {
      if (e.target.value === 'ascending') {
        setMainPage((prevState) => {return {...prevState,
          ascending: true,
          descending: false,
          beginning: false,
         } 
       })
      }
      if (e.target.value === 'descending') {
        setMainPage((prevState) => {return {...prevState,
          ascending: false,
          descending: true,
          beginning: false,
         } 
       })
      }
    }
    function notMadeDogs () {
      setMainPage((prevState) => {return {...prevState,
        madeDogs: [true,true],
        numOfDogsCreated: 0,
        dogsFiltered: false,
        temperaments: false,
        currentPage: mainPage.storage[0] ? isNaN(mainPage.storage[mainPage.storage.length-1]) ? 1 
        : mainPage.storage[mainPage.storage.length-1] : 1
       } 
     })
    }

    function madeDogs () {
      setMainPage((prevState) => {return {...prevState,
        madeDogs: [false,true],
        numOfDogsCreated: createdDogs.length,
        temperaments: false,
        currentPage:1,
        storage: [...mainPage.storage,mainPage.currentPage]
       } 
     })
    }
      return ( 
        <div>
          <h1>Page: {mainPage.currentPage}</h1>

    {mainPage.temperaments ? <select onChange={(e)=>handleChangeSelect(e,setMainPage,mainPage)}
    className={style.select1}><option key='0'>Temperaments </option> {temperaments?.map(t =>
     <option value={t.name} key={t.id}>{t.name}</option>)}</select> : null }

  <div className={style.divContainer}>      
 <div className={style.containerOfBtns}>
    <button onClick={notMadeDogs} className={style.btnFilter}>Not made dogs</button>
    <button onClick={madeDogs} className={style.btnFilter}>Made dogs</button>
    <button onClick={() =>buttonTemperaments(setMainPage)}
     className={style.btnFilter}> Dog temperaments</button>
</div>
<div className={style.selectContainer}>
          <select onChange={(e) => onChange(e)} className={style.select}>
             <option value='alphabetical'>Alphabetical</option>
             <option value='by weight'>By weight</option>
          </select>

          <select onChange={(e) => onChangeDirection(e)} className={style.select}>
             <option value='ascending'>Ascending</option>
             <option value='descending'>Descending</option>
          </select>
</div>
</div>  
<div className={style.buttonOfNyP}>
      {mainPage.dogsFiltered ? mainPage.dogsFiltered[0] ? mainPage.dogsFiltered.length > 8 ? 
<button className={style.buttonOfPrevious} onClick={()=>previous(mainPage,setMainPage)}> 
previous</button > : null : mainPage.madeDogs.length === 3 || mainPage.madeDogs[0] ? 
<button className={style.buttonOfPrevious} onClick={()=>previous(mainPage,setMainPage)}>
previous</button> : null : mainPage.madeDogs.length === 3 || mainPage.madeDogs[0] ? 
<button className={style.buttonOfPrevious} onClick={()=>previous(mainPage,setMainPage)}>
previous</button> : null }

          {mainPage.dogsFiltered ? mainPage.dogsFiltered[0] ? mainPage.dogsFiltered.length > 8 ? 
<button className={style.buttonOfNext} onClick={()=>nextFilter(mainPage,setMainPage)}>
next</button> : null : mainPage.madeDogs.length === 3 || mainPage.madeDogs[0] ? 
<button className={style.buttonOfNext} onClick={()=>next(mainPage,setMainPage,dogsloaded)}>
next</button> : null :  mainPage.madeDogs.length === 3 || mainPage.madeDogs[0] ?
<button className={style.buttonOfNext} onClick={()=>next(mainPage,setMainPage,dogsloaded)}>
next</button> : null }
</div>
          {mainPage.dogsFiltered && mainPage.temperaments ? 
          <h2> Found dogs: {mainPage.dogsFiltered.length} </h2> : null }

 <div className={style.anotherContainer}>
    <input value={mainPage.value} onChange={e => handleChange(e)} className={style.input}></input>
    <button className={style.searchButton} onClick={() => searchFunction()}>Search</button>{dogsloadedBySearch[0] ? 
    <button className={style.backButton} onClick={() => searchFunction()}>back home</button> : null}
</div>
 {typeof dogsloadedBySearch[0] === 'object' ? <h1>Found dogs: {dogsloadedBySearch.length}</h1> : null}           
        <div className={style.container}>
        {dogsloadedBySearch[0] ? null : mainPage.currentPage === 1 && mainPage.madeDogs[1]
         && !mainPage.madeDogs[0] ? createdDogs?.map( d => 
                <CreateDog
                name={d.name}
                key={d.id}
                weight={d.weight}
                height= {d.height}
                temperament={d.temperament}
                lifeSpan= {d.life_Span}
                img={img}
                id={d.id}
                />
            ) : null
         }
         
          {mainPage.madeDogs.length < 3 && !mainPage.madeDogs[0] ? null :
          typeof dogsloadedBySearch[0] === 'object' ? dogsloadedBySearch.map( d => dogCard(d))
             : typeof dogsloadedBySearch[0] === 'string' ? <h1>{dogsloadedBySearch}</h1> :
             mainPage.dogsFiltered && !mainPage.prev ? mainPage.nextDogs && !mainPage.prev ?
             mainPage.nextDogs?.map( d => dogCard(d)) 
             : [...mainPage.dogsFiltered]?.splice(0,8).map( d => dogCard(d)) 
             : mainPage.prev ? mainPage.prevDogs?.map( d => dogCard(d))
             : mainPage.nextDogs ? mainPage.nextDogs?.map( d => dogCard(d)) 
             : mainPage.alphabetical && mainPage.descending ?
             [...mainPage.dogsReverse]?.slice(0,8 -mainPage.numOfDogsCreated).map( d => dogCard(d)) : 
             !mainPage.madeDogs[0]  && mainPage.madeDogs[1] && mainPage.madeDogs[2] ?  
             [...dogsloaded]?.slice(0,8-mainPage.numOfDogsCreated).map( d => dogCard(d)) :
              mainPage.madeDogs[0]  && mainPage.madeDogs[1] ?  
             [...dogsloaded]?.slice(0,8-mainPage.numOfDogsCreated).map( d => dogCard(d)) : null
          } 
        </div>
    </div>
        
      );
    }
    export default MainPage
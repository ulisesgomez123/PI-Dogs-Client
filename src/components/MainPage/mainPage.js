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

  React.useEffect( ()=>{
    dispatch(getDogs())
    dispatch(getTemperaments())
   },[]) 

  const [mainPage,setMainPage] = React.useState({
    notMadeDogs:false,
    madeDogs:false,
    beginning: true,
    dogsFilteredRender: false,
    dogsBySearch: false,
    next: false,
    prev: false,
    temperaments: false,
    value: '',
    currentPage: 1,
    dogsReverse:[],
    dogsFiltered:[],
    storage:[],
    numOfDogsCreated: createdDogs.length,
    alphabetical: true,
    byWeight: false,
    ascending: true,
    descending: false,
    orderByWeightAscending: false,
    orderByWeightDescending: false,
  })

  React.useEffect( ()=>{
    order(mainPage,setMainPage,dogsloaded)
   },[mainPage.alphabetical,mainPage.byWeight,mainPage.ascending,mainPage.descendiong,
    mainPage.temperaments,mainPage.madeDogs]) 

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
        cache: [mainPage.next,mainPage.prev,mainPage.beginning],
        dogsBySearch: true,
        next:false,
        prev:false,
        beginning:false
       }
     })
    }

    function backHome () {
      dispatch(getDogByName(mainPage.value))
      setMainPage((prevState) => {return {...prevState,
        value: '',
        temperaments: false,
        dogsBySearch: false,
        next:mainPage.cache[0],
        prev:mainPage.cache[1],
        beginning:mainPage.cache[2]
       }
     })
    }

    function onChange (e) {
     if (e.target.value === 'alphabetical') {
      setMainPage((prevState) => {return {...prevState,
        alphabetical: true,
        byWeight: false,
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
        madeDogs: false,
        notMadeDogs:true,
        next:true,
        dogsFiltered:[],
        dogsFilteredRender: false,
        temperaments: false,
        currentPage: mainPage.next || mainPage.prev ? mainPage.currentPage : 1
       } 
     })
    }

    function madeDogs () {
      setMainPage((prevState) => {return {...prevState,
        madeDogs: true,
        notMadeDogs:false,
        beginning:false,
        next:false,
        prev:false,
        dogsFilteredRender: false,
        numOfDogsCreated: createdDogs.length,
        temperaments: false,
        currentPage:1
       } 
     })
    }
      return ( 
        <div>
          <h1 className={style.h1}>Page: {mainPage.currentPage}</h1>

    {mainPage.temperaments ? <select onChange={(e)=>handleChangeSelect(e,setMainPage,mainPage)}
    className={style.selectTemperaments}><option key='0'>Temperaments </option> {temperaments?.map(t =>
     <option value={t.name} key={t.id}>{t.name}</option>)}</select> : null }

  <div className={style.divContainer}>      
 <div className={style.containerOfBtns}>
    <button onClick={notMadeDogs} className={style.btnFilter}>Not made dogs</button>
    <button onClick={madeDogs} className={style.btnFilter}>Made dogs</button>
    <button onClick={() =>buttonTemperaments(setMainPage)}
     className={style.btnFilter}> Dog temperaments</button>
</div>
{ !mainPage.madeDogs ?
<div className={style.selectContainer}>
          <select onChange={(e) => onChange(e)} className={style.select}>
             <option value='alphabetical'>Alphabetical</option>
             <option value='by weight'>By weight</option>
          </select>

          <select onChange={(e) => onChangeDirection(e)} className={style.select}>
             <option value='ascending'>Ascending</option>
             <option value='descending'>Descending</option>
          </select>
</div> : null }
</div>  
<div className={style.buttonOfNyP}>
{ !mainPage.dogsBySearch && !mainPage.dogsFilteredRender && !mainPage.madeDogs?
<button className={style.buttonOfPrevious} onClick={()=>previous(mainPage,setMainPage)}>
previous</button>  : null
}

{  !mainPage.dogsBySearch && !mainPage.dogsFilteredRender && !mainPage.madeDogs ?
<button className={style.buttonOfNext} onClick={()=>next(mainPage,setMainPage,dogsloaded)}>
next</button> : null
}
</div>
          {mainPage.dogsFiltered[0] && mainPage.temperaments ? 
          <h2> Found dogs: {mainPage.dogsFiltered.length} </h2> : null }
{ !mainPage.madeDogs && !mainPage.dogsFilteredRender ?
 <div className={style.anotherContainer}>
    <input value={mainPage.value} onChange={e => handleChange(e)} className={style.input}></input>
    <button className={style.searchButton} onClick={() => searchFunction()}>Search</button>
    { dogsloadedBySearch[0] ? 
    <button className={style.backButton} onClick={backHome}>back</button> : null}
</div> : null } 
 {typeof dogsloadedBySearch[0] === 'object' ? <h1>Found dogs: {dogsloadedBySearch.length}</h1> : null}   

        <div className={style.container}>
        { mainPage.madeDogs || typeof createdDogs[0] === 'object'  && mainPage.currentPage === 1 && 
        !mainPage.temperaments && !mainPage.notMadeDogs ? 
           createdDogs?.map( d => 
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

         { mainPage.beginning ? [...dogsloaded]?.slice(0,8- mainPage.numOfDogsCreated).map( d => dogCard(d)) : null}
         { mainPage.next ? mainPage.nextDogs?.map( d => dogCard(d)) : null}
         { mainPage.prev ? mainPage.prevDogs?.map( d => dogCard(d)) : null}
         { typeof dogsloadedBySearch[0] === 'object' && mainPage.dogsBySearch ? dogsloadedBySearch.map( d => dogCard(d)) : null}
         { mainPage.dogsFiltered[0] && mainPage.dogsFilteredRender ? mainPage.dogsFiltered.map( d => dogCard(d)) : null}
        </div> 
    </div>
        
      );
    }
    export default MainPage
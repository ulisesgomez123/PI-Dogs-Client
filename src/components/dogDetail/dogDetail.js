import React from 'react';
import {getDogDetails} from '../../redux/actions.js';
import { useDispatch, useSelector} from 'react-redux';
import style from '../MainPage/mainPage.module.css'
import DogDetailCard from './dogDetailCard.js';


export default function DogDetails (props) {
     
    const id = props.match.params.breedId;
    const dispatch= useDispatch()
    const dog = useSelector( state => state.dogDetails);

    React.useEffect(()=> {
        dispatch(getDogDetails(id))
    },[])

    return (
        <div>
        <h1 className={style.details}>Details:</h1>
        <div>
        {dog?.map( d => 
        <DogDetailCard
         name={d.name}
         weightMetric={d.weightMetric}
         weightImperial={d.weightImperial}
         img={d.imageUrl}
         temperament={d.temperament}
         lifeSpan={d.lifeSpan}
         heightMetric={d.heightMetric}
         heightImperial={d.heightImperial}
         />
         )}
         </div>
        </div>
     
         
    )
}




import React from "react";
import style from './createDog.module.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; 
import { createDog, getTemperaments } from "../../redux/actions";
import { validation,dispatchInfo} from "./functions";

const CreateDog = () => {
  let dispatch= useDispatch();
  var temps= useSelector( state => state.temperaments);

  React.useEffect(()=>{
    dispatch(getTemperaments())
  },[]) 

  const [error,setError] = React.useState(
    {
      breedError: '',
      heightError: '',
      weightError: '',
      lifeSpanError: '',
    }
  )
  const [input,setInput] = React.useState(
    {
      breed: "",
      height: '',
      weight: '',
      lifeSpan: '',
      temperament: []
    }
)

function handleChangeSelect (e) {
    setInput({...input,
              temperament: [...input.temperament, e.target.value]
    })
  }

  return (
    <div className={style.container}>
    <form onSubmit={(e) => dispatchInfo(e,error,input,setError,setInput,temps,dispatch,createDog)} 
    className={style.form}>{error.breedError? <span className={style.correct}>this field is OK</span> :

     <span>it should have only letters</span>}
 <input value={input.breed} name='breed' type='text' 
 onChange={(e)=> validation(e,setInput,setError,error)} placeholder='Breed Name'></input>

 {error.heightError? <span className={style.correct}>this field is OK</span>: 
 <span>it must have this format: min-max </span>}

 <input value={input.height} type='text' name='height'
  onChange={(e)=> validation(e,setInput,setError,error)} placeholder='Height: (min-max)'></input>

 {error.weightError?<span className={style.correct}>this field is OK</span>: 
 <span>it must have this format: min-max</span>} 

 <input value={input.weight} type='text' name='weight' 
 onChange={(e)=> validation(e,setInput,setError,error)} placeholder='Weight: (min-max)'></input>

 {error.lifeSpanError? <span className={style.correct}>this field is OK</span> :
  <span>it must have this format: min-max</span>} 

 <input value={input.lifeSpan} type='text' name="lifeSpan" 
 onChange={(e)=> validation(e,setInput,setError,error)} placeholder='Life span: (min-max)'></input>

<div className={style.end}>
  <select name='temperament' onChange={(e) => handleChangeSelect(e)} className={style.select}>
            <option key='0'>Temperaments </option>
            {temps?.map(t => <option value={t.name} key={t.id}>{t.name}</option>)}
  </select>
    <button type='submit' className={style.button}>Create</button>
</div>
</form>

    <div className={style.showDogInput}>
      <label className={error.breedError ? style.label : style.warning}>Breed: 
      <div className={style.div}>{input.breed}</div></label>

      <label className={error.heightError ? style.label : style.warning}>Height: 
      <div className={style.div}>{`(${input.height})`} centimeters</div></label>

      <label className={error.weightError ? style.label : style.warning}>Weight:
      <div className={style.div}>{`(${input.weight})`} kilograms</div></label>

      <label className={error.lifeSpanError ? style.label : style.warning}>Life Span: 
      <div className={style.div}>{`(${input.lifeSpan})`} years</div></label>

      <label className={style.label}>Temperaments: 
        <div className={style.temperament}>
        {input.temperament?.map(t => <div className={style.div}>{t}</div>)}
        </div>
      </label>
      
    </div>
    </div>
  );
};

export default CreateDog;

    function rectifyNum (e,changeStateError) {
    let err= 'Error';
    let name= e.target.name + err;
    let verify =/^\d+\-\d+$/.test(e.target.value)
    if (verify) {
      var strToArray= e.target.value.split('-')
       let min = parseInt(strToArray[0])
       let max = parseInt(strToArray[1])
      if (min < max) { 
        changeStateError((prevState) => { return {...prevState, [name]: true} });
      }
      else  {
        changeStateError((prevState) => { return {...prevState, [name]: false} });
      }
    }
    else {
     changeStateError((prevState) => { return {...prevState, [name]: false} });
    }
   }

  export function validation (e,changeState,changeStateError,error) {
    changeState((prevState) => {return {...prevState,
      [e.target.name]: e.target.value
     }
   })
     if (e.target.name === 'breed') {
      changeStateError({...error,
       breedError: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(e.target.value)
      })
     }
     else {
       rectifyNum(e,changeStateError)
     }
     
   }

   export function submitControl (error) {
    if (!error.breedError || !error.heightError || !error.weightError || !error.lifeSpanError) {
      let h1= document.querySelector('#h1OfCorrect')
      if (h1) {document.querySelector('#h1OfCorrect').remove()}
     var div = document.createElement("div");
     div.innerHTML= 'wrong, you must fill out the form correctly'
     div.style.position='absolute'
     div.style.fontSize='30px'
     div.style.height='100px'
     div.style.width='fit-content'
     div.style.color='red'
     div.style.marginTop='20px'
     div.style.fontWeight='bold'
     document.querySelector('form').appendChild(div)
     div.id='wrong'
     return true
    }
    return false
   }

   export function dispatchInfo (e,error,input,setError,setInput,temps,dispatch,createDog) {
    e.preventDefault();
    let test= submitControl(error)
    if (!test) {
      let h1= document.querySelector('#h1OfCorrect')
      if (h1) {document.querySelector('#h1OfCorrect').remove()}
     let div= document.querySelector('#wrong')
      if (div) {document.querySelector('#wrong').remove()}
      let h1OfCorrect = document.createElement("h1");
      h1OfCorrect.innerHTML= 'you have created '+input.breed + ' successfully, see it at Home'
      h1OfCorrect.style.position='absolute'
      h1OfCorrect.style.fontSize='30px'
      h1OfCorrect.style.height='100px'
      h1OfCorrect.style.width='fit-content'
      h1OfCorrect.style.color='rgb(215, 121, 27)'
      h1OfCorrect.style.marginTop='20px'
      h1OfCorrect.style.fontWeight='bold'
      h1OfCorrect.id= 'h1OfCorrect'
      document.querySelector('form').appendChild(h1OfCorrect)
      const arrayOfTempsId = input.temperament.map(t => {
        for (let i = 0; i < temps.length; i++) {
          if (t === temps[i].name) return temps[i].id
        }
      })
      dispatch(createDog({...input, arrayOfTempsId}))
      setInput({
        breed: "",
        height: '',
        weight: '',
        lifeSpan: '',
        temperament: []
      })
      setError({
        breedError: '',
        heightError: '',
        weightError: '',
        lifeSpanError: '',
      })
    }
  }
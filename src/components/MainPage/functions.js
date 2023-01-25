import DogCard from "../dogsCard/dogcard";

export function orderByWeight (dogsLoaded) {
  const splited = dogsLoaded.map(d => {
    return {...d,split: d.weightMetric.split(' - ')}
  })
const noFiltered = splited.map(d => {
    return {...d, averageWeight: (parseInt(d.split[0]) + parseInt(d.split[1])) / 2} 
 }).sort(function(a, b) {
    if(a.averageWeight < b.averageWeight) { return -1; }
    if(a.averageWeight > b.averageWeight) { return 1; }
    return 0;
})
return noFiltered.filter(d => !isNaN(d.averageWeight))
}

export function buttonTemperaments (changeState) {
    changeState((prevState) => {return {...prevState,
        temperaments: true,
        beginning: false,
        madeDogs: [true,true]
       } 
     })
}

 function selectionTemperament (state,dogs) {
    let Dogs = [...dogs].filter(d => d.temperament?.includes(state.temperamentString))
    return Dogs
    }

export function handleChangeSelect (e,changeState) {
    changeState((prevState) => {return {...prevState,
        temperamentString: e.target.value,
        currentPage: 1,
        nextDogs:'',
        madeDogs: [true,true]
       } 
     })
  }

function nextControler (state,changeState,dogs,index,Repeat) {
  if (!state.storage[0]) {
    changeState((prevState) => {return {...prevState,
      nextDogs: state.descending && state.alphabetical ? [...state.dogsReverse]?.splice(index,8) :
               state.ascending && state.alphabetical ? [...dogs]?.splice(index, 8) : 
               state.ascending && state.byWeight ? [...state.orderByWeightAscending].splice(index,8) :
               state.descending && state.byWeight ? [...state.orderByWeightDescending].splice(index,8) : null,
      currentPage: state.currentPage + 1,
      storage: state.descending && state.alphabetical ? [...state.dogsReverse]?.splice(0,8 - state.numOfDogsCreated):
               state.ascending && state.alphabetical ? [...dogs]?.splice(0, 8 -  state.numOfDogsCreated) :
               state.ascending && state.byWeight ? [...state.nextDogs] :
               state.descending && state.byWeight ? [...state.nextDogs] : null,
      prev: false,
           } 
        })
  }
  else {
    changeState((prevState) => {return {...prevState,
nextDogs: state.ascending && state.alphabetical ? [...dogs]?.splice(index, 8):
          state.descending && state.alphabetical ? [...state.dogsReverse]?.splice(index,8) :
          state.ascending && state.byWeight ? [...state.orderByWeightAscending].splice(index, 8) :
          state.descending && state.byWeight ? [...state.orderByWeightDescending].splice(index, 8) :null,
storage: !Repeat ? [...state.storage,...state.nextDogs] : [...state.storage],
currentPage: state.currentPage + 1,
prev: false,
     } 
   })
  }
;
}

  export function next (state,changeState,dogs) {
    if (state.currentPage > 21 && state.alphabetical) return
    if (state.currentPage > 20 && !state.alphabetical) return
    var index= state.currentPage * 8 - state.numOfDogsCreated;
    var Repeat= state.storage.find(d =>  d.id === state.nextDogs[0].id)
    nextControler(state,changeState,dogs,index,Repeat)
}

export function dogCard (d) {
    return <DogCard 
    name={d.name}
    key={d.id}
    weightMetric={d.weightMetric}
    weightImperial={d.weightImperial}
    temperament={d.temperament}
    img= {d.imageUrl}
    id={d.id}
    />
}

function sortMadeDogsByWeight (createdDog) {
  return createdDog.sort(function(a, b) {
    if(parseInt(a.weight.split('-')[0]) + parseInt(a.weight.split('-')[1]) / 2 < 
    parseInt(b.weight.split('-')[0]) +parseInt(b.weight.split('-')[1])) { return -1; }

    if(parseInt(a.weight.split('-')[0]) + parseInt(a.weight.split('-')[1]) / 2 >
    parseInt(b.weight.split('-')[0]) + parseInt(b.weight.split('-')[1]) / 2) { return 1; }

    return 0;
})
}

function sortMadeDogs (createdDogs) {
  return createdDogs.sort(function(a, b) {
    if(a.name[0].toLowerCase() < b.name[0].toLowerCase() ) { return -1; }
    if( a.name[0].toLowerCase() >  b.name[0].toLowerCase()) { return 1; }
    return 0;
})
}

export function filter (state,changeState,dogs,createdDogs) {
    if (state.alphabetical) {
    if (state.ascending && state.temperaments) {
        changeState((prevState) => {return {...prevState,
            dogsFiltered: selectionTemperament(state,dogs)
          } 
        })
      }
    if (state.descending && state.temperaments) {
        changeState((prevState) => {return {...prevState,
            dogsFiltered: selectionTemperament(state,dogs).reverse()
        } 
      })
    }
    if (state.ascending && !state.madeDogs[0] && state.madeDogs.length === 2) {
           sortMadeDogs(createdDogs)
    }
  if (state.descending && !state.madeDogs[0] && state.madeDogs.length === 2) {
    sortMadeDogs(createdDogs).reverse()
 }
}
    if (state.byWeight) {
        if (state.ascending) {
            changeState((prevState) => {return {...prevState,
                dogsFiltered: selectionTemperament(state,state.orderByWeightAscending)
              } 
            })
        }
        if (state.descending) {
            changeState((prevState) => {return {...prevState,
                dogsFiltered: selectionTemperament(state,state.orderByWeightAscending).reverse()
              } 
            })
        }
        if (state.ascending && !state.madeDogs[0] && state.madeDogs.length === 2) {
          sortMadeDogsByWeight(createdDogs)
   }
 if (state.descending && !state.madeDogs[0] && state.madeDogs.length === 2) {
   sortMadeDogsByWeight(createdDogs).reverse()
    }
  }
}

export function nextFilter (state,changeState) {
    var index = state.currentPage * 8 
    if (![...state.dogsFiltered]?.splice(index,8)[0]) return 
    if (state.temperaments && state.currentPage === 1) {
        changeState((prevState) => {return {...prevState,
            nextDogs: [...state.dogsFiltered]?.splice(index,8),
            storage: [...state.dogsFiltered]?.splice(0,8),
            currentPage: state.currentPage + 1,
            prev: false,
          } 
        })
    }
    else {
        changeState((prevState) => {return {...prevState,
            nextDogs: [...state.dogsFiltered]?.splice(index,8),
            storage: [...state.storage,...state.nextDogs],
            currentPage: state.currentPage + 1,
            prev: false
          } 
        })
    }
}

function orderControler (state,changeState,dogs) {
  if (!state.beginning) {
    changeState((prevState) => {return {...prevState,
    dogsReverse: state.alphabetical && state.ascending ? [...dogs].reverse() : [...dogs].reverse(),
    orderByWeightDescending: state.byWeight && state.descending ? 
    [...state.orderByWeightAscending]?.reverse() : null,
nextDogs: state.alphabetical && state.ascending ? [...dogs].slice(0,8 - state.numOfDogsCreated):
state.alphabetical && state.descending ? [...dogs].reverse().slice(0,8 - state.numOfDogsCreated):
state.byWeight && state.ascending ? [...state.orderByWeightAscending].slice(0,8 - state.numOfDogsCreated):
      state.byWeight && state.descending ? 
      [...state.orderByWeightAscending].reverse().splice(0,8 - state.numOfDogsCreated) : null,
      currentPage: 1,
      storage: [],
      };})
  }
  else {
    changeState((prevState) => {return {...prevState,
      storage: state.alphabetical && state.ascending ? [] : [],
      nextDogs: state.byWeight && state.ascending ? 
      orderByWeight(dogs).slice(0,8 - state.numOfDogsCreated) : null,
      beginning: state.byWeight && state.ascending ? false : true,
      currentPage: state.byWeight && state.ascending ? 1 : 1
     };})
  }
}

export function order (state,changeState,dogs) {
    changeState((prevState) => {return {...prevState,
        orderByWeightAscending: orderByWeight(dogs)
       };})
     if (state.temperaments) {
      changeState((prevState) => {return {...prevState,
        orderByWeightAscending: orderByWeight(dogs)
       };})
    }
      orderControler(state,changeState,dogs)
}

export function previous(state,changeState) {
  if (state.currentPage <= 1) return 
    let index= state.currentPage * 8 - 8*2 - state.numOfDogsCreated
    if (state.currentPage !== 2) {
          changeState((prevState) => {return {...prevState,
            prevDogs: [...state.storage]?.splice(index, 8),
            currentPage: state.currentPage - 1,
            prev: true,
           } 
         })
        }
    else{
          changeState((prevState) => {return {...prevState,
            prevDogs: [...state.storage]?.splice(0,8 - state.numOfDogsCreated),
            currentPage: state.currentPage - 1,
            prev: true,
           } 
         })
        }
      }
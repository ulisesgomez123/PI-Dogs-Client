import axios from 'axios';
var numRam= Math.random() * (Math.random() * 4044440)
var id= Math.floor(numRam)


export function getDogs() {
    return function(dispatch) {
      return axios(`/dogs`)
        .then(res => {
          dispatch({ type: "GET_DOGS" ,payload: res.data });
        });
    };
  }

  export function getDogsByQuery(query) {
    return function(dispatch) {
      return axios(`/dogs?name=${query}`)
        .then(res => {
          dispatch({ type: "GET_DOGS_BY_QUERY" ,payload: res.data });
        });
    };
  }

  export function getDogDetails(breedId) {
    return function(dispatch) {
      return axios(`/dogs/${breedId}`)
        .then(res => {
          dispatch({ type: "GET_DETAILS" ,payload: res.data });
        });
    };
  }

  export function getTemperaments() {
    return function(dispatch) {
      return axios(`/temperaments`)
        .then(res => {
          dispatch({ type: "GET_TEMPERAMENTS" ,payload: res.data });
        });
    };
  }

  export function createDog(input) {
    return function(dispatch) {
      return axios.post("/dogs/creation",{
        ...input,
        id: id = id + 1
        })
        .then(res => {
          dispatch({ type:"CREATE_DOG" ,payload: res.data });
        });
    };
  }

  export function getDogByName(name) {
    return function(dispatch) {
      return axios(`/dogs/search/${name}`)
        .then(res => {
          dispatch({ type:"GET_DOG_BY_NAME" ,payload: res.data });
        });
    };
  }
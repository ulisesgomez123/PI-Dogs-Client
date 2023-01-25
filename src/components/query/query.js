import React, { Component } from "react";
import {getDogsByQuery} from '../../redux/actions';
import { connect } from "react-redux";
import DogCard from "../dogsCard/dogcard";
import style from '../MainPage/mainPage.module.css'


export class Query extends Component {
    componentDidMount() {
      const querystring = window.location.search
      const params = new URLSearchParams(querystring)
      const query= params.get('name')
      if (query) {
        this.props.getDogsByQuery(query)
      }
    }
    render() {
      return (
        <div>
          {typeof this.props.dogList === 'string' ? <h1>{this.props.dogList}</h1> : 
          <div className={style.container}>
          {this.props.dogList?.map( d => 
              <DogCard 
              name={d.name}
              key={d.id}
              weightMetric={d.weightMetric}
              weightImperial={d.weightImperial}
              img={d.imageUrl}
              temperament={d.temperament}
              />
          )}
      </div>
          }
        
        </div>
        
      );
    }
  }
  
  export const mapStateToProps = function (state) {
    return {
      dogList: state.dogsloadedByQuery
    }
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        getDogsByQuery: (query) => dispatch(getDogsByQuery(query))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Query);
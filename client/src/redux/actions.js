import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const POST_ACTIVITIES = "POST_ACTIVITIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITIES = "FILTER_BY_ACTIVITIES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

export const getCountries = () => {
    return async (dispatch) => {
        try {
            const requestCountries = await axios.get('/countries')
            return dispatch({
                type: GET_COUNTRIES,
                payload: requestCountries.data
            })
        } catch (error) {
            alert('The api countries it doesnt work');
            console.log(error);
        }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const detail = await axios.get(`/countries/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload: detail.data
            })
        } catch (error) {
            alert("Algo salio mal")
            console.log({error: error});
        }
    }
} 

export const searchCountries = (name) => {
    return async (dispatch) => {
        try {
            const countries = await axios.get(`/countries?name=${name}`);
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: countries.data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const postActivity = (activity) => {
    return async function(dispatch){
        console.log(activity);
        const activityTour = await axios.post("/activities", activity);
        return activityTour
    }
}

export const getActivities = () => {
    return async function(dispatch){
        try {
            const activities = await axios.get(`/activities`);
            return dispatch({
                type: GET_ACTIVITIES,
                payload: activities.data
            })
        } catch (error) {
            return error.message
            // console.log({error: error});
        }
    }
}

export function filterCountryByContinent(payload){
    return {
      type: FILTER_BY_CONTINENT,
      payload: payload
    }
}

export function filterCountryByActivity(payload){
    return {
        type: FILTER_BY_ACTIVITIES,
        payload: payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload: payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload: payload
    }
}
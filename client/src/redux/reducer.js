import { FILTER_BY_ACTIVITIES, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_DETAIL, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITIES, SEARCH_COUNTRIES } from "./actions";

const initialState = {
    allCountries: [],
    filteredCountries: [], 
    countryDetail: [],
    activities: [],
    allActivities: [],
}

export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: [...action.payload],
                filteredCountries: [...action.payload]
            }
        case GET_DETAIL:
            // console.log(action);
                return {
                    ...state,
                    countryDetail: action.payload
            }
        case SEARCH_COUNTRIES:
            // console.log({"action.payload es":action.payload})
            if(action.payload.error){
                return{
                    ...state,
                    filteredCountries: [action.payload]
                }
            }
            return {
                ...state,
                filteredCountries: [...action.payload]
            }
        case POST_ACTIVITIES:
            return {
                ...state,
                activities: [action.payload]
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: [action.payload],
            }
        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const continentFiltered = action.payload === 'All' ? allCountries 
            : allCountries.filter(country=> country.continent === action.payload);
            if(action.payload){
                return {
                    ...state,
                    filteredCountries: continentFiltered,
                };
            }
            return {
                ...state,
                filteredCountries: allCountries
            }
        case FILTER_BY_ACTIVITIES:
            const filteredCountries = state.allCountries
            const filteredByActivities = !action.payload ? filteredCountries 
            : filteredCountries.filter(country => country.tourist_activities.find(activity => activity.name === action.payload))
            // console.log({"Filtered by activity is": filteredByActivities});
            if(action.payload){
                return{
                    ...state,
                    filteredCountries: filteredByActivities
                }
            }
            return{
                ...state,
                filteredCountries
            }
        case ORDER_BY_POPULATION:
            let sortPopulation = action.payload === "lessPeople" ?
                state.filteredCountries.sort(function (a,b) {
                  if (a.population > b.population){
                    return 1;
                  }
                  if (b.population > a.population){
                    return -1;
                  }
                  return 0;
                }) 
                : state.filteredCountries.sort(function (a,b) {
                  if (a.population > b.population){
                    return -1;
                  }
                  if (b.population > a.population){
                    return 1;
                  }
                  return 0;
                })
            return {
                 ...state,
                 filteredCountries: sortPopulation
            }
        case ORDER_BY_NAME:
            let sortName = state.filteredCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
              if(!action.payload) return state
              if(action.payload === "asc"){
                return {
                    ...state,
                    filteredCountries: sortName
                }
              }
              return{
                ...state,
                filteredCountries: sortName.reverse()
            }
        default:
            return state;
    }
}
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./loader/Loader.jsx"
import "../styles/details.css"

export default function CountryDetail(props){
    const {setIsLoading} = props;

    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(()=> {
        dispatch(getDetail(id));
    },[])
    
    let details = useSelector(state => state.countryDetail);

    if(details.length) setIsLoading(false)

    return(
        <div id="background">
        <button id="back_button" onClick={props.GoBack}>Back</button>
            {!details.length || details[0].ID !== id ? <Loader/>
         :<section id="all_details">
        <img src={details[0].image} alt={details.name} />
        <div>

        <h1 className="details">{details[0].ID}</h1>
        <h1 className="details">Name: {details[0].name}</h1>
        <h2 className="details">Capital: {details[0].capital}</h2>
        <h2 className="details">Continent: {details[0].continent}</h2>
        <h3 className="details">Area: {details[0].area}km2</h3>
        <h3 className="details">Population: {details[0].population}</h3>
        <h3 className="details">Subregion: {details[0].subregion}</h3>
        </div>

        <div id="activities">
        <h2 className="details">Activities:</h2>
        {details[0].tourist_activities.length ? details[0].tourist_activities.map(activity => <div className="activity">
            <fieldset>
                <legend><h3>{activity.name}</h3></legend>
                <h4 className="details">Difficulty: {activity.difficulty}</h4>
                <h4 className="details">Duration: {activity.duration}</h4>
                <h4 id="last_detail" className="details">Season: {activity.season}</h4>
            </fieldset>
        </div>): <div><h3>There`s no activities</h3></div>}
        </div>

        </section> 
        }

        </div>
    )
}
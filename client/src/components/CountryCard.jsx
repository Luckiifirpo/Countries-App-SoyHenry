import { Link } from "react-router-dom";
import "../styles/cards.css"
export default function CountryCard(props){
    // console.log(props);
    return(
        <div className="card">
            <Link to={`/detailedCountry/${props.ID}`}>
                <img src={props.image} alt={props.name} width="300px" height={"200px"}/>
            </Link>
            <h2 className="card_text">{props.name}</h2>
            <h3 className="card_text">{props.continent}</h3>
        </div>
    )
}
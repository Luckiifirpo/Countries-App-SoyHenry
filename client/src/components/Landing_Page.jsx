import "../styles/landing_page.css"
import plane from "../resources/avion.svg"

export default function Landing(props){
    const {setIsLoading} = props
    setIsLoading(false)
    return(
        <div id="ingresar">
            <h1>Countries App</h1>
            <div id="buttonLanding" onClick={props.LandingSubmit}>
                <img src={plane} alt="Plane image, click to start"/>
                <h3>start</h3>
            </div>
        </div>
    )
}
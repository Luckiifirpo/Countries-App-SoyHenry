import "../styles/landing_page.css"

export default function Landing(props){
    const {setIsLoading} = props
    setIsLoading(false)
    return(
        <div id="ingresar">
            <h1>Countries App</h1>
            <button type="submit" onClick={props.LandingSubmit} id="ingresar">Ingresar</button>
        </div>
    )
}
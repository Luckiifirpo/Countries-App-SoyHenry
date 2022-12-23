import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { postActivity } from "../../redux/actions";
import Validate from "./validations";
import Loader from "../loader/Loader";
import "./form.css"


var currentId = Math.random(0, 999);

function generateId() {
    currentId = Math.random(0, 999);
    return currentId;
}

const CreateActivity = (props) => {
    let {allCountries, setIsLoading} = props;
    const dispatch = useDispatch()
    setIsLoading(true)

    const [selected, setSelected] = useState([])
    const [data, setData] = useState({
        ID: 0,
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        durationTime: "",
        countriesID: [],
    })
    
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        durationTime: "",
        countriesID: "",
    })
    
    useEffect(() => {
        if (allCountries) {
            allCountries = props.allCountries;
        }
    }, [props.allCountries])

    useEffect(() => {
        setData({
            ...data,
            countriesID: [...data.countriesID],
        })
    }, [selected])
    
    function handleInputChange(e){
        setErrors(Validate({
            ...data,
            [e.target.name]: e.target.value,
        }));
        
        setData({  
            ...data,
            [e.target.name]: e.target.value,
        })
        console.log(data);
    }

    function handleCountriesSelect(e){
        setSelected([...selected, e.target.value])
        setErrors(Validate({
            ...data,
            countriesID: [...data.countriesID, e.target.value],
        }));

        setData({
            ...data,
            countriesID: [...data.countriesID, e.target.value],
        })
    }
    function Submit(e){;
       window.alert("The Activity has been created")
       setData({
        ...data,
        ID: generateId()
       })
       dispatch(postActivity(data))
    }

    if(allCountries.length) setIsLoading(false)
    return(
        <div>
            {allCountries.length ? <div>

            
            <button id="go_back" onClick={props.GoBack}>Go Back</button>
            <h1 id="title">Create Activity</h1>
            <form id="form" onSubmit={Submit}>
                <div id="div_form">

                <div>
                 <p>Activity Name:</p>
                    <input type="text"
                    placeholder="Name..."
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}/>
                    {/* <h5 className="errors">{errors.name && errors.name}</h5> */}
                </div>
                <div>
                 <p>Difficulty:</p>
                    <select onChange={handleInputChange} name="difficulty">
                        <option selected={true} disabled={true} value="">Difficulty...</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                  {/* <input type="number"
                   placeholder="Difficulty..."
                   name="difficulty"
                   value={data.difficulty}
                   onChange={handleInputChange} /> */}
                    {/* <h5 className="errors">{errors.difficulty && errors.difficulty}</h5> */}
                </div>
                <div id="duration">
                    <p>Duration:</p>
                    <input type="number"
                     placeholder="Duration..."
                     name="duration"
                     value={data.duration}
                     onChange={handleInputChange} />
                    <select id="select_time" name="durationTime" onChange={handleInputChange}>
                        <option value="" selected={true} disabled={true}>Time</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                    {/* <h5 className="errors">{errors.duration && errors.duration}</h5>
                    <h5 className="errors">{errors.durationTime && errors.durationTime}</h5> */}
                </div>
                <div>
                    <p>Season:</p>
                        <select onChange={handleInputChange} name="season">
                            <option value="" disabled selected={true}>Season:</option>
                            <option value="summer">Summer</option>
                            <option value="spring">Spring</option>
                            <option value="winter">Winter</option>
                            <option value="autumn">Autumn</option>
                        </select>
                    {/* <h5 className="errors">{errors.season && errors.season}</h5> */}
                </div>

                </div>
                <div className="errorDiv">
                    <h5 className="errors">{errors.name && errors.name}</h5>
                    <h5 className="errors">{errors.difficulty && errors.difficulty}</h5>
                    <h5 className="errors">{errors.duration && errors.duration}</h5>
                    <h5 className="errors">{errors.durationTime && errors.durationTime}</h5>
                    <h5 className="errors">{errors.season && errors.season}</h5>
                </div>
                <h5 className="errors">{errors.countriesID && errors.countriesID}</h5>
                <div id="countries">
                    {allCountries ? allCountries.map(c =>  
                    <div key={c.ID}>
                        <label className="countriesflag" for={c.ID}>
                            <input id={c.ID} className="checkbox" onChange={handleCountriesSelect} name="countries" type="checkbox" value={c.ID}/>
                            <img className="flags" src={c.image} alt={c.name + "flag"} width="100px" height="60px"/>
                        </label>
                    </div>): null}
                </div>
                <br />
                    <button id="create" type="submit" disabled={Object.keys(errors).length > 0}>Create</button>
            </form>
            </div>  : [setIsLoading(true)]}
        </div>
    )
}

export default CreateActivity;
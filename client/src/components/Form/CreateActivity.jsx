import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getDetail, postActivity } from "../../redux/actions";
import Validate from "./validations";
import "./form.css"

const CreateActivity = (props) => {
    let {allCountries, setIsLoading} = props;
    const dispatch = useDispatch();
    setIsLoading(true);

    const detail = useSelector(state => state.countryDetail);
    const [selected, setSelected] = useState([]);

    const [data, setData] = useState({
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
        if(detail.length > 0) setSelected([...selected,{flag: detail[0].image, id: detail[0].ID}])
    }, [detail])

    useEffect(() => {
        if (allCountries) {
            allCountries = props.allCountries;
        }
    }, [props.allCountries])
    
    function handleInputChange(e){
        setErrors(Validate({
            ...data,
            [e.target.name]: e.target.value,
        }));
        
        setData({  
            ...data,
            [e.target.name]: e.target.value,
        })
    }
    
    function handleCountriesSelect(e){
        setErrors(Validate({
            ...data,
            countriesID: [...data.countriesID, e.target.value],
        }));
        
        setData({
            ...data,
            countriesID: [...data.countriesID, e.target.value],
        })

        dispatch(getDetail(e.target.value)) 
    }

    function Submit(e){;
        window.alert("The Activity has been created")
        setData({
            ...data,
        })
        dispatch(postActivity(data))
    }

    function clearSelected(e){
        setData({
            ...data,
            countriesID: data.countriesID.filter(id => id !== e.target.name)
        });
        setSelected(selected.filter(info => info.flag !== e.target.value));
    }

    if(allCountries.length) setIsLoading(false)
    return(
        <div id="form_background">
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
                </div>
                <div id="duration">
                    <p>Duration:</p>
                    <input type="number"
                     placeholder="Time..."
                     name="duration"
                     min={1}
                     max={59}
                     value={data.duration}
                     onChange={handleInputChange}
                     id="time_input" />
                    <select id="select_time" name="durationTime" onChange={handleInputChange}>
                        <option value="" selected={true} disabled={true}>Time</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
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
                    <p>Countries:</p>
                    <br/>
                    <select name="countries" onChange={handleCountriesSelect}>
                        <option disabled={true} selected={true} value="">Select country...</option>
                    {allCountries ?
                    allCountries.map(c => 
                        <option name={c.image} value={c.ID}>{c.name}</option>
                    ): null}
                    </select>
                </div>

                <br />
                    <button id="create" type="submit" disabled={Object.keys(errors).length > 0}>Create</button>
            </form>
            <div id="selectedCountries">
                {selected.length > 0 ? selected.map(info => <div className="flag_and_button">
                    <button name={info.id} value={info.flag} onClick={clearSelected} >X</button>
                    <img src={info.flag} alt="flag" className="flags" />
                </div>) : null}
            </div>
            </div> : [setIsLoading(true)]}
        </div>
    )
}

export default CreateActivity;
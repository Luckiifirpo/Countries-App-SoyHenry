import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCountryByActivity, filterCountryByContinent, getActivities, orderByName, orderByPopulation, searchCountries } from "../redux/actions";
import { Link } from "react-router-dom";
import "../styles/Nav_Bar.css"
import Loader from "./loader/Loader";

export default function NavBar(props){
    const {setCurrentPage, Apply, currentPage} = props;
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [order, setOrder] = useState({
        population: "",
        countryOrder: "",
    })

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value);
    }
    
    function handleFilter(e){
        dispatch(filterCountryByActivity(e.target.value))
        setCurrentPage(1)
    }

    function handleContinentFilter(e){
        dispatch(filterCountryByContinent(e.target.value))
        setCurrentPage(1)
    }
    
    function handleOrder(e){
        setOrder({
            ...order,
            [e.target.name]: e.target.value,
        })
    }

    
    useEffect(()=> {
        dispatch(getActivities());
    }, [dispatch])
    
    useEffect(() => {
        dispatch(searchCountries(name))
        setCurrentPage(1)
    },[name, dispatch])
    
    useEffect(() => {
        dispatch(orderByPopulation(order.population))
        if(currentPage === 1){
            Apply()
        }
        setCurrentPage(1)
    }, [order.population, dispatch])

    useEffect(() => {
        dispatch(orderByName(order.countryOrder))
        if(currentPage === 1){
            Apply()
        }
        setCurrentPage(1)
    }, [order.countryOrder, dispatch])


    const allActivities = useSelector(state => state.allActivities)

    return(<div id="navbar">
        <section>  
            <h2 id="title">Countries App</h2>
        <div>   
            <section>
                <button id="logout" onClick={props.LogOut}>logOut</button>
                <Link to={"/createActivity"}><button id="create_activity_button">Create Activity</button></Link>
            </section>
            <input id="searchbar" type="search" placeholder="Search countrie by name..." value={name} onChange={handleChange}/>
        </div>
        <div id="filters">
            <h4>Filter:</h4>
            <div className="filters_orders">
                <select name="continent" onChange={handleContinentFilter}>
                    <option value="" selected={true} disabled={true}>Continent</option>
                    <option value="All">All</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
                <select name="tour_activity" onChange={handleFilter}>
                    <option value="">All</option>
                    {!allActivities || allActivities.length ?
                     allActivities[0].allActivities.map(activity => <option key={activity.ID}>{activity.name}</option>) 
                     : <option value="" disabled={true}>There`s no activities</option>}
                </select>
            </div>
        <h4>Order:</h4>
            <div className="filters_orders">
                <select name="countryOrder" onChange={handleOrder}>
                    <option selected={true} disabled={true} value="">Order by name</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
                <select name="population" onChange={handleOrder}>
                    <option selected={true} disabled={true} value="">Order by population</option>
                    <option value="morePeople">Population ▲</option>
                    <option value="lessPeople">Population ▼</option>
                </select>
            </div>
        </div>
        </section>
    </div>
    )
}
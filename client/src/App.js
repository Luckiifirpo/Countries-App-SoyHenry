import './App.css';
import Landing from "./components/Landing_Page"
import Principal from './components/Principal_Route';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import { useSelector, connect } from "react-redux"
import { getCountries } from './redux/actions';
import NavBar from './components/NavBar';
import CountryDetail from './components/CountryDetail';
import CreateActivity from "./components/Form/CreateActivity"
import { useState } from 'react';
import Loader from './components/loader/Loader';
import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:3001/"
axios.defaults.baseURL = "https://countries-app-soyhenry-production.up.railway.app/"


function App() {
  const navigate = useNavigate()
  const location = useLocation();

  const allCountries = useSelector(state => state.filteredCountries)
  const countries = useSelector(state => state.allCountries)

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function logOut(){
    navigate("/")
  }
  function GoHome(){
    navigate("/home")
  }

  const dataForPagination = {
    ITEMS_IN_FIRST_PAGE: 9,
    ITEMS_PER_PAGE: 10
  }

  return (
    <div className="App">
      {isLoading ? <Loader/> : null}
      {location.pathname === "/home" ? <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} LogOut={logOut} Apply={GoHome}/> : null}
      <Routes>
        <Route path='/' element={<Landing setIsLoading={setIsLoading} LandingSubmit={GoHome}/>}/>
        <Route path='/home' element={<Principal setIsLoading={setIsLoading} setCurrentPage={setCurrentPage} currentPage={currentPage} allCountries={allCountries} dataForPagination={dataForPagination} />} />
        <Route path='/detailedCountry/:id' element={<CountryDetail setIsLoading={setIsLoading} GoBack={GoHome}/>}/>
        <Route path='/createActivity' element={<CreateActivity setIsLoading={setIsLoading} GoBack={GoHome} allCountries={countries}/>}/>
      </Routes>
    </div>
  );
}

function mapStateToProps(state){
  return {
    allCountries: state.allCountries,
    activities: state.activities,
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllcountries: dispatch(getCountries()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

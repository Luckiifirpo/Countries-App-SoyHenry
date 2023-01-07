import CountryCard from "./CountryCard"
import Loader from "./loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/cards.css"

export default function Principal(props){
    const {allCountries, dataForPagination, currentPage, setCurrentPage, setIsLoading} = props;
    const {ITEMS_IN_FIRST_PAGE, ITEMS_PER_PAGE} = dataForPagination;
    const [items, setItems] = useState([...allCountries])
    
    setIsLoading(true)

    function nextHandler(){
        const totalItems = allCountries.length;
        
        const nextPage = currentPage + 1;
        
        const firstIndex = nextPage * ITEMS_PER_PAGE
        
        if(firstIndex >= totalItems) return;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        if(allCountries.length){
            setItems([...allCountries].splice(firstIndex - 1, ITEMS_PER_PAGE))
            setCurrentPage(nextPage)
        }else{
            setItems([])
        }
    }

    function nextHandlerToTest(event){
        let pageToMove = parseInt(event.target.value)

        const totalItems = allCountries.length;
        
        const nextPage = pageToMove;
        
        const firstIndex = nextPage * ITEMS_PER_PAGE
        
        if(firstIndex >= totalItems) return;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        if(allCountries.length){
            setItems([...allCountries].splice(firstIndex - 1, ITEMS_PER_PAGE))
            setCurrentPage(nextPage)
        }else{
            setItems([])
        }
    }

    function prevHandler(){
        if(currentPage === 1) return;
        
        const prevPage = currentPage - 1;
        
        const lastIndex = prevPage * ITEMS_PER_PAGE;
        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        setItems([...allCountries].splice(lastIndex -  1, ITEMS_PER_PAGE))

        setCurrentPage(prevPage);
    }

    let firstPage = [...allCountries].splice(0, ITEMS_IN_FIRST_PAGE)

    useEffect(() => {
        firstPage = [...allCountries].splice(0, ITEMS_IN_FIRST_PAGE)
    }, [allCountries])

    let allPages = Math.floor(allCountries.length / ITEMS_PER_PAGE)

    if(firstPage.length) setIsLoading(false)

    if(allCountries[0].error){
        return(
            <div>
                <br />
                <p>{allCountries[0].error.response.data.error}</p>
            </div>
        )
    }
    return(<div>
        <section className="pagination">
            <p>current page: {currentPage} of {allPages}</p>
            <button onClick={prevHandler}>prev</button>
                {/* {currentPage - 3 > 0 ? <div>
                    <button onClick={nextHandlerToTest} value={currentPage - 3}>{currentPage - 3}</button>
                    <button onClick={nextHandlerToTest} value={currentPage - 2}>{currentPage - 2}</button>
                </div>: null}
                {currentPage + 3 <= allPages ? <div className="pagination">
                    <button onClick={nextHandlerToTest} value={currentPage + 2}>{currentPage + 2}</button>
                    <button onClick={nextHandlerToTest} value={currentPage + 3}>{currentPage + 3}</button>
                </div> : null} */}
            <button onClick={nextHandler}>next</button>
        </section>
        <section>
            <section>
                {currentPage === 1 ? <div id="cards">
                    {firstPage.map(country => (
                          <CountryCard
                          key={country.ID}
                          name={country.name}  
                          image={country.image}  
                          continent={country.continent}  
                          ID={country.ID}
                          />
                    ))}
                </div>: <div>
                    
                {items ? <div id="cards">
                    {items.map(country => (
                        <CountryCard
                        key={country.ID}
                        name={country.name}  
                        image={country.image}  
                        continent={country.continent}  
                        ID={country.ID}
                        />
                        ))}
                </div>: <Loader/>}
                        </div>}
            </section>
        </section>
        <section className="pagination">
            <button onClick={prevHandler}>prev</button>
                {/* <button>{currentPage}</button>
                <button onClick={nextHandlerToTest} value={currentPage + 2}>{currentPage + 2}</button>
                <button onClick={nextHandlerToTest} value={currentPage + 3}>{currentPage + 3}</button>
                <button onClick={nextHandlerToTest} value={currentPage + 4}>{currentPage + 4}</button> */}
            <button onClick={nextHandler}>next</button>
        </section>
    </div>
    )
}
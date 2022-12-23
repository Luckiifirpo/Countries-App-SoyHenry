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
            behavior: "auto"
        })

        if(allCountries.length){
            setItems([...allCountries].splice(firstIndex - 1, ITEMS_PER_PAGE))
            setCurrentPage(nextPage)
        }else{
            setItems([])
        }
    }

    function prevHandler(){
        if(currentPage === 0) return;
        
        const prevPage = currentPage - 1;
        
        const lastIndex = prevPage * ITEMS_PER_PAGE;
        
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })

        setItems([...allCountries].splice(lastIndex -  1, ITEMS_PER_PAGE))

        setCurrentPage(prevPage);
    }

    let firstPage = [...allCountries].splice(0, ITEMS_IN_FIRST_PAGE)

    useEffect(() => {
        firstPage = [...allCountries].splice(0, ITEMS_IN_FIRST_PAGE)
    }, [allCountries])

    if(firstPage.length) setIsLoading(false)

    return(<div>
        <section className="pagination">
            <button onClick={prevHandler}>prev</button>
                <button>{currentPage}</button>
            <button onClick={nextHandler}>next</button>
        </section>
        <section>
            <section>
                {currentPage === 0 ? <div id="cards">
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
                <button>{currentPage}</button>
            <button onClick={nextHandler}>next</button>
        </section>
    </div>
    )
}
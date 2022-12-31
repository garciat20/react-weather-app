import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from "../../Api"


const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null)

    // inputvalue is what we're typing into search bar
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                // loadoptions requires an array of objects with value and label properties
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    // retrieve search data from search component
    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="search for city"
            debounceTimeout={600}
            value={search}
            onChange = {handleChange}
            loadOptions = {loadOptions}
        />
    )
}
export default Search
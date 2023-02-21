import { useState, useEffect } from "react";
import axios from "axios";
import Select, { clearValue, clear, InputActionMeta } from "react-select";

export default function Filterprojects ({setProjects}) {

    const [keyword, setKeyword] = useState("");
    const [locationHelper, setLocationHelper] = useState("remote");
    const [location, setLocation] = useState("");
    const [startDateHelper, setStartDateHelper] = useState("open");
    const [start_date, setStartDate] = useState("");
    const [tech_stack, setTechStack] = useState("");
    const [categories, setCategory] = useState([]);
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");


    const handleOnChangeKeyword = (e) => {
        setKeyword(e.target.value);
      };
    
      const handleOnChangeLocationHelper = (e) => {
        setLocationHelper(e.target.value);
        setLocation(e.target.value)
      }
    
      const fetchPlace = async (text) => {
        try {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
          );
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        } catch (err) {
          return { error: "Unable to retrieve places" };
        }
      };
    
      const handleCityChange = async (e) => {
        setLocation(e.target.value);
        if (!location) return;
    
        const res = await fetchPlace(location);
        !autocompleteCities.includes(e.target.value) &&
          res.features &&
          setAutocompleteCities(res.features.map((place) => place.place_name));
        res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
      };
    
      const handleOnChangeStartDate = (e) => {
        setStartDateHelper(e.target.value);
        setStartDate(e.target.value)
        if(start_date.length > 1 && startDateHelper === 'specific date') {
          setStartDate('open')
        } else {}
      };

      const handleOnChangeSpecificDate = (e) => {
        setStartDate(`${e.target.value}T00:42:15.714Z`);
      };
    
      const options = [
        { value: "Games", label: "Games" },
        { value: "Sports", label: "Sports" },
        { value: "Business", label: "Business" },
        { value: "Community", label: "Community" },
        { value: "Social", label: "Social" },
        { value: "Education", label: "Education" },
        { value: "Culture", label: "Culture" },
        { value: "Media", label: "Media" },
        { value: "Nature", label: "Nature" },
      ];
    
      const onSelectedOptionsChange = (options) => {
        setCategory([].slice.call(options).map((option) => option.value));
      };
    
      const customStyles = {
        option: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }),
        menuList: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
          borderRadius: "5px"
    
        }),
        valueContainer: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
        }),
        menu: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          borderRadius: "5px"
    
        }),
        input: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
        }),
        clearIndicator: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }),
        control: (base, state) => ({
          ...base,
          borderRadius: "5px"
        }),
        select: (base, state) => ({
          ...base,
          borderRadius: "5px"
        }),
        indicatorsContainer: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          backgroundColor: "#f8f9fa",
          cursor: "pointer",
        }),
      };
    
      const handleOnChangeTechStack = (e) => {
        setTechStack(e.target.value);
      };

  
    
      const resetAllFilter = () => {
        document.getElementById("searchcriteria").reset();
        setKeyword('')
        setLocationHelper('')
        setStartDate('')
        setLocation('')
        setStartDateHelper('')
        setCategory([])
        
      }

      console.log(categories)
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .get(`http://localhost:8080/projects/search?keyword=${keyword}&location=${location}&start_date=${start_date}&categories=${categories}&tech_stack=${tech_stack}`,{
          keyword,
          categories,
          location,
          start_date,
          tech_stack,
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }


    return(
        <>
        <div className="allprojectsfilter bg-light shadow-sm">
              <div className="bg-light d-sm-flex justify-content-between">
                <h3 className="bg-light fw-bold">FILTER</h3>
                <button className=" btn bg-light clear_filter_btn" onClick={resetAllFilter}>
                  Clear All Filter
                </button>
              </div>

              <div className="bg-light mt-3">
                <form className="filter bg-light ms-4" role="search" id="searchcriteria" onSubmit={handleSubmit}>
                  Keyword
                  <div className="bg-light d-flex m-2 mb-4">
                    <input
                      className="form-control bg-light filtercriteria"
                      type="search"
                      placeholder=" Keyword"
                      aria-label="keyword"
                      onChange={handleOnChangeKeyword}
                    ></input>
                  </div>
                  Location
                  <div className="bg-light m-2 mb-4 ">
                    <select
                      className="form-control bg-light filtercriteria"
                      type="select"
                      placeholder=""
                      aria-label="remote"
                      onChange={handleOnChangeLocationHelper}
                    >
                       <option value="" className="option">
                        All
                      </option>
                      <option value="remote" className="option">
                        Remote
                      </option>
                      <option value="onsite" className="option">
                        Onsite
                      </option>
                    </select>

                    {locationHelper === "onsite"&& (
                      <div className="d-flex bg-light mt-2">
                        {autocompleteErr && (
                          <span className="inputError">{autocompleteErr}</span>
                        )}
                        <input
                          className="form-control bg-light filtercriteria"
                          list="places"
                          type="text"
                          name="city"
                          onChange={handleCityChange}
                          pattern={autocompleteCities.join("|")}
                          autoComplete="off"
                          placeholder="City"
                          aria-label="location"
                          required
                        ></input>
                        <datalist id="places">
                          {autocompleteCities.map((city, i) => (
                            <option key={i}>{city}</option>
                          ))}
                        </datalist>

                      </div>
                    )}
                  </div>
                  Start Date
                  <div className="bg-light m-2 mb-4 ">
                    <select
                      className="form-control bg-light filtercriteria"
                      type="open"
                      aria-label="open"
                      onChange={handleOnChangeStartDate}
                    >
                     <option value="" className="option">
                        All
                      </option>
                      <option value="open" className="option">
                        Open
                      </option>
                      <option value="specific date" className="option">
                        Specific Date
                      </option>
                    </select>
                    {startDateHelper === "specific date" && (
                      <div className="d-flex bg-light mt-2">
                        <input
                          className="form-control bg-light filtercriteria"
                          type="date"
                          placeholder="Start Date"
                          aria-label="start_date"
                          onChange={handleOnChangeSpecificDate}
                          required
                        ></input>
                      </div>
                    )}
                  </div>
                  Category
                    <Select
                      options={options}
                      isMulti
                      name="categories"
                      className="basic-multi-select m-2 mb-4"
                      classNamePrefix="filter_select"
                      onChange={onSelectedOptionsChange}
                      styles={customStyles}
                      isClearable
                      isSearchable
                      clearValue

                    />
                 
                  Tech Stack
                  <div className="bg-light d-flex m-2 mb-4">
                    <input
                      className="form-control bg-light filtercriteria"
                      type="search"
                      placeholder="Technical Skills..."
                      aria-label="tech_stack"
                      onChange={handleOnChangeTechStack}
                    ></input>
                  </div>
                  <div className="bg-light d-flex ms-2 my-4">
                    <button className="btn submitbutton" type="submit">
                      SEARCH
                    </button>
                  </div>
                </form>
              </div>
            </div>
        
        </>
    )
}
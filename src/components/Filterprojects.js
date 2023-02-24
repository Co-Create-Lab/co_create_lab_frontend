import {tech_stack_options, categoriesOptions, fetchPlace, customStylesFilter} from '../const'
import { useState, useEffect } from "react";
import axios from "axios";
import Select, { clearValue, clear, InputActionMeta } from "react-select";
import { useNavigate } from 'react-router-dom';

export default function Filterprojects({ setProjects, setSearchResult,homeCategoryDefault }) {
  const [keyword, setKeyword] = useState("");
  const [locationHelper, setLocationHelper] = useState("remote");
  const [location, setLocation] = useState("");
  const [startDateHelper, setStartDateHelper] = useState("open");
  const [start_date, setStartDate] = useState("");
  const [tech_stack, setTechStack] = useState("");
  const [categories, setCategory] = useState([]);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");
  const [sortCriteriaCreatedAt, setSortCriteriaCreatedAt] = useState("");
  const [sortCriteriaStartDate, setSortCriteriaStartDate] = useState("");

  const navigate = useNavigate();

  // SORTING

  const handleOnChangeSortCriteria = (e) => {
    if (e.target.value === "createdAt: 1") {
      setSortCriteriaCreatedAt(1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "createdAt: -1") {
      setSortCriteriaCreatedAt(-1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "start_date: 1") {
      setSortCriteriaStartDate(1);
      setSortCriteriaCreatedAt("");
    }
    if (e.target.value === "start_date: -1") {
      setSortCriteriaStartDate(-1);
      setSortCriteriaCreatedAt("");
    }
    axios
    .get(
      `http://localhost:8080/projects/sort?start_date=${sortCriteriaStartDate}&createdAt=${sortCriteriaCreatedAt}`
    )
    .then((response) => {
      setProjects(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const reset = () => {
    navigate('/projects')
    window.location.reload();
  };

  // FILTERING

  const handleOnChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleOnChangeLocationHelper = (e) => {
    setLocationHelper(e.target.value);
    setLocation(e.target.value);
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
    setStartDate(e.target.value);
    if (start_date.length > 1 && startDateHelper === "specific date") {
      setStartDate("open");
    } else {
    }
  };

  const handleOnChangeSpecificDate = (e) => {
    setStartDate(`${e.target.value}T00:42:15.714Z`);
  };

  const onSelectedOptionsChange = (options) => {
    setCategory([].slice.call(options).map((option) => option.value));
  };

  const handleOnChangeTechStack = (tech_stack_options) => {
    setTechStack(
      [].slice
        .call(tech_stack_options)
        .map((tech_stack_option) => tech_stack_option.value)
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:8080/projects/search?keyword=${keyword}&location=${location}&start_date=${start_date}&categories=${categories}&tech_stack=${tech_stack}`,
        {
          keyword,
          categories,
          location,
          start_date,
          tech_stack,
        }
      )
      .then((response) => {
        setProjects(response.data);
        setSearchResult(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSortFiltered = (e) => {
    if (e.target.value === "createdAt: 1") {
      setSortCriteriaCreatedAt(1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "createdAt: -1") {
      setSortCriteriaCreatedAt(-1);
      setSortCriteriaStartDate("");
    }
    if (e.target.value === "start_date: 1") {
      setSortCriteriaStartDate(1);
      setSortCriteriaCreatedAt("");
    }
    if (e.target.value === "start_date: -1") {
      setSortCriteriaStartDate(-1);
      setSortCriteriaCreatedAt("");
    }    axios
      .get(
        `http://localhost:8080/projects/search/sort?keyword=${keyword}&location=${location}&start_dateF=${start_date}&categories=${categories}&tech_stack=${tech_stack}&start_date=${sortCriteriaStartDate}&createdAt=${sortCriteriaCreatedAt}`,
        {
          keyword,
          categories,
          location,
          start_date,
          tech_stack,
          sortCriteriaCreatedAt,
          sortCriteriaStartDate,
        }
      )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>

      <div className="allprojectsfilter">
        <div className="sort bg-light shadow-sm">
          <div className="bg-light d-sm-flex justify-content-between">
            <h5 className="bg-light fw-bold">SORT</h5>
            <button
              className="btn bg-light clear_filter_btn"
              onClick={reset}
            >
              Clear
            </button>
          </div>
          <form
            className="sortform bg-light"
            id="sortform"
          >
            
            <div className="bg-light d-flex m-2 mb-3 column-gap-3">
              <select
                className="form-control bg-light sortcriteria"
                type="select"
                aria-label="sort"
                onChange={handleOnChangeSortCriteria}
              >
              
                <option value="createdAt: 1" className="option">
                  creation date {String.fromCharCode(8595)}
                </option>
                <option value="createdAt: -1" className="option">
                  creation date {String.fromCharCode(8593)}
                </option>
                <option value="start_date: 1" className="option">
                  start date {String.fromCharCode(8595)}
                </option>
                <option value="start_date: -1" className="option">
                start date {String.fromCharCode(8593)}
                </option>
              </select>
            </div>
          </form>
        </div>

        <div className="filter bg-light shadow-sm">
          <div className="bg-light d-sm-flex justify-content-between">
            <h5 className="bg-light fw-bold">FILTER</h5>
            <button
              className=" btn bg-light clear_filter_btn"
              onClick={reset}
            >
              Clear
            </button>
          </div>
          <div className="bg-light mt-3">
            <form
              className="filterform bg-light"
              role="search"
              id="searchcriteria"
              onSubmit={handleSubmit}
            >
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

                {locationHelper === "onsite" && (
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
                options={categoriesOptions}
                isMulti
                name="categories"
                className="basic-multi-select m-2 mb-4"
                classNamePrefix="filter_select"
                onChange={onSelectedOptionsChange}
                styles={customStylesFilter}
                isClearable
                isSearchable
                clearValue
                defaultValue={[homeCategoryDefault]}

              />
              Tech Stack
              <Select
                options={tech_stack_options}
                isMulti
                name="tech_stack"
                className="basic-multi-select m-2 mb-4"
                classNamePrefix="filter_select"
                onChange={handleOnChangeTechStack}
                styles={customStylesFilter}
                isClearable
                isSearchable
                clearValue
              />
              <div className="bg-light d-flex justify-content-between filtercriteria pe-3 ms-2 ">
                <button className="btn submitbutton" type="submit">
                  Filter
                </button>
              </div>
              <div className="bg-light d-flex m-2 mb-4 mt-4 column-gap-3">
                <select
                  className="form-control bg-light filtercriteria"
                  type="select"
                  aria-label="sort"
                  onChange={handleSortFiltered}
                >
                
                  <option value="createdAt: 1" className="option">
                    creation date {String.fromCharCode(8595)}
                  </option>
                  <option value="createdAt: -1" className="option">
                    creation date {String.fromCharCode(8593)}
                  </option>
                  <option value="start_date: 1" className="option">
                  start date {String.fromCharCode(8595)}
                  </option>
                  <option value="start_date: -1" className="option">
                  start date {String.fromCharCode(8593)}
                  </option>
                </select>
           
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

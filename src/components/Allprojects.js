import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { Link } from "react-router-dom";
import Select, { clearValue, clear, InputActionMeta } from "react-select";

export default function Allprojects() {
  const [projects, setProjects] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [locationHelper, setLocationHelper] = useState("remote");
  const [location, setLocation] = useState("remote");
  const [startDateHelper, setStartDateHelper] = useState("open");
  const [start_date, setStartDate] = useState("open");
  const [tech_stack, setTechStack] = useState("");
  const [categories, setCategory] = useState([]);
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleOnChangeKeyword = (e) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleOnChangeLocationHelper = (e) => {
    setLocationHelper(e.target.value);
    if (location.length > 1 && locationHelper === "onsite") {
      setLocation("remote");
    } else {
      setLocation("");
    }
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
    console.log(e.target.value);
    setTechStack(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    if (start_date.length > 1 && startDateHelper === "specific date") {
      setStartDate("open");
    } else {
      setStartDate("");
    }
  };

  const handleOnChangeSpecificDate = (e) => {
    setStartDate(`${e.target.value}T00:42:15.714Z`);
  };

  const resetAllFilter = () => {
    document.getElementById("searchcriteria").reset();
    setLocationHelper('remote')
    setStartDateHelper('open')
  }


  return (
    <>
      <div className="allprojects container-fluid ">
        <div className="row ">
          <div className="col-4 pe-lg-5 ms-4">
            <div className="allprojectsfilter bg-light shadow-sm">
              <div className="bg-light d-sm-flex justify-content-between">
                <h3 className="bg-light fw-bold">FILTER</h3>
                <button className=" btn bg-light clear_filter_btn" onClick={resetAllFilter}>
                  Clear All Filter
                </button>
              </div>

              <div className="bg-light mt-3">
                <form className="filter bg-light ms-4" role="search" id="searchcriteria">
                  Keyword
                  <div className="bg-light d-flex m-2 mb-4">
                    <input
                      className="form-control bg-light filtercriteria"
                      type="search"
                      placeholder=" Keyword"
                      aria-label="keyword"
                      onChange={handleOnChangeKeyword}
                    ></input>
                    {/* <button className="btn bg-light" type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        className="bi bi-search bg-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button> */}
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
                          value={location}
                          required
                          pattern={autocompleteCities.join("|")}
                          autoComplete="off"
                          placeholder="City"
                          aria-label="location"
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
                        ></input>
                        {/* <button className="btn bg-light" type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          className="bi bi-search bg-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </button> */}
                      </div>
                    )}
                  </div>
                  Category
                    <Select
                      options={options}
                      isMulti
                      name="categories"
                      id="categories"
                      className="basic-multi-select m-2 mb-4"
                      classNamePrefix="select"
                      onChange={onSelectedOptionsChange}
                      styles={customStyles}
                      isClearable
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
                    {/* <button className="btn bg-light" type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        className="bi bi-search bg-light"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button> */}
                  </div>
                  <div className="bg-light d-flex ms-2 my-4">
                    <button className="btn submitbutton" type="submit">
                      SEARCH
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-7">
            {projects?.map((project) => {
              return (
                <div
                  key={project._id}
                  className="bg-light projectoverview shadow-sm"
                >
                  <h3 className="bg-light">{project.project_name}</h3>

                  <div className="container">
                    <div className="row">
                      <div className="bg-light col-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-pencil-square projectoverviewicon bg-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        {dateFormat(project.createdAt, "d. mmmm yyyy")}
                      </div>
                      <div className="col-sm bg-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-geo-alt-fill projectoverviewicon bg-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                        {project.location}
                      </div>
                      {project.start_date.toLowerCase() === "open" && (
                        <div className="col-sm bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-calendar2-plus projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                          </svg>
                          open
                        </div>
                      )}
                      {project.start_date.toLowerCase() !== "open" || '' && (
                        <div className="col-sm bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-calendar2-plus projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                          </svg>
                          {dateFormat(project.start_date, "dd. mmmm yyyy")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="container">
                    <div className="row projectdetails_row bg-light">
                      <div className="col-sm bg-light"></div>
                      <div className="col-sm bg-light">
                        <div className="allprojects_categories bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-tags-fill projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                          </svg>
                          {project.categories?.map((category, i) => {
                            return (
                              <div key={i} className="bg-light">
                                {category}{" "}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-sm bg-light">
                        <Link to={`/projects/${project._id}`}>
                          <button className="btn detailsbutton bg-light">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="bi bi-zoom-in projectoverviewicon bg-light"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                              />
                              <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                              <path
                                fillRule="evenodd"
                                d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                              />
                            </svg>
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Projects|CoCreateLab</title>
        <link rel="canonical" href="/projects" />
      </Helmet>
    </>
  );
}

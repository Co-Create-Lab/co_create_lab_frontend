import { Helmet } from "react-helmet";
import axiosClient from "../axiosClient";

export default function Footer() {
  {
    /* TEST VERIFY TOKEN */
  }
  const getPro = () => {
    axiosClient
      .get("/projects")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="home">
        HOME
        <h1>Hi</h1>
        <div> This is a div</div>
        {/* TEST VERIFY TOKEN */}
        <button onClick={getPro}>GET PROJECTS</button>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CoCreateLab - HOME</title>
        <link rel="canonical" href="/" />
      </Helmet>
    </>
  );
}

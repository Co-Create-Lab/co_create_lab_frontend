import { Helmet } from "react-helmet";
import { IoMdMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
export default function Usercontact() {
  // AVATAR
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: 50,
        width: 50,
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <>
      <div className="container col-md-5 col-sm-12 mt-5 text-center">
        <h5 className="blueText">CONTACT INFORMATION</h5>
      </div>
      <div className="container col-md-5 col-sm-12 my-3">
        <div className="card mb-3" style={{ maxwidth: 40 }}>
          <div className="row g-0 rounded-3 bg-light">
            <div className="col-2 d-flex justify-content-center mt-3 bg-light ">
              <Stack direction="row" className=" bg-light">
                <Avatar alt="Svjetlana" {...stringAvatar("Svjetlana")} />
              </Stack>
            </div>
            <div className="col-9">
              <div className="card-body bg-light">
                <h5 className="card-title text-start bg-light">
                  {" "}
                  <span className=" bg-light">
                    {" "}
                    <FaUserCircle size={15} className="me-1 bg-light" />
                  </span>{" "}
                  Card title
                </h5>
                <h5 className="card-text text-start bg-light mb-1">
                  {" "}
                  <span className="bg-light">
                    <IoMdMail size={15} className="me-1 bg-light" />
                  </span>{" "}
                  foo@bar.com
                </h5>
                {/* <p className="card-text text-start bg-light">
                  <small className="text-muted bg-light">hi</small>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact a creator|CoCreateLab</title>
        <link rel="canonical" href="/user/contact" />
      </Helmet>
    </>
  );
}

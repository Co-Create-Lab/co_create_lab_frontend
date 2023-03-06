import { Map, Marker, ZoomControl, payload, Overlay } from "pigeon-maps";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { alikePics } from "../const";
import axiosClient from "../axiosClient";


export default function Mymap() {

  const { projects, setViews } = useContext(AuthContext);
  const [overlay, setOverlay] = useState([]);
  const [overlayInput, setOverlayInput] = useState([]);

  const [mapSize, setMapSize] = useState(600)
  const [style, setStyle] = useState('home-map')
  useEffect(() => {
    if (window.location.pathname !== "/projects/onsite") {
        setMapSize(300)
      }
      if (window.location.pathname === "/projects/onsite") {
        setStyle('map')
      }
  })

  console.log(style)
 

  const showMarkerPayload = (e) => {
    setOverlay(e.payload.coordinates);
    setOverlayInput(e.payload);
  };



  return (
    <>
      <div className="w-100">
        <div className={style}>
          <Map
            height={mapSize}
            defaultZoom={6}
            defaultCenter={[52.520008, 13.404954]}
          >
            <ZoomControl />

            {overlayInput.coordinates &&
            <Overlay anchor={overlay} offset={[-10, 0]} className="z-3 position-absolute">
              <Link
                to={`/projects/${overlayInput._id}`}
                className="text-decoration-none"
                 onClick={() => {
                   try {
                     axiosClient
                       .post(`/projects/view`, {
                         id: overlayInput._id,
                       })
                       .then((res) => {
                         setViews(res.data);
                       });
                   } catch (error) {
                     console.error(error);
                   }
                 }}
              >
                <Card className="shadow-lg dark-blue-background map-card">
                  <Card.Body className="dark-blue-background rounded">
                    <Card.Title className="dark-blue-text dark-blue-background fs-6 light-gray-text">
                      {overlayInput.project_name}
                    </Card.Title>
                    <div className="dark-blue-background">
                      <Card.Img className="map-cardimg" src={alikePics[0]} />
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Overlay>
            }

            {projects?.map((project) => {
              return (
                <Marker
                  key={project._id}
                  width={50}
                  anchor={project.coordinates}
                  payload={project}
                  onClick={showMarkerPayload}
                />
              );
            })} 
            
          </Map>
        </div>
      </div>
    </>
  );
}

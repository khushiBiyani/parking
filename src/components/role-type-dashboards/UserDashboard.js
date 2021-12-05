import React, { useState } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { PermIdentity, Storefront, DirectionsCar } from "@material-ui/icons";
// import userEvent from "@testing-library/user-event";
 
export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [size, setSize] = useState([]);
  const [userSelectedLocation, setUserLocation] = useState([]);
  const [textInput, setTextInput] = useState([]);
  const { currentUser } = useAuth();
  // const userlocation='airport';
  async function getParkingSpots(userLocation, size) {
    const parkingSpotsCollection = firebase.firestore().collection("parking-spots");
    setLoading(true);
    // async function getSize() {
    //   const sizeCollection = firebase.firestore().collection("size");
    //   setLoading(true);
    // }
    parkingSpotsCollection.get().then((querySnapshot) => {
      // sizeCollection.get().then((querySnapshot) => {
        const items = [];
      querySnapshot.forEach((doc) => {
        const ps = doc.data();
        //const id = doc.id;
          if (ps.location===userLocation &&  ps.size === size) 
            items.push(doc.data());
      });
      // if (ps.location === userLocation) {
      //   items.push({ id, ...ps });
      // }
      setParkingSpots(items);
    setLoading(false);
    });
    
  }
 
  // // If using local sprint boot server.
  // setLoading(true)
  // await fetch('http://localhost:8080/parking-spot/?date=2021-11-23')
  // .then(res => res.json())
  // .then((data) => {
  //     console.log(data);
  //     setParkingSpots(data)
  // })
  // .catch(console.log)
  // setLoading(false);
 
  // console.log("parking spots :" + parkingSpots);
  //http://localhost:8080/availableSpots?from=8&to=9;
  function handlerUserLocation() {
    console.log(textInput);
    const userLocation = textInput;
    setUserLocation(userLocation);
    getParkingSpots(userLocation, size);
  }
 
  function handleReserveSlot(id) {
    console.log("handleReserveSlot" + id);
    console.log(currentUser.email);
    firebase.firestore().collection("parking-spots").doc(id).update({
      available: false,
      reservedBy: currentUser.email,
    });
  }
  const handleChange = (event) => {
    setTextInput(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  }
 
  // function handleReserveSlot() {
  //   alert("handleReserveSlot");
  // }
 
  // useEffect(() => {
  //   getParkingSpots();
  //   // eslint-disable-next-line
  // }, []);
 
  return (
    <>
      {loading ? <h1>Loading...</h1> : null}
      {!loading && (
        <div class="container" style={{ display: "flex", marginTop: "10px" }}>
          <div className="sidebar">
            <div className="sidebarWrapper">
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                  <Link to="/" className="link">
                    <li className="sidebarListItem active">
                      <PermIdentity className="sidebarIcon" />
                      Available
                    </li>
                  </Link>
                  <Link to="/history" className="link">
                    <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      History
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div class="home">
            <div style={{ height: "60px" }}>
              <input
                onChange={handleChange}
                style={{ height: "40px" }}
                placeholder="Enter Location"
              />
              <input
                // onChange={handleChange}
                style={{ height: "40px" }}
                placeholder="Enter Checkin Time"
              />
              <input
                // onChange={handleChange}
                style={{ height: "40px" }}
                placeholder="Enter Checkout Time"
              />
              <input
                onChange={handleSizeChange}
                style={{ height: "40px" }}
                placeholder="Enter Size of the Vehicle"
              />
              <button
                class="btn btn-primary"
                style={{ display: "inline-block", marginLeft: "20px" }}
                onClick={handlerUserLocation}
              >
                Retrieve Parking Spots
              </button>
            </div>
            {userSelectedLocation.length > 0 && (
              <div>
                <div class="featured">
                  <div class="featuredItem">
                    <span class="featuredTitle">
                      Available parking spots in this area:{" "}
                      <b>{userSelectedLocation}</b>
                    </span>
                    <div class="featuredMoneyContainer">
                      <span class="featuredMoney">
                        {parkingSpots && parkingSpots.length > 0
                          ? parkingSpots.length
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="homeWidgets"
                  style={{ display: "flex", margin: "20px" }}
                >
                  <div class="widgetSm">
                    <span class="widgetSmTitle">Parking Spots</span>
                    <ul class="widgetSmList">
                      {parkingSpots.map((parkingSpot) => (
                        <li class="widgetSmListItem" key={parkingSpot.id}>
                          <DirectionsCar
                            style={{ width: "80px", height: "80px" }}
                          />
                          <div class="widgetSmUser">
                            <span class="">{parkingSpot.id}</span>
                            <span class="widgetSmUserTitle">
                              Spot Size: {parkingSpot.size}
                            </span>
                          </div>
                          {parkingSpot.available && (
                            <button
                              class="btn btn-primary"
                              onClick={() => handleReserveSlot(parkingSpot.id)}
                            >
                              <svg
                                class="MuiSvgIcon-root widgetSmIcon"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                              </svg>
                              Reserve
                            </button>
                          )}
                          {!parkingSpot.available && (
                            <button
                              class="btn btn-secondary"
                              onClick={() => alert("Aleready reserved!")}
                            >
                              <svg
                                class="MuiSvgIcon-root widgetSmIcon"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                              </svg>
                              Reserve
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );                          
}
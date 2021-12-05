import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import {
    PermIdentity,
    Storefront,
    DirectionsCar
  } from "@material-ui/icons";

export default function UserHistoryboard() {
  
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth()
  const [parkingSpots, setParkingSpots] = useState([]);

  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch {
      console.log("Failed to log out")
    }
  }

  async function getParkingSpotsByUser(userLocation) {
      const parkingSpotsCollection = firebase.firestore().collection('parking-spots')
      setLoading(true);
      parkingSpotsCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            const ps = doc.data();
            const id = doc.id;
            if(ps.reservedBy === currentUser.email)
            {
                items.push({id, ...ps});
            }
        });
        setParkingSpots(items);
        setLoading(false);
      });

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
  }

  //console.log("parking spots :" +parkingSpots)
  //http://localhost:8080/availableSpots?from=8&to=9


  useEffect(() => {
    getParkingSpotsByUser();
    // eslint-disable-next-line
  }, []);

    return (
        <>
            {loading ? <h1>Loading...</h1> : null}
            {!loading && 
                <main role="main" style={{ minWidth :"100%", height:"100vh" }}>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                Hello, {currentUser.email}
                            </li>
                        </ul>
                        <div>
                            <a class="btn btn-secondary" href="/update-profile" role="button">Update Profile »</a>
                        </div>
                        <div>
                            <Button variant="link" onClick={handleLogout}>
                            Log Out
                            </Button>
                        </div>
                    </div>
                    </nav>
                    <div class="container" style={{ display: "flex","marginTop": "10px"}}>
                                        <div className="sidebar">
                                            <div className="sidebarWrapper">
                                            <div className="sidebarMenu">
                                                <h3 className="sidebarTitle">Dashboard</h3>
                                                <ul className="sidebarList">
                                                <Link to="/" className="link">
                                                    <li className="sidebarListItem">
                                                    <PermIdentity className="sidebarIcon" />
                                                    Available 
                                                    </li>
                                                </Link>
                                                <Link to="/history" className="link">
                                                    <li className="sidebarListItem active">
                                                    <Storefront className="sidebarIcon" />
                                                    History
                                                    </li>
                                                </Link>
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                            <div class="home">
                                                <div>
                                                    <div class="featured">
                                                    <div class="featuredItem">
                                                        <span class="featuredTitle">Your total bookings:</span>
                                                        <div class="featuredMoneyContainer">
                                                        <span class="featuredMoney">{ parkingSpots && parkingSpots.length > 0 ? parkingSpots.length : 0 }</span>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
                                                    <div class="widgetSm">
                                                        <span class="widgetSmTitle">Parking Spots</span>
                                                        <ul class="widgetSmList">
                                                        {
                                                            parkingSpots.map((parkingSpot) => (
                                                                <li class="widgetSmListItem" key={parkingSpot.id}>
                                                                    
                                                                    <DirectionsCar style={{"width":"80px", "height": "80px"}}/>
                                                                    <div class="widgetSmUser">
                                                                        <span class="">{parkingSpot.slot}</span>
                                                                        <span class="widgetSmUserTitle">Spot Size: {parkingSpot.size}</span>
                                                                        <span class="widgetSmUserTitle">Location : {parkingSpot.location}</span>
                                                                    </div>
                                                                    <button class="widgetSmButton" onClick={() => console.log("Dummy button") }><svg class="MuiSvgIcon-root widgetSmIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" ><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>Reserve</button>
                                                                </li>
                                                            ))
                                                        }
                                                        </ul>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                    </div>
                </main>
            }
            
        </>
    )
}

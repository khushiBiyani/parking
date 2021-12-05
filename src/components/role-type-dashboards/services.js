import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { PermIdentity, DirectionsCar } from "@material-ui/icons";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom"

import { Button } from "react-bootstrap"

export default function Services() {
    const history = useHistory()
    let data = useLocation();
    const checkinTime = data?.state?.checkinTime;
    const checkoutTime = data?.state?.checkoutTime;

    const totalTime = (checkinTime && checkoutTime && (checkoutTime - checkinTime) > 0 )? (checkoutTime - checkinTime)  : 1;
    const [loading, setLoading] = useState(false);
    const [worker, setWorker] = useState([]);
    const [selectedParkingSpot] = useState([]);
    
    const [psPrice, setPsPrice] = useState(25);
    const [workerPrice, setWorkerPrice] = useState(100);
    const [totalPrice, setTotalPrice] = useState(100);

    const [selectedWorker, setSelectedWorker] = useState([]);
    const [paymentConfirmation, setPaymentConfirmation] = useState(false);
    const workerCollection = firebase.firestore().collection("workers");
    const { currentUser, logout } = useAuth()
    async function handleLogout() {
      try {
        await logout()
        history.push("/login")
      } catch {
        console.log("Failed to log out")
      }
    }

    function handleReserveSlot(id, workPrice) {
        console.log("handleReserveSlot" + id);
        console.log("selectedParkingSpot" + selectedParkingSpot);

        const parkingSpotPrice = 25;
        const workerPrice = workPrice;
        if(workerPrice)
        {
          setWorkerPrice(workerPrice)
        }
        if(parkingSpotPrice){
          setPsPrice(parkingSpotPrice)
        }
        setTotalPrice(parkingSpotPrice* (totalTime ? totalTime : 1) + workerPrice);

        console.log(currentUser.email);
        //const price  = 100 + 25 * totalTime;
        setSelectedWorker(id);

        //if(window.confirm(`The price is ${price}. Do you want to continue.`))
        { 
          // Confirm parking spot is reserved
          if(data?.state?.id){
            firebase.firestore().collection("parking-spots").doc(data.state.id).update({
              available: false,
              reservedBy: currentUser.email,
            });
          }
          // Confirm Worker is reserved
          if(id){
            firebase.firestore().collection("workers").doc(id).update({
              available: false,
              reservedBy: currentUser.email,
            });
          }
          alert("Thank you, you order is processed!");
          setPaymentConfirmation(true);
        }
        
        //history.push("/history")
      }
    async function getWorkers(worker) {
      setLoading(true);
      workerCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          items.push({id, ...doc.data()});
        });
        setWorker(items);
      })
       setLoading(false);
    }
    
  useEffect(() => {
    getWorkers();
    // eslint-disable-next-line
  }, []);

      return (
          <>
            {loading ? <h1>Loading...</h1> : null}

            {!loading && (
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

                    {paymentConfirmation && (
                      <div class="container" style={{ "marginTop": "10px"}}>
                          <div class="home">
                              <div class="homeWidgets" style={{  margin: "20px"}}>
                              <div class="widgetLg">
                              <h3 class="widgetLgTitle">Payment confirmation</h3>
                              <h4 class="widgetLgTitle">The below amount has been debited from your wallet!</h4>
                              <table class="widgetLgTable">
                                <thead>
                                    <tr class="widgetLgTr">
                                        <th class="widgetLgTh">Details</th>
                                        <td class="widgetLgDate">Amount(INR)</td>
                                    </tr> 
                                </thead>
                                <hr></hr>
                                <tbody>
                                  <tr class="widgetLgTr">
                                      <th class="widgetLgTh">Parking spot price * No of hours </th>
                                      <td class="widgetLgDate">{psPrice} * {totalTime }</td>
                                  </tr> 
                                  <tr class="widgetLgTr">
                                      <th class="widgetLgTh">Worker price</th>
                                      <td class="widgetLgDate">{workerPrice} </td>
                                  </tr> 
                                  <hr></hr>
                                  <tr class="widgetLgTr">
                                      <th class="widgetLgTh">Total </th>
                                      <td class="widgetLgDate">{totalPrice}</td>
                                  </tr> 
                                </tbody>
                              </table>
                              </div>
                              </div>
                          </div>
                          <Link to="/ratings" className="link">
                              <PermIdentity className="sidebarIcon" />
                              Ratings
                          </Link>
                      </div>
                    )}
                    
                    {!paymentConfirmation && (
                      <div class="container" style={{ display: "flex", marginTop: "10px" }}>
                        <div className="sidebar" style={{ maxWidth:"180px" }}>
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
                              </ul>
                            </div>
                          </div>
                        </div>

                          {/* {userSelectedLocation.length > 0 && ( */}
                            <div>
                              <div class="featured">
                                <div class="featuredItem">
                                  <span class="featuredTitle">
                                    Available Services: Wash/Dry Clean
                                    {/* <b>{userSelectedLocation}</b> */}
                                  </span>
                                  {/* <div class="featuredMoneyContainer">
                                    <span class="featuredMoney">
                                      {parkingSpots && parkingSpots.length > 0
                                        ? parkingSpots.length
                                        : 0}
                                    </span>
                                  </div> */}
                                </div>
                              </div>
                              <div
                                class="homeWidgets"
                                style={{ display: "flex", margin: "20px" }}
                              >
                                <div class="widgetSm">
                                  <span class="widgetSmTitle">Services</span>
                                  <ul class="widgetSmList">
                                    {worker.map((worker) => (
                                      <li class="widgetSmListItem" key={worker.id}>
                                        <DirectionsCar
                                          style={{ width: "80px", height: "80px" }}
                                        />
                                        <div class="widgetSmUser">
                                          <span class="">{worker.id}</span>
                                          <span class="widgetSmUserTitle">
                                            Service Size: {worker.job}
                                          </span>
                                        </div>
                                        
                                        {worker.available && (
                                          <button
                                            class="btn btn-primary"
                                            onClick={() => handleReserveSlot(worker.id, worker.hourlyRate ? worker.hourlyRate: 100 )}
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
                                        
                                        {!worker.available && (
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
                        </div>
                    )}
                  </main>


            )}


          </>
      );         
}                       
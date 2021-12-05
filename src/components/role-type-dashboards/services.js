import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { PermIdentity, DirectionsCar } from "@material-ui/icons";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom"
import rating from './rating'
import { Button } from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center"
  },
  iconFilled: {},
  iconFilled1: { color: "red" },
  iconFilled2: { color: "orange" },
  iconFilled3: { color: "yellow" },
  iconFilled4: { color: "blue" },
  iconFilled5: { color: "green" },
  iconHover: {},
  iconHover1: { color: "red" },
  iconHover2: { color: "orange" },
  iconHover3: { color: "yellow" },
  iconHover4: { color: "blue" },
  iconHover5: { color: "green" }
});


export default function Services() {
    const history = useHistory()
    let data = useLocation();
    const checkinTime = data?.state?.checkinTime;
    const checkoutTime = data?.state?.checkoutTime;


    const classes = useStyles();
    const [value, setValue] = useState(2);
    const [iconFilledVar, setIconFilled] = useState(classes.iconFilled);
    const [iconHoverVar, setIconHover] = useState(classes.iconHover);

    
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
                          {/* <Link to="/ratings" className="link">
                              <PermIdentity className="sidebarIcon" />
                              Ratings
                          </Link> */}

                          <div>
                            Please rate your experience:
                            <div className={classes.root}>
                              <Rating
                                name="hover-feedback"
                                value={value}
                                precision={1}
                                onChange={(event, newValue) => {
                                  console.log(event, "This is th e event");
                                  setValue(newValue);
                                  switch (true) {
                                    case newValue <= 1: {
                                      setIconFilled(classes.iconFilled1);
                                      break;
                                    }
                                    case newValue <= 2 && newValue > 1: {
                                      setIconFilled(classes.iconFilled2);
                                      break;
                                    }
                                    case newValue <= 3 && newValue > 2: {
                                      setIconFilled(classes.iconFilled3);
                                      break;
                                    }
                                    case newValue <= 4 && newValue > 3: {
                                      setIconFilled(classes.iconFilled4);
                                      break;
                                    }
                                    case newValue > 4: {
                                      setIconFilled(classes.iconFilled5);
                                      break;
                                    }
                                  }
                                }}
                                onChangeActive={(event, newHover) => {
                                  switch (true) {
                                    case newHover <= 1: {
                                      setIconHover(classes.iconHover1);
                                      break;
                                    }
                                    case newHover <= 2 && newHover > 1: {
                                      setIconHover(classes.iconHover2);
                                      break;
                                    }
                                    case newHover <= 3 && newHover > 2: {
                                      setIconHover(classes.iconHover3);
                                      break;
                                    }
                                    case newHover <= 4 && newHover > 3: {
                                      setIconHover(classes.iconHover4);
                                      break;
                                    }
                                    case newHover > 4: {
                                      setIconHover(classes.iconHover5);
                                      break;
                                    }
                                  }
                                }}
                                defaultValue={2}
                                icon={<FiberManualRecordIcon fontSize="inherit" />}
                                classes={{
                                  iconFilled: iconFilledVar,
                                  iconHover: iconHoverVar
                                }}
                              />
                            </div>
                          </div>
                          <Link to="/" className="link">
                              <PermIdentity className="sidebarIcon" />
                              Go Home
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
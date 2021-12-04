import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
 
 
export default function WorkerDashboard() {
  const [loading, setLoading] = useState(false);
  const [workerServices, setWorkerServices] = useState([]);
 
  async function getWorkerServices() {
      const servicesCollection = firebase.firestore().collection('services')
      setLoading(true);
      servicesCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            //const ps = doc.data();
            //if(ps.available)
            items.push(doc.data());
        });
        setWorkerServices(items);
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
 
  console.log("worker services :" +workerServices)
  //http://localhost:8080/availableSpots?from=8&to=9
 
  
  /* function handleReserveSlot() {
    alert("handleReserveSlot" );
  }
 */
  useEffect(() => {
    getWorkerServices();
    // eslint-disable-next-line
  }, []); 
  
  return (
    <>
        {loading ? <h1>Loading...</h1> : null}
        {!loading && 
            <div class="home">
                    
                    <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
                    <div class="widgetSm">
                        <span class="widgetSmTitle">Services to provide</span>
                        <ul class="widgetSmList">
                        {workerServices.map((workerServices) => (
                        <li class="widgetSmListItem">
                        <img src="https://i.pinimg.com/originals/95/69/69/956969895c373bd435ccaf2c2e1de4f2.jpg" alt="" class="widgetSmImg"/>
                        <div class="widgetSmUser">
                            <span class="widgetSmUserTitle">{workerServices.id}</span>
                            <span class="widgetSmUserTitle">{workerServices.service}</span>
                            <span class="widgetSmUserTitle">{workerServices.time}</span>
                            <span class="widgetSmUserTitle">{workerServices.user}</span>
                            <span class="widgetSmUserTitle">{workerServices.payment}</span>
                        </div>
                        {/* <button class="widgetSmButton" onClick={handleReserveSlot}><svg class="MuiSvgIcon-root widgetSmIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" ><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>Reserve</button> */}
                        </li>
                        ))}
                        </ul>
                    </div>
                    </div>
            </div>    
                
        }
    </>
)
 
}
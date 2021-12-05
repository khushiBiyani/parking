import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import { Person } from "@material-ui/icons";
 
 
 export default function WorkerDashboard() {
  const [error] = useState("")
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  function getAllUsers(){
      const usersCollection = firebase.firestore().collection('services')
      setLoading(true);
      usersCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          /* const user = doc.data();
            if(user.roleId === 3) */
                items.push(doc.data());
        });
        setUserList(items);
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
 
  /* console.log("worker services :" +workerServices) */
  //http://localhost:8080/availableSpots?from=8&to=9
 
  
  /* function handleReserveSlot() {
    alert("handleReserveSlot" );
  }
 */
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []); 
  
  return (
    <>
        {loading ? <h1>Loading...</h1> : null}
        {!loading && 
          <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
              <div class="widgetLg">
                <h3 class="widgetLgTitle">List of services to provide</h3>
                <table class="widgetLgTable">
                    <tr class="widgetLgTr">
                      <th class="widgetLgTh">Id</th>
                      <th class="widgetLgTh">Service</th>
                      <th class="widgetLgTh">User</th>
                      <th class="widgetLgTh">Time</th>
                      <th class="widgetLgTh">Payment</th>
                      {/* <th class="widgetLgTh">Status</th> */}
                    </tr> 
                {userList.map((services) => (
                    <tr class="widgetLgTr">
                      <td class="widgetLgUser">
                          <Person
                            style={{ width: "80px", height: "80px" }}
                          />
                        <span class="widgetLgName">{services.id}</span>
                      </td>
                      {/* <td class="widgetLgDate">{services.id}</td> */}
                      <td class="widgetLgDate">{services.job}</td>
                      <td class="widgetLgTime">{services.user}</td>
                      <td class="widgetLgAmount">{services.time}</td>
                      <td class="widgetLgAmount">₹{services.payment}</td>
                      {/* <td class="widgetLgStatus"><button class="widgetLgButton Booked">Active</button></td> */}
                    </tr>
                ))}
                </table>
              </div>
            </div>   
                
        }
    </>
)
 
}
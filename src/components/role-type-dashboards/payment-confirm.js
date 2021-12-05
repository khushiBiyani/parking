import React, { useState } from 'react'

import { useAuth } from "../../contexts/AuthContext"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function PaymentConfirmation(props) {
  console.log(props)
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
                        <div class="home">
                            <div class="homeWidgets" style={{ display: "flex", margin: "20px"}}>
                            <div class="widgetLg">
                            <h3 class="widgetLgTitle">List of users</h3>
                            <table class="widgetLgTable">
                                <tr class="widgetLgTr">
                                    <th class="widgetLgTh">User</th>
                                    <th class="widgetLgTh">Name</th>
                                    <th class="widgetLgTh">Job</th>
                                    <th class="widgetLgTh">Rating</th>
                                    <th class="widgetLgTh">Hourly Rate</th>
                                    <th class="widgetLgTh">Status</th>
                                </tr> 
                            {/* {userList.map((user) => (
                                <tr class="widgetLgTr">
                                    <td class="widgetLgUser">
                                        <LocalCarWash
                                        style={{ width: "80px", height: "80px" }}
                                        />
                                    <span class="widgetLgName">{user.email}</span>
                                    </td>
                                    <td class="widgetLgDate">{user.name}</td>
                                    <td class="widgetLgDate">{user.job}</td>
                                    <td class="widgetLgTime">{user.rating ? user.rating : "N/A"}</td>
                                    <td class="widgetLgAmount">₹{user.hourlyRate ? user.hourlyRate : "100"}</td>
                                    <td class="widgetLgStatus"><button class="widgetLgButton Booked">Active</button></td>
                                </tr>
                            ))} */}
                            </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}

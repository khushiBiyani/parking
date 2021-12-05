import React, {useState, useEffect} from 'react'
import { Alert, Button } from "react-bootstrap"
import "./home.css";
import "./sidebar.css";
import firebase from '../../firebase'
import "./sidebar.css";
import { useHistory } from "react-router-dom"
import {
  PermIdentity,
  Storefront,
  LocalCarWash
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"

export default function Sidebar() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const { logout } = useAuth()
  
  function getAllUsers(){
      const usersCollection = firebase.firestore().collection('workers')
      setLoading(true);
      usersCollection.get().then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            if(user.roleId === 2)
              items.push(doc.data());
        });
        setUserList(items);
        setLoading(false);
      });
  }

  const history = useHistory()

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <h1>Loading...</h1> : null}
      {!loading && 
            <main role="main" style={{ minWidth :"100%", height:"100vh" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        Hello Administrator.
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
                                Users
                                </li>
                            </Link>
                            <Link to="/workers" className="link">
                                <li className="sidebarListItem active">
                                <Storefront className="sidebarIcon" />
                                Workers
                                </li>
                            </Link>
                            </ul>
                        </div>
                        <div className="sidebarMenu">
                            <h3 className="sidebarTitle">Quick Menu</h3>
                            <ul className="sidebarList">
                                {/* <Link className="link" onClick={addWorker}>
                                    <li className="sidebarListItem">
                                    <PermIdentity className="sidebarIcon" />
                                    Add Worker
                                    </li>
                                </Link> */}
                                <Button variant="link">
                                <Link to="/add-worker" className="link">
                                    Add Worker
                                </Link>
                                </Button>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div class="home">
                        <div class="featured">
                        <div class="featuredItem">
                            <span class="featuredTitle">Total number of Workers</span>
                            <div class="featuredMoneyContainer">
                            <span class="featuredMoney">{ userList && userList.length > 0 ? userList.length : 0 }</span>
                            </div>
                        </div>
                        </div>
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
                          {userList.map((user) => (
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
                          ))}
                          </table>
                        </div>
                        </div>
                    </div>
                    </div>
            </main>
      }
    </>
  );
}


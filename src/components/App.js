import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login" 
import Otp from "./Otp"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import UserHistoryboard from './role-type-dashboards/HistoryView'
import WorkerSignUp from './role-type-dashboards/WorkerSignUp'
import AdminWorkersView from './role-type-dashboards/AdminWorkersView'
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/workers" component={AdminWorkersView} />
              <PrivateRoute exact path="/history" component={UserHistoryboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/add-worker" component={ WorkerSignUp} />
              <Route path="/login" component={Login} />
              <Route path="/Otp" component={Otp} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
    </Container>
  )
}

export default App
// import React from "react"
// import Signup from "./Signup"
// import { Container } from "react-bootstrap"
// import { AuthProvider } from "../contexts/AuthContext"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
// import Login from "./Login"
// import PrivateRoute from "./PrivateRoute"
// import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"
// import UserHistoryboard from './role-type-dashboards/HistoryView'
// import AdminWorkersView from './role-type-dashboards/AdminWorkersView'
// function App() {
//   return (
//     <Container
//       className="d-flex align-items-center justify-content-center"
//       style={{ minHeight: "100vh" }}
//     >
//         <Router>
//           <AuthProvider>
//             <Switch>
//               <PrivateRoute exact path="/" component={Dashboard} />
//               <PrivateRoute exact path="/workers" component={AdminWorkersView} />
//               <PrivateRoute exact path="/history" component={UserHistoryboard} />
//               <PrivateRoute path="/update-profile" component={UpdateProfile} />
//               <Route path="/signup" component={Signup} />
//               <Route path="/Otp" component={Otp} />
//               <Route path="/login" component={Login} />
//               <Route path="/forgot-password" component={ForgotPassword} />
//             </Switch>
//           </AuthProvider>
//         </Router>
//     </Container>
//   )
// }

// export default App

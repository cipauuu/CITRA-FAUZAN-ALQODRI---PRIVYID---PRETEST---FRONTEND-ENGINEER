import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import OTP from "./components/OTP/OTP";
import Akun from "./components/Edit/Akun";
import Karir from "./components/Edit/Karir";
import Pendidikan from "./components/Edit/Pendidikan";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/OTP" component={OTP}></Route>
        <Route path="/Akun" component={Akun}></Route>
        <Route path="/Karir" component={Karir}></Route>
        <Route path="/Pendidikan" component={Pendidikan}></Route>
      </Switch>
    </Router>
  );
}

export default App;

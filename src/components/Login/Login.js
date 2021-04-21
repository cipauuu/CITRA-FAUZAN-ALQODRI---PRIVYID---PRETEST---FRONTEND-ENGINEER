import React, { Component } from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Login extends Component {
  componentDidMount() {
    this.getLatLong();
    if (this.state.authorization !== undefined) {
      window.location = "/";
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      authorization: Cookies.get("authorization"),
      phone: "",
      password: "",
      latlong: "",
      device_token: "0",
      device_type: 2,
    };
    this.onChange = this.onChange.bind(this);
  }

  handleLogin = (e) => {
    if (this.state.phone === "" || this.state.password === "") {
      alert("Fill all field");
    } else {
      e.preventDefault();
      const data = this.state;
      axios
        .post(`api/api/v1/oauth/sign_in`, data)
        .then((response) => {
          Cookies.set("phone", this.state.phone);
          Cookies.set("authorization", response.data.data.user.access_token);
          window.location = "/";
        })
        .catch((error) => {
          if (error) {
            alert(error.response.data.error.errors);
          }
        });
    }
  };

  getLatLong() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude.toString();
          let long = position.coords.longitude.toString();
          this.setState({
            latlong: lat + "," + long,
          });
        },
        (error) => {
          this.setState({
            latlong: "0,0",
          });
        }
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  regis(){
    window.location = "/register";
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6} className="p-5">
            <h1 className="mb-5 text-center">Login</h1>
            <Form>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  type="number"
                  placeholder="ex : 6281234567890"
                  onChange={this.onChange}
                  autoFocus
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                  onClick={(e) => this.handleLogin(e)}
                />
              </Form.Group>
            </Form>

            <p className="text-center mt-5">
              Belum memiliki akun?{" "}
              <Link onClick={this.regis}>Daftar Disini!</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;

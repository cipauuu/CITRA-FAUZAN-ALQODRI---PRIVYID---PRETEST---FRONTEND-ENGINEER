import React, { Component } from "react";
import "./Register.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Register extends Component {
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
      country: "",
      latlong: "",
      device_token: "0",
      device_type: 2,
    };
    this.onChange = this.onChange.bind(this);
    this.getLatLong = this.getLatLong.bind(this);
  }

  handleRegis = (e) => {
    if (
      this.state.phone === "" ||
      this.state.password === "" ||
      this.state.country === ""
    ) {
      alert("Fill All the Field");
    } else {
      e.preventDefault();
      const data = this.state;
      axios
        .post(`api/api/v1/register`, data)
        .then((response) => {
          Cookies.set("id", response.data.data.user.id);
          Cookies.set("phone", response.data.data.user.phone);
          window.location = "OTP";
        })
        .catch((error) => {
          if (error.response) {
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

  login(){
    window.location = "/login";
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6} className="p-5">
            <h1 className="mb-5 text-center">Register</h1>
            <Form>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  type="number"
                  placeholder="ex : 6281234567890"
                  onChange={this.onChange}
                  autoFocus
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your phone number with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="country"
                  type="name"
                  placeholder="ex : Indonesia"
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className="btn btn-primary mt-4"
                  type="submit"
                  onClick={(e) => this.handleRegis(e)}
                />
              </Form.Group>
            </Form>

            <p className="text-center mt-5">
              Sudah memiliki akun? <Link onClick={this.login}>Login Disini!</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;

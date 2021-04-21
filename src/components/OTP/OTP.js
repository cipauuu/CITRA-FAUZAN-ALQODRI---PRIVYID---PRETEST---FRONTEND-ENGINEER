import React, { Component } from "react";
import "./OTP.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: Cookies.get("id"),
      otp_code: "",
      phone: Cookies.get("phone"),
    };
    this.onChange = this.onChange.bind(this);
  }

  handleOTP = (e) => {
    if (this.state.otp_code === "") {
      alert("Fill OTP Code");
    } else {
      e.preventDefault();
      const data = {user_id: this.state.user_id, otp_code: this.state.otp_code};
      axios
        .post(`api/api/v1/register/otp/match`, data)
        .then((response) => {
          alert("Verifikasi OTP Berhasil")
          Cookies.remove('phone')
          Cookies.remove('id')
          window.location = 'Login';
        })
        .catch((error) => {
          if (error) {
            alert("Kode OTP Salah");
          }
        });
    }
  };

  resendOTP = (e) => {
    e.preventDefault();
    const data = { phone: this.state.phone, user_id: this.state.user_id };
    axios
      .post(`api/api/v1/register/otp/request`, data)
      .then((response) => {
        alert("Periksa kode OTP di pesan masuk pada nomor " + this.state.phone);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          alert(error);
        }
      });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6} className="p-5">
            <h1 className="mb-5 text-center">Verifikasi OTP</h1>
            <Form>
              <Form.Group>
                <Form.Label>Kode OTP</Form.Label>
                <Form.Control
                  name="otp_code"
                  type="number"
                  placeholder="XXXX"
                  onChange={this.onChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className="btn btn-primary mt-4"
                  type="submit"
                  value="Verifikasi"
                  onClick={(e) => this.handleOTP(e)}
                />
              </Form.Group>
            </Form>

            <p className="text-center mt-5">
              Kode OTP Belum Masuk?{" "}
              <Link onClick={(e) => this.resendOTP(e)}>
                Kirim Ulang Disini!
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OTP;

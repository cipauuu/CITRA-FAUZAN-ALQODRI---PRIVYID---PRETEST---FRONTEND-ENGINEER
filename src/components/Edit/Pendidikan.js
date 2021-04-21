import React, { Component } from "react";
import "./Edit.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Pendidikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: Cookies.get("authorization"),
      user: {},
      school_name: "",
      graduation_time: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.state.authorization === undefined) {
      window.location = "/login";
    }

    this.getProfile();
  }

  getProfile() {
    axios
      .get(`api/api/v1/profile/me`, {
        headers: {
          Authorization: `${this.state.authorization}`,
        },
      })
      .then((response) => {
        const education = response.data.data.user.education;
        this.setState({
          school_name: education.school_name,
          graduation_time: education.graduation_time,
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.errors);
        }
      });
  }

  handleEdit = (e) => {
    if (this.state.user.name === "") {
      alert("Fill All the Field");
    } else {
      e.preventDefault();
      const data = {
        school_name: this.state.school_name,
        graduation_time: this.state.graduation_time,
      };
      axios
        .post(`api/api/v1/profile/education`, data, {
          headers: {
            Authorization: `${this.state.authorization}`,
          },
        })
        .then((response) => {
          window.location = "/";
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error.errors);
          }
        });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6} className="p-5">
            <h1 className="mb-5 text-center">Edit Pendidikan</h1>
            <Form>
              <Form.Group>
                <Form.Label>Nama Sekolah</Form.Label>
                <Form.Control
                  name="school_name"
                  type="text"
                  placeholder={this.state.school_name}
                  onChange={this.onChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tanggal Lulus</Form.Label>
                <Form.Control
                  name="graduation_time"
                  type="date"
                  placeholder={this.state.graduation_time}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className="btn btn-primary mt-4"
                  type="submit"
                  onClick={(e) => this.handleEdit(e)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Pendidikan;

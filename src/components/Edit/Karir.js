import React, { Component } from "react";
import "./Edit.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Karir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: Cookies.get("authorization"),
      user: {},
      position: "",
      company_name: "",
      starting_from: "",
      ending_in: "",
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
        const career = response.data.data.user.career;
        this.setState({
          position: career.position,
          company_name: career.company_name,
          starting_from: career.starting_from,
          ending_in: career.ending_in,
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.errors);
        }
      });
  }

  handleEdit = (e) => {
    if (this.state.position === "" ||
    this.state.company_name === "" ||
    this.state.starting_from === "" ||
    this.state.ending_in === "") {
      alert("Fill All the Field");
    } else {
      e.preventDefault();
      const data = {
        position: this.state.position,
        gender: this.state.gender,
        company_name: this.state.company_name,
        starting_from: this.state.starting_from,
        ending_in: this.state.ending_in,
      };
      axios
        .post(`api/api/v1/profile/career`, data, {
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
    console.log(this.state)
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6} className="p-5">
            <h1 className="mb-5 text-center">Edit Karir</h1>
            <Form>
              <Form.Group>
                <Form.Label>Posisi</Form.Label>
                <Form.Control
                  name="position"
                  type="text"
                  placeholder={this.state.position}
                  onChange={this.onChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Nama Perusahaan</Form.Label>
                <Form.Control
                  name="company_name"
                  type="text"
                  placeholder={this.state.company_name}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  name="starting_from"
                  type="date"
                  placeholder={this.state.starting_from}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  name="ending_in"
                  type="date"
                  placeholder={this.state.ending_in}
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

export default Karir;

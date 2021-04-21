import React, { Component } from "react";
import "./Edit.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class Akun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: Cookies.get("authorization"),
      user: {},
      name: "",
      gender: "",
      birthday: "",
      hometown: "",
      bio: "",
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
        this.setState({
          user: response.data.data.user,
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error.errors);
        }
      });
  }

  handleEdit = (e) => {
    if (this.state.name === "" ||
    this.state.gender === "" ||
    this.state.birthday === "" ||
    this.state.hometown === "" ||
    this.state.bio === "") {
      alert("Fill All the Field");
    } else {
      e.preventDefault();
      const data = {
        name: this.state.name,
        gender: this.state.gender,
        birthday: this.state.birthday,
        hometown: this.state.hometown,
        bio: this.state.bio,
      };
      axios
        .post(`api/api/v1/profile`, data, {
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
            <h1 className="mb-5 text-center">Edit Profil</h1>
            <Form>
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="name"
                  type="name"
                  placeholder={this.state.user.name}
                  onChange={this.onChange}
                  autoFocus
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Nama</Form.Label>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Laki-laki"
                      name="gender"
                      type={type}
                      value={0}
                      onChange={this.onChange}
                      required
                      id={`inline-${type}-1`}
                    />

                    <Form.Check
                      inline
                      label="Perempuan"
                      name="gender"
                      type={type}
                      value={1}
                      onChange={this.onChange}
                      required
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}
              </Form.Group>

              <Form.Group>
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  name="birthday"
                  type="date"
                  placeholder={this.state.user.birthday}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  name="hometown"
                  type="text"
                  placeholder={this.state.user.hometown}
                  onChange={this.onChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  name="bio"
                  type="text"
                  placeholder={this.state.user.bio}
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

export default Akun;

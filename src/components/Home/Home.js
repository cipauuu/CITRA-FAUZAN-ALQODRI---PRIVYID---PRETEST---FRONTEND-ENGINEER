import React, { Component } from "react"
import "./Home.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorization: Cookies.get('authorization'),
            user: {},
        }
    }

    handleLogout(){
        // API Revoke error, jadi saya hanya clear token yang tersimpan di cookies dan akses page login
        Cookies.remove('authorization')
        window.location = "/login"
    }

    componentDidMount() {
        if(this.state.authorization === undefined){
            window.location = '/login'
        }
        this.setProfile()
        this.getProfile()
    }

    setProfile(){
        var profile = ["name", "age", "bio", "birthday", "gender", "hometown", "zodiac"]
        var pLen = profile.length
        var career = ["company_name", "starting_from", "ending_in"]
        var cLen = career.length
        var education = ["school_name", "graduation_time"]
        var eLen = education.length
        var i

        for (i = 0; i < pLen; i++) {
            document.getElementById(profile[i]).innerHTML="-"
        }

        for (i = 0; i < cLen; i++) {
            document.getElementById(career[i]).innerHTML="-"
        }

        for (i = 0; i < eLen; i++) {
            document.getElementById(education[i]).innerHTML="-"
        }
    }

    getProfile(){
        axios
        .get(`api/api/v1/profile/me`, {
            headers: {
                'Authorization': `${this.state.authorization}`}})
        .then((response) => {
            this.setState({
                user: response.data.data.user
            })
            this.setCover()
            this.setAvatar()
            this.setCarEd()
        })
        .catch((error) => {
            if (error.response) {
                alert(error.response.data.error.errors)
            }
        })
    }

    setCover(){
        if(this.state.user.cover_picture.url === null){
            document.getElementById("cover").src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22720%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20720%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_178ef6c61ee%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A36pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_178ef6c61ee%22%3E%3Crect%20width%3D%22720%22%20height%3D%22250%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22264.0703125%22%20y%3D%22141.8%22%3E720x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        } else {
            document.getElementById("cover").src=(this.state.user.cover_picture.url)
        }
    }

    setAvatar(){
        if(this.state.user.user_picture === null){
            document.getElementById("avatar").src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_178ef6c61e9%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_178ef6c61e9%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.765625%22%20y%3D%2294.8%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        } else {
            document.getElementById("avatar").src=(this.state.user.user_picture.picture.url)
        }
    }

    setCarEd(){
        var car = ["company_name", "starting_from", "ending_in"]
        var cLen = car.length
        var edu = ["school_name", "graduation_time"]
        var eLen = edu.length
        var i

        const ca = this.state.user.career
        const ca_result = Object.values(ca)
        for (i = 0; i < cLen; i++) {
            if(ca_result[i] !== null){
                document.getElementById(car[i]).innerHTML=ca_result[i]
            }
        }

        const ed = this.state.user.education
        const ed_result = Object.values(ed)
        for (i = 0; i < eLen; i++) {
            if(ed_result[i] !== null){
                document.getElementById(edu[i]).innerHTML=ed_result[i]
            }
        }

    }

    uploadCover = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('image',e.target.files[0])

        axios
        .post(`api/api/v1/uploads/cover`, formData, {
            headers: {
                Authorization : `${this.state.authorization}`,
                'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            window.location.reload()
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
            }
        });
    }

    uploadAvatar = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('image',e.target.files[0])

        axios
        .post(`api/api/v1/uploads/profile`, formData, {
            headers: {
                "Authorization" : `Bearer ${this.state.authorization}`,
                'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            window.location.reload()
        })
        .catch((error) => {
            if (error.response) {
                console.log(formData)
            }
        });
    }

    render() {
        return (
            <div>
            <Container fluid>
            <Row className="justify-content-center">
                <Col className="px-0">
                    {['bottom'].map((placement) => (
                        <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                            <Tooltip>
                            Ganti gambar Cover
                            </Tooltip>
                        }
                        >
                            <label className="d-block">
                                <input onChange={(e) => this.uploadCover(e)} type="file" className="d-none"/>
                                <Image className="cover" id="cover" width="100%"/>
                            </label>
                        </OverlayTrigger>
                    ))}

                    {['right'].map((placement) => (
                        <OverlayTrigger
                        key={placement}
                        placement={placement}
                        overlay={
                            <Tooltip>
                            Ganti gambar Avatar
                            </Tooltip>
                        }
                        >
                            <label className="avatar">
                                <input onChange={(e) => this.uploadAvatar(e)} type="file" className="d-none" />
                                <Image id="avatar" roundedCircle/>
                            </label>
                        </OverlayTrigger>
                    ))}
                </Col>
            </Row>
            <Button variant="danger" className="logout" onClick={this.handleLogout}>Log Out</Button>
            </Container>

            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <div className="kolom p-3 mb-4">
                            <h3>Profil Akun</h3>
                            <Link className="float-right edit" to="/Akun">Edit</Link>
                            <hr></hr>

                            <b>Nama</b>
                            <p id="name">{this.state.user.name}</p>
                            <b>Umur</b>
                            <p id="age">{this.state.user.age}</p>
                            <b>Bio</b>
                            <p id="bio">{this.state.user.bio}</p>
                            <b>Tanggal Lahir</b>
                            <p id="birthday">{this.state.user.birthday}</p>
                            <b>Gender</b>
                            <p id="gender">{this.state.user.gender}</p>
                            <b>Alamat</b>
                            <p id="hometown">{this.state.user.hometown}</p>
                            <b>Zodiak</b>
                            <p id="zodiac">{this.state.user.zodiac}</p>
                        </div>
                    </Col>                        
                    
                    <Col xs={4}>
                        <Row>
                            <Col>
                                <div className="kolom p-3 mb-4">
                                    <h3>Riwayat Karir</h3>
                                    <Link className="float-right edit" to="/Karir">Edit</Link>
                                    <hr></hr>

                                    <b>Posisi</b>
                                    <p id="company_name"></p>
                                    <b>Tanggal Mulai Bekerja</b>
                                    <p id="starting_from"></p>
                                    <b>Tanggal Terakhir Bekerja</b>
                                    <p id="ending_in"></p>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={4}>
                        <Row>
                            <Col>
                                <div className="kolom p-3 mb-4">
                                    <h3>Riwayat Pendidikan</h3>
                                    <Link className="float-right edit" to="/Pendidikan">Edit</Link>
                                    <hr></hr>

                                    <b>Nama Sekolah</b>
                                    <p id="school_name"></p>
                                    <b>Tanggal Lulus</b>
                                    <p id="graduation_time"></p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default Home
/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Container,
    Row,
    Col
} from "reactstrap";
import Basics from "../../views/IndexSections/Basics";
import Particles from "react-particles-js";
import Footer from "../Footer/Footer";

class PageHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedUser: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth-token') !== "") {
            this.setState({
                loggedUser: JSON.parse(localStorage.getItem('loggedUser')).role
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="page-header header-filter">
                    <Particles style={{position: 'absolute', top: '100px'}} params={
                        {
                            "particles": {
                                "number": {
                                    "value": 200,
                                    "density": {
                                        "enable": true,
                                        "value_area": 800
                                    }
                                },
                                "color": {
                                    "value": "#ffffff"
                                },
                                "shape": {
                                    "type": "circle",
                                    "stroke": {
                                        "width": 0,
                                        "color": "#000000"
                                    },
                                    "polygon": {
                                        "nb_sides": 5
                                    },
                                    "image": {
                                        "src": "img/github.svg",
                                        "width": 100,
                                        "height": 100
                                    }
                                },
                                "opacity": {
                                    "value": 0.5,
                                    "random": false,
                                    "anim": {
                                        "enable": false,
                                        "speed": 1,
                                        "opacity_min": 0.1,
                                        "sync": false
                                    }
                                },
                                "size": {
                                    "value": 3,
                                    "random": true,
                                    "anim": {
                                        "enable": false,
                                        "speed": 40,
                                        "size_min": 0.1,
                                        "sync": false
                                    }
                                },
                                "line_linked": {
                                    "enable": true,
                                    "distance": 150,
                                    "color": "#ffffff",
                                    "opacity": 0.4,
                                    "width": 1
                                },
                                "move": {
                                    "enable": true,
                                    "speed": 0.5,
                                    "direction": "bottom-left",
                                    "random": true,
                                    "straight": false,
                                    "out_mode": "out",
                                    "bounce": false,
                                    "attract": {
                                        "enable": false,
                                        "rotateX": 600,
                                        "rotateY": 1200
                                    }
                                }
                            },
                            "interactivity": {
                                "detect_on": "window",
                                "events": {
                                    "onhover": {
                                        "enable": false,
                                        "mode": "repulse"
                                    },
                                    "onclick": {
                                        "enable": false,
                                        "mode": "push"
                                    },
                                    "resize": true
                                },
                                "modes": {
                                    "grab": {
                                        "distance": 400,
                                        "line_linked": {
                                            "opacity": 1
                                        }
                                    },
                                    "bubble": {
                                        "distance": 400,
                                        "size": 40,
                                        "duration": 2,
                                        "opacity": 8,
                                        "speed": 1
                                    },
                                    "repulse": {
                                        "distance": 200,
                                        "duration": 0.4
                                    },
                                    "push": {
                                        "particles_nb": 4
                                    },
                                    "remove": {
                                        "particles_nb": 2
                                    }
                                }
                            },
                            "retina_detect": true
                        }}/>
                    <Container>
                        <div className="content-center brand">
                            <h1 className="h1-seo"><span style={{color: '#ffe600'}}>I</span>nno<span
                                style={{color: '#ffe600'}}>S</span>eer•</h1>
                            <h4 className="d-none d-sm-block">
                                Une plateforme d'innovation pour les devins.
                            </h4>
                            <br/><br/>
                            {localStorage.getItem('auth-token') !== "" ? (this.state.loggedUser === "Corporate" ?
                                <h5 className="text-center"><a className="btn-simple btn-round btn btn-primary"
                                                               onClick={() => window.scroll({
                                                                   behavior: 'smooth',
                                                                   left: '0',
                                                                   top: '1200'
                                                               })}>
                                    <i className="tim-icons icon-minimal-down"></i> &nbsp;
                                    Voir votre map de challenges</a></h5> :
                                <h5 className="text-center"><a className="btn-simple btn-round btn btn-primary"
                                                               onClick={() => window.scroll({
                                                                   behavior: 'smooth',
                                                                   left: '0',
                                                                   top: '500'
                                                               })}>
                                    <i className="tim-icons icon-minimal-down"></i> &nbsp;
                                    Voir challenges à la une</a></h5>) :
                                <h5 className="text-center"><a className="btn-simple btn-round btn btn-primary"
                                                               onClick={() => window.scroll({
                                                                   behavior: 'smooth',
                                                                   left: '0',
                                                                   top: '850'
                                                               })}>
                                    <i className="tim-icons icon-minimal-down"></i> &nbsp;
                                    Voir challenges à la une</a></h5>}

                        </div>

                    </Container>
                </div>

                <section className="section section-lg">
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path5.png")}
                    />
                    <img
                        alt="..."
                        className="shapes triangle"
                        src={require("assets/img/triunghiuri.png")}
                    />
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path1.png")}
                    />
                    {localStorage.getItem('auth-token') !== "" ? (this.state.loggedUser === "Corporate" ?
                            <div/> : <div/>
                    ) : <Container>
                        <h1 className="text-center">Cette plateforme est faite pour vous !</h1>
                        <br/><br/><br/>
                        <Row className="row-grid justify-content-center">
                            <Col lg="4">
                                <div className="text-center">
                                    <div className="icon icon-primary">
                                        <i className="tim-icons icon-spaceship" style={{fontSize:'36px'}}/>
                                    </div>
                                    <h4 className="info-title">Startups</h4>
                                    <hr className="line-primary" style={{margin: 'auto'}}/>
                                    <br/>
                                    <p>
                                        • À la recherche d’un nouveau marché?
                                        <br/>
                                        • Vous voulez partager votre expertise?
                                        <br/><br/>
                                        Cette plateforme est pour vous!
                                    </p>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className="text-center">
                                    <div className="icon icon-primary">
                                        <i className="tim-icons icon-bank" style={{fontSize:'36px'}}/>
                                    </div>
                                    <h4 className="info-title">Corporate</h4>
                                    <hr className="line-primary" style={{margin: 'auto'}}/>
                                    <br/>
                                    <p>
                                        • Vous êtes acteur public, banque, assurance, industrie, retail?
                                        <br/>
                                        • Vous cherchez à être en contact avec les dernières technologies?
                                        <br/><br/>
                                        Cette plateforme est pour vous!
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <br/>
                    </Container>
                    }


                </section>
            </div>

        );
    }
}

export default PageHeader;

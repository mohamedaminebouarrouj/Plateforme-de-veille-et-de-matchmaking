import React from "react";
import axios from 'axios';
import Footer from "components/Footer/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import {
    Row,
    Col,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

import Particles from "react-particles-js";
import HoverCard from "../../components/Hover Card/hoverCard";
import {apiConfig} from "../../config";


function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.nom.toUpperCase().trim();
    const bandB = b.nom.toUpperCase().trim();
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}

export default class ChallengesPage extends React.Component {
    constructor(props) {
        super(props);

        this.challengesList = this.challengesList.bind(this)

        this.onShow = this.onShow.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onFirst = this.onFirst.bind(this)
        this.onLast = this.onLast.bind(this)

        this.state = {
            challenges: [],
            dropdownOpen: false,
            page: 1,
            numChallenges:0,
            numPages:0
        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get(apiConfig.baseUrl+'/challenges/')
            .then(r => {
               this.setState({
                   numChallenges:r.data.length,
                   numPages:Math.ceil(r.data.length / 12)
               })
            })


        axios.post(apiConfig.baseUrl+'/challenges/find', {
            pagination: 12,
            page: this.state.page
        })
            .then(response => {
                this.setState({challenges: response.data})
            })
            .catch((error) => {
                console.log(error);
            })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== this.state.page) {
            axios.post(apiConfig.baseUrl+'/challenges/find', {
                pagination: 12,
                page: this.state.page
            })
                .then(response => {
                    this.setState({challenges: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }

    challengesList() {

        this.state.challenges.sort(compare)
        return <HoverCard val={this.state.challenges} sel={"challenges"}/>
    }

    onShow() {
        return this.challengesList()

    }

    onNext() {
        this.setState({
            page: this.state.page + 1
        })
        document.getElementById('prev').hidden = false
        document.getElementById('first').hidden = false
        if (this.state.page === 5) {
            document.getElementById('next').hidden = true
            document.getElementById('last').hidden = true
        }

    }

    onPrevious() {
        this.setState({
            page: this.state.page - 1
        })

        if (this.state.page === 2) {
            document.getElementById('first').hidden = true
            document.getElementById('prev').hidden = true
        }
        if (this.state.page === 6) {
            document.getElementById('next').hidden = false
            document.getElementById('last').hidden = false
        }
    }

    onFirst() {
        this.state.page = 1
        document.getElementById('prev').hidden = true
        document.getElementById('first').hidden = true

        document.getElementById('next').hidden = false
        document.getElementById('last').hidden = false
    }

    onLast() {
        this.state.page = 6
        document.getElementById('prev').hidden = false
        document.getElementById('first').hidden = false


        document.getElementById('next').hidden = true
        document.getElementById('last').hidden = true

    }


    render() {
        return (
            <>
                <IndexNavbar/>
                <Particles style={{position: 'absolute', top: '100px'}} params={
                    {
                        "particles": {
                            "number": {
                                "value": 100,
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
                                "speed": 1,
                                "direction": "none",
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
                <section className="section section-lg" id="main">

                    <section className="section">
                        <div className="text-center">
                            <h1>Liste des Challenges</h1>
                        </div>
                        <Row>
                            <Col lg="1"></Col>
                            <Col>
                                {this.onShow()}
                            </Col>
                            <Col lg="1">
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="text-center mb-4 mt-4 content-center"
                                     style={{
                                         position: 'absolute', left: '50%', top: '50%',
                                         transform: 'translate(-50%, -50%)'
                                     }}>


                                    <Pagination>
                                        <PaginationItem hidden id="first">
                                            <PaginationLink>
                                                <i className="tim-icons icon-double-left" onClick={this.onFirst}/>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem hidden id="prev">
                                            <PaginationLink onClick={this.onPrevious}>
                                                Précedent
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem id="next">
                                            <PaginationLink onClick={this.onNext}>
                                                Suivant
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem id="last">
                                            <PaginationLink>
                                                <i className="tim-icons icon-double-right" onClick={this.onLast}/>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                                <br/><br/><br/><br/>
                            </Col>
                        </Row>
                    </section>
                </section>

                <Footer/>

            </>
        );
    }
}

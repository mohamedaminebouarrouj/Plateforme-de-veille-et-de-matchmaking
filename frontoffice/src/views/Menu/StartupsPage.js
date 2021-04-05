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
import {Link} from "react-router-dom";
import axios from 'axios';


// core components
import Footer from "components/Footer/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import {
    Row,
    Col,
    CardBody,
    Nav,
    NavItem, TabContent, Card, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";

import Select from "react-select";
import Particles from "react-particles-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";
import {Scrollbars} from "react-custom-scrollbars";
import HoverCard from "../../components/Hover Card/hoverCard";
import {apiConfig} from "../../config";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const customStyles = {

    control: (base, state) => ({
        ...base,
        color: 'white',
        // match with the menu
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#344675" : "#344675",
        // Removes weird border around container
        boxShadow: state.isFocused ? "#344675" : "#344675",
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "#344675" : "#344675"
        }
    }),
    singleValue: (base) => ({
        ...base,
        color: '#344675'
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        color: '#ffe600'
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        color: '#344675'
    })
};

function TitlebarGridList(props) {
    const classes = useStyles();
    return (
        <>
            {props.val.length > 0 ? (props.sel === "startups" ?
                <>
                    <GridList cols={5} cellHeight={180}>
                        {props.val.map((tile) => (
                            <GridListTile key={tile.nom}>
                                <NavLink tag={Link} to={'/' + props.sel + '/' + tile._id}>
                                    <img style={{
                                        height: '150px', position: 'absolute', left: '50%', top: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                         src={tile.logo ? require("../../assets/logos/Startups/" + tile.logo) : require("../../assets/logos/Startups/default.png")}
                                         alt={tile.nom}/>
                                </NavLink>

                                <GridListTileBar
                                    title={tile.nom}
                                    subtitle={tile.domainesId.map(d => d.nom)}
                                    actionIcon={
                                        <IconButton aria-label={`star ${tile.nom}`}>
                                            <StarBorderIcon className={classes.title}/>
                                        </IconButton>
                                    }
                                />
                                {tile.domainesId.map(d => d.nom)}
                            </GridListTile>
                        ))}
                    </GridList>
                </>
                :
                <GridList cols={5} cellHeight={180}>
                    {props.val.map((tile) => (
                        <GridListTile key={tile.nom}>
                            <NavLink tag={Link} to={'/' + props.sel + '/' + tile._id}>
                                <img src={tile.img ? tile.img : require("../../assets/logos/Startups/default.png")}
                                     alt={tile.nom}/>
                            </NavLink>

                            <GridListTileBar
                                title={tile.nom}
                                actionIcon={
                                    <IconButton aria-label={`star ${tile.nom}`}>
                                        <StarBorderIcon className={classes.title}/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>) : <>
                <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}><CircularProgress/> Loading...
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </>}
        </>
    );
}

function Filter(props) {
    var categories = []
    props.challenges.map(c => {
        categories.push(c.categorie)
    })
    let op = [...new Set(categories)].map(e => ({value: e, label: e}))
    op.unshift({value: 'All', label: 'All'})

    return (
        props.selected === "Secteurs" ? <div/> :
            <Col md="3">
                <section className="section">
                    <Card className="card-coin card-plain">
                        <CardBody>
                            <Nav
                                className="nav-tabs-primary justify-content-center"
                                tabs
                            >
                                <NavItem>
                                    Filtre
                                </NavItem>

                            </Nav>
                            <Select
                                styles={customStyles}
                                options={op}
                                isSearchable={false}
                                placeholder="Selectionnez le pays"
                            />
                        </CardBody>
                    </Card>
                </section>

            </Col>
    )
}

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

export default class StartupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.startupsList = this.startupsList.bind(this)
        this.filterStartup = this.filterStartup.bind(this)
        this.showFilter = this.showFilter.bind(this)

        this.onShow = this.onShow.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onFirst = this.onFirst.bind(this)
        this.onLast = this.onLast.bind(this)

        this.state = {
            startups: [],
            startupsAff: [],
            op:[],
            page: 1,
            numStartups:0,
            numPages:0,

        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");

        axios.get(apiConfig.baseUrl+'/startups/')
            .then(r => {
                this.setState({
                    numStartups:r.data.length,
                    numPages:Math.ceil(r.data.length / 12),
                    startups:r.data
                })
            })

        axios.post(apiConfig.baseUrl+'/startups/find', {
            pagination: 12,
            page: this.state.page
        })
            .then(response => {
                this.setState({
                    startupsAff: response.data})
            })
            .catch((error) => {
                console.log(error);
            })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== this.state.page) {
            axios.post(apiConfig.baseUrl+'/startups/find', {
                pagination: 12,
                page: this.state.page
            })
                .then(response => {
                    this.setState({
                        startupsAff: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }

    startupsList() {

        return (
                <HoverCard val={this.state.startupsAff} sel={'startups'}/>)
    }

    filterStartup(pays) {
        if (pays.value !== "All") {
            this.setState({
                startupsAff: this.state.startups.filter(el => el.pays === pays.value)
            })
        } else {
            this.setState({
                startupsAff: this.state.startups
            })
        }
    }


    onShow() {

        return this.startupsList()
    }

    showFilter() {
        return <Filter selected={this.state.selected} challenges={this.state.challenges}/>
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
        var options = []
        this.state.startups.map(s => {
            options.push(s.pays)
        })

        let op = [...new Set(options)].map(e => ({value: e, label: e}))
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
                            <h1>Liste des Startups</h1>
                        </div>
                        <Row>
                            <Col lg="1"></Col>
                            <Col>
                                <div style={{width: '250px', float: 'right'}}>

                                    <Select
                                        styles={customStyles}
                                        options={op}
                                        onChange={this.filterStartup}
                                        isSearchable={false}
                                        placeholder="Sélectionnez le pays"
                                    > </Select>
                                </div>
                            </Col>
                            <Col lg="1"></Col>
                        </Row>
                        <br/><br/><br/>
                        <Row>
                            <Col lg="1"></Col>
                            <Col>
                                {this.onShow()}
                            </Col>
                            <Col lg="1">
                            </Col>
                        </Row>
                        {/*Pagination*/}
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
                        <Footer/>
                    </section>

                </section>

            </>
        );
    }
}

import React, {Component} from "react";
import axios from 'axios';
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import Footer from "../../../components/Footer/Footer";

import {
    Button, CardBody,
    Col, Nav, NavItem, NavLink,
    Row, TabContent, TabPane,
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import {Link} from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AppComponent from "../../../components/Graph/AppComponent";
import {Scrollbars} from "react-custom-scrollbars";
import Particles from "react-particles-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import TitlebarGridList from "../../../components/Card/TitlebarGridList";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    CardActions,
    CardActionArea,
    CardMedia,
} from '@material-ui/core/'

import Carousel from 'react-grid-carousel';
import styled from "@emotion/styled/macro";

const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
});

const BigTitle = styled.h2({
    textTransform: "uppercase",
    fontSize: '20px',
});

const Hover = styled.div({
    opacity: 0,
    transition: "opacity 350ms ease",
});

const SubTitle = styled.h4({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const Paragraph = styled.p({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const CTA = styled.a({
    position: "absolute",
    bottom: "20px",
    left:'20px'
});
const Background = styled.div({
    // Other background code
    [`:hover ${DisplayOver}`]: {
        backgroundColor: "rgba(38,49,72,.8)",
    },
    [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
        transform: "translate3d(0,0,0)",
    },
    [`:hover ${Hover}`]: {
        opacity: 1,
    },
});

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

function TitlebarGridList2(props) {
    const classes = useStyles();
    return (
        <>

                <div style={{width: '1460px'}}>
                    <Carousel cols={4} showDots dotColorActive="#FFDB00">
                        {props.val.map(elem => (
                            <Carousel.Item key={elem._id}>
                                <Card style={{height: "430px"}}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        className={classes.media}
                                        image={elem.urlToImage}
                                        title={elem.titre}
                                        alt={elem.titre}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom style={{color: '#344675'}} variant="h5" component="h2">
                                            {elem.titre.slice(0, 30) + '...'}
                                        </Typography>
                                        <p style={{color: 'rgb(0,0,0,0.5)'}}>
                                            {elem.resume.slice(0, 100) + '...'}
                                        </p>
                                        <a>
                                            <b style={{color: '#344675'}}>Source</b> : {elem.source}
                                        </a>
                                        <br/>
                                        <a>
                                            {elem.datePublication.split('T')[0]}
                                        </a>
                                    </CardContent>
                                    <CardActions style={{float: 'right'}}>
                                        <Button size="large" className="btn btn-simple btn-round" color="default"
                                                href={elem.url} target="_blank">
                                            Lire sur le site
                                        </Button>
                                    </CardActions>

                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>
        </>
    )
}

function Show(props) {
    return (
        <React.Fragment>
            <Row>


                <Col lg="4">
                    <img src={props.tendance.urlToImage} alt='•'/>
                </Col>
                <Col>
                    <p style={{fontSize: '12px'}}>
                        <a target='_blank' rel="noopener noreferrer"
                           href={props.tendance.url}>{props.tendance.titre}</a>
                        <p style={{
                            fontSize: '11px'
                        }}>{props.tendance.resume}</p>
                        <p style={{
                            fontSize: '10px',
                            opacity: '0.7'
                        }}>{props.tendance.source} @ {props.tendance.datePublication.split('T')[0]} </p>
                    </p>
                </Col>
            </Row>
            <hr/>
        </React.Fragment>
    );
}

function ShowStartup(props) {
    return (
        <>
                <div style={{width:'1460px'}}>
                    <Carousel cols={4} gap={26} showDots dotColorActive="#FFDB00">
                        {props.startup.map(elem => (
                            <Carousel.Item key={elem._id}>
                                <Background style={{
                                    backgroundColor: 'rgb(0,0,0,0.5)',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    position: "relative",
                                    height: "300px",
                                    cursor: "pointer",
                                }}>
                                    <img
                                        style={{
                                            height: '120px', position: 'absolute', left: '50%', top: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                        src={elem.logo ? require("../../../assets/logos/Startups/" + elem.logo) : require("../../../assets/logos/Startups/default.png")}
                                    />
                                    <DisplayOver>
                                        <BigTitle>{elem.nom}</BigTitle>
                                        <Hover>
                                            <SubTitle>{elem.dateCreation?(<b>Création: {elem.dateCreation.split('T')[0]}</b>):<a/>}</SubTitle>
                                            <Paragraph>
                                                {elem.description.slice(0, 100) + '...'}
                                            </Paragraph>
                                            <CTA href={'/startups/' + elem._id}>Consulter +</CTA>
                                        </Hover>
                                    </DisplayOver>
                                </Background>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>

        </>
    )
}

const customStyles = {

    control: (base, state) => ({
        ...base,
        background: "transparent",
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
        color: 'white'
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

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.nom.toUpperCase().trim();
    // const bandB = b.nom.toUpperCase().trim();

    const bandA = a.datePublication;
    const bandB = b.datePublication;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison * -1;
}

export default class ShowChallenge extends Component {

    constructor(props) {
        super(props);

        this.FrList = this.FrList.bind(this)
        this.EnList = this.EnList.bind(this)
        this.ArList = this.ArList.bind(this)
        this.onChangeLangage = this.onChangeLangage.bind(this)
        this.showList = this.showList.bind(this)
        this.showStartups = this.showStartups.bind(this)
        this.showSecteurs = this.showSecteurs.bind(this)
        this.filterStartup = this.filterStartup.bind(this)

        this.state = {
            nom: '',
            loggedUserRole: '',
            categorie: '',
            description: '',
            img: '',
            startups: [],
            startupsAff: [],
            secteurs: [],
            tendances: [],
            selectStartup: {value: "All", label: "All"},
            singleSelect: {value: "fr", label: "Français"},
            tabs: 1
        }
    }


    componentDidMount() {
        document.body.classList.toggle("landing-page");
        if (localStorage.getItem('auth-token') !== "") {
            this.setState({
                loggedUserRole: JSON.parse(localStorage.getItem('loggedUser')).role
            })
        }
        axios.get('http://localhost:5000/challenges/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    categorie: response.data.categorie,
                    description: response.data.description,
                    startups: response.data.startupsId,
                    startupsAff: response.data.startupsId,
                    secteurs: response.data.secteursId,
                    img: response.data.img,
                    tendances: response.data.tendancesId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }

    toggleTabs = (e, stateName, index) => {
        e.preventDefault();
        this.setState({
            [stateName]: index
        });
    };

    FrList() {
        var tendancesAff = []
        this.state.tendances.map(currentTendance => {
            if (currentTendance.langage === "Français")
                tendancesAff.push(currentTendance)

        })
        return (
            <>
                <TitlebarGridList2 val={tendancesAff}/>
            </>
        )


    }

    EnList() {
        var tendancesAff = []
        this.state.tendances.map(currentTendance => {
            if (currentTendance.langage === "Anglais")
                tendancesAff.push(currentTendance)

        })
        return (
            <TitlebarGridList2 val={tendancesAff}/>
        )
    }

    ArList() {
        var tendancesAff = []
        this.state.tendances.map(currentTendance => {
            if (currentTendance.langage === "Arabe")
                tendancesAff.push(currentTendance)

        })
        return (
            <TitlebarGridList2 val={tendancesAff}/>
        )
    }

    showList() {
        this.state.tendances.sort(compare)

        if (this.state.singleSelect.value === 'fr') {
            return this.FrList()
        } else if (this.state.singleSelect.value === 'en') {
            return this.EnList()
        } else {
            return this.ArList()
        }

    }

    onChangeLangage(e) {
        this.setState({
            singleSelect: e
        })
    }

    filterStartup(pays) {

        if (pays.value !== "All") {
            this.setState({
                startupsAff: this.state.startups.filter(el => el.pays === pays.value),
                selectStartup: pays

            })
        } else {
            this.setState({
                startupsAff: this.state.startups,
                selectStartup: pays

            })
        }
    }

    showStartups() {
        var options = ['All']
        this.state.startups.map(s => {
            options.push(s.pays)
        })
        let op = [...new Set(options)].map(e => ({value: e, label: e}))

        return (
            <>
                <div style={{width: '250px', float: 'right'}}>

                    <Select
                        styles={customStyles}
                        options={op}
                        value={this.state.selectStartup}
                        onChange={this.filterStartup}
                        isSearchable={false}
                    > </Select>
                </div>
                <br/><br/><br/>
                <ShowStartup startup={this.state.startupsAff}/>
            </>)

    }

    showSecteurs() {
        return this.state.secteurs.map(currentSecteur => {
            return (<Button className="btn-link" color="primary"
                            onClick={() => this.props.history.replace({pathname: `/secteurs/${currentSecteur._id}`})}>
                {currentSecteur.nom}
            </Button>)
        })

    }

    render() {
        return (
            <>
                <IndexNavbar/>
                {/*<Particles style={{position: 'absolute', top: '100px'}} params={
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
                    }}/>*/}
                <section className="section section-lg" id="main">

                    <section className="section">
                        {/*<Row>
                            <Col lg="1"></Col>
                            <Col lg="6">
                                <div style={{
                                    backgroundImage: `url(${this.state.img})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    height: '250px'
                                }}>
                                    <h1 style={{
                                        position: 'absolute',
                                        top: 5,
                                        width: 'auto',
                                        fontSize: '36px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                    }}>
                                        {this.state.nom}
                                    </h1>
                                    <p style={{
                                        position: 'absolute',
                                        top: 50,
                                        width: 'auto',
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                    }}>
                                        Catégorie: <a href="#"
                                                      rel="noopener noreferrer">{this.state.categorie}</a> &nbsp;
                                    </p>

                                </div>
                                <br/>
                                <p style={{
                                    position: 'relative',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}>
                                    {this.state.description}
                                </p>

                                <Card className="card-coin card-plain">
                                    <CardBody>
                                        <Nav
                                            className="nav-tabs-primary justify-content-center"
                                            tabs
                                        >
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: true
                                                    })}

                                                >
                                                    Startups
                                                </NavLink>

                                            </NavItem>

                                        </Nav>
                                        <TabContent
                                            className="tab-subcategories"
                                            activeTab={"tab" + this.state.tabs}
                                        >
                                            <div>
                                                <Scrollbars
                                                    autoHeight
                                                    autoHeightMin={470}
                                                    universal>
                                                    {this.showStartups()}
                                                </Scrollbars>
                                            </div>

                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="4">
                                <Card className="card-coin card-plain">
                                    <CardBody>
                                        <Nav
                                            className="nav-tabs-primary justify-content-center"
                                            tabs
                                        >
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: this.state.tabs === 1
                                                    })}
                                                    onClick={e => this.toggleTabs(e, "tabs", 1)}
                                                    href=""
                                                >
                                                    News
                                                </NavLink>
                                            </NavItem>

                                            {this.state.loggedUserRole === "Startup" ?
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.tabs === 3
                                                        })}
                                                        onClick={e => this.toggleTabs(e, "tabs", 3)}
                                                        href=""
                                                    >
                                                        Secteurs ({this.state.secteurs.length})
                                                    </NavLink>
                                                </NavItem> : <NavItem/>}

                                        </Nav>
                                        <TabContent
                                            className="tab-subcategories"
                                            activeTab={"tab" + this.state.tabs}
                                        >
                                            <TabPane tabId="tab1">
                                                <div style={{width: '250px', float: 'right'}}>
                                                    <Select
                                                        styles={customStyles}
                                                        value={this.state.singleSelect}
                                                        onChange={this.onChangeLangage}
                                                        isSearchable={false}
                                                        options={[
                                                            {
                                                                value: "fr",
                                                                label: "Français",
                                                            },
                                                            {value: "en", label: "English"},
                                                            {value: "ar", label: "عربيّة"}
                                                        ]}
                                                        placeholder="Selectionnez la langue"
                                                    />
                                                </div>
                                                <br/> <br/> <br/>

                                                <div>
                                                    <Scrollbars
                                                        autoHeight
                                                        autoHeightMin={800}
                                                        universal>
                                                        {this.showList()}
                                                    </Scrollbars>
                                                </div>

                                            </TabPane>
                                            <TabPane tabId="tab3">
                                                <div>
                                                    <Scrollbars
                                                        autoHeight
                                                        autoHeightMin={800}
                                                        universal>
                                                        {this.showSecteurs()}
                                                    </Scrollbars>
                                                </div>

                                            </TabPane>

                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>*/}
                        <Row>
                            <Col lg="6">
                                <div style={{
                                    backgroundImage: `url(${this.state.img})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    height: '350px'
                                }}>
                                    <h1 style={{
                                        position: 'absolute',
                                        top: 5,
                                        width: 'auto',
                                        fontSize: '40px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                    }}>
                                        {this.state.nom}
                                    </h1>
                                    <p style={{
                                        position: 'absolute',
                                        top: 50,
                                        width: 'auto',
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                                    }}>
                                        Catégorie: <a href="#"
                                                      rel="noopener noreferrer">{this.state.categorie}</a> &nbsp;
                                    </p>

                                </div>
                                <br/>
                            </Col>
                            <Col>
                                <p style={{
                                    position: 'relative',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}>
                                    {this.state.description}
                                </p>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <h2>Actualités</h2>
                        </div>
                        <div style={{width: '250px', float: 'right'}}>
                            <Select
                                styles={customStyles}
                                value={this.state.singleSelect}
                                onChange={this.onChangeLangage}
                                isSearchable={false}
                                options={[
                                    {
                                        value: "fr",
                                        label: "Français",
                                    },
                                    {value: "en", label: "English"},
                                    {value: "ar", label: "عربيّة"}
                                ]}
                                placeholder="Selectionnez la langue"
                            />
                        </div>
                        <br/><br/><br/>
                        <Row>
                            <Col lg="1">
                            </Col>
                            <Col>
                                {this.showList()}
                            </Col>
                            <Col lg="1">
                            </Col>
                        </Row>
                        <br/><br/>
                        <div className="text-center">
                            <h2>Startups</h2>
                        </div>
                        <Row>
                            <Col lg="1">
                            </Col>
                            <Col>
                                {this.showStartups()}
                            </Col>
                            <Col lg="1">
                            </Col>
                        </Row>
                        <br/>
                    </section>


                    <Footer/>
                </section>
            </>
        )
    }
}
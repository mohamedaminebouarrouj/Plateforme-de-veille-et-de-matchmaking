import React, {Component} from "react";
import axios from 'axios';
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import Footer from "../../../components/Footer/Footer";

import {
    Button, CardBody,
    Col, Nav, NavItem, NavLink,
    Row, TabContent, TabPane,
} from "reactstrap";
import Select from "react-select";
import Carousel from 'react-grid-carousel';
import styled from "@emotion/styled/macro";
import TendanceGridList from "../../../components/Tendance Card/TendanceGridList";

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
    left: '20px'
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


function ShowStartup(props) {
    return (
        <>
            <div style={{width: '1400px'}}>
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
                                        <SubTitle>{elem.dateCreation ? (
                                            <b>Création: {elem.dateCreation.split('T')[0]}</b>) : <a/>}</SubTitle>
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
            selectStartup: {value: "Tous", label: "Tous"},
            singleSelect: {value: "fr", label: "Français"},
            tabs: 1,
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
                <TendanceGridList show={true} val={tendancesAff}/>
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
            <TendanceGridList show={true} val={tendancesAff}/>
        )
    }

    ArList() {
        var tendancesAff = []
        this.state.tendances.map(currentTendance => {
            if (currentTendance.langage === "Arabe")
                tendancesAff.push(currentTendance)

        })
        return (
            <TendanceGridList show={true} val={tendancesAff}/>
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

        if (pays.value !== "Tous") {
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
        return (
            <ShowStartup startup={this.state.startupsAff}/>)

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
        var options = []
        this.state.startups.map(s => {
            options.push(s.pays)
        })

        let op = [...new Set(options)].map(e => ({value: e, label: e}))
        return (
            <>
                <IndexNavbar/>
                <section className="section section-lg" id="main">
                    <section className="section">
                        <Row>
                            <Col style={{left: '20px'}}>
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
                            <Col lg="1"></Col>
                        </Row>

                        <div className="text-center">
                            <h2>Actualités</h2>
                        </div>
                        <Row>
                            <Col lg="1"></Col>
                            <Col>
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
                            </Col>
                            <Col lg="1"></Col>
                        </Row>
                        <br/><br/><br/>
                        <Row>
                            <Col>
                                {this.showList()}
                            </Col>
                        </Row>
                        <br/><br/>
                        <div className="text-center">
                            <h2>Startups</h2>
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
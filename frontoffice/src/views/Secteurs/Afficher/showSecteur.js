import React, {Component} from "react";
import axios from 'axios';
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import Footer from "../../../components/Footer/Footer";

import {
    Button, Card, CardBody,
    Col, Nav, NavItem, NavLink,
    Row, TabContent, TabPane,
} from "reactstrap";
import classnames from "classnames";
import Select from "react-select";
import AppComponent from "../../../components/Graph/AppComponent";
import {Scrollbars} from 'react-custom-scrollbars';
import Particles from "react-particles-js";
import TendanceGridList from "../../../components/Tendance Card/TendanceGridList";

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

export default class ShowSecteur extends Component {
    constructor(props) {
        super(props);

        this.FrList = this.FrList.bind(this)
        this.EnList = this.EnList.bind(this)
        this.ArList = this.ArList.bind(this)
        this.onChangeLangage = this.onChangeLangage.bind(this)
        this.showList = this.showList.bind(this)

        this.state = {
            nom: '',
            categorie: '',
            description: '',
            img: '',
            challenges: [],
            tendances: [],
            singleSelect: {value: "fr", label: "Français"},
            tabs: 1
        }
    }


    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/secteurs/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    categorie: response.data.categorie,
                    description: response.data.description,
                    challenges: response.data.challengesId,
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
                <TendanceGridList val={tendancesAff}/>
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
            <TendanceGridList val={tendancesAff}/>
        )
    }

    ArList() {
        var tendancesAff = []
        this.state.tendances.map(currentTendance => {
            if (currentTendance.langage === "Arabe")
                tendancesAff.push(currentTendance)

        })
        return (
            <TendanceGridList val={tendancesAff}/>
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

    render() {
        return (
            <>
                <IndexNavbar/>


                <section className="section section-lg" id="main">
                    <section className="section">
                        <Row>
                            <Col style={{left:'20px'}}>
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
                            <Col lg="1"></Col>
                        </Row>
                        <br/><br/>
                    </section>
                    <div className="text-center"><h2>Map des challenges</h2></div>
                    <section className="section" style={{position: 'relative', height: '700px'}}>
                        <AppComponent id={this.props.match.params.id} history={this.props.history}/>

                    </section>
                </section>

                <Footer/>
            </>
        )
    }
}
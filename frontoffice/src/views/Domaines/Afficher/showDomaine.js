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
import {Link} from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Scrollbars} from "react-custom-scrollbars";
import Particles from "react-particles-js";
import {apiConfig} from "../../../config";

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
    return comparison*-1;
}

function Show(props){
    return (
        <React.Fragment>
            <Row>


                <Col lg="4">
                    <img src={props.tendance.urlToImage} alt='•'/>
                </Col>
                <Col>
                    <p style={{fontSize: '12px'}}>
                        <a target='_blank' rel="noopener noreferrer" href={props.tendance.url}>{props.tendance.titre}</a>
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
function ShowStartup(props){
    return (

        <div>
            <GridList cols={5} cellHeight={200}>
                {props.startup.map((tile) => (
                    <GridListTile>
                        <NavLink tag={Link} to={'/startups/' + tile._id}>
                            <img alt="" style={{opacity: 0.7}} src={tile.logo?require("../../../assets/logos/Startups/"+tile.logo):require("../../../assets/logos/Startups/default.png")}/>
                            <p className="text-center">{tile.nom}</p>
                        </NavLink>
                    </GridListTile>
                ))}
            </GridList>

        </div>
    )
}
const customStyles = {

    control: (base, state) => ({
        ...base,
        background: "transparent",
        color:'white',
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
        color:'#ffe600'
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        color:'#344675'
    })
};
export default class ShowDomaine extends Component {

    constructor(props) {
        super(props);

        this.FrList=this.FrList.bind(this)
        this.EnList=this.EnList.bind(this)
        this.ArList=this.ArList.bind(this)
        this.onChangeLangage=this.onChangeLangage.bind(this)
        this.showList=this.showList.bind(this)
        this.showStartups=this.showStartups.bind(this)
        this.showSecteurs=this.showSecteurs.bind(this)
        this.filterStartup = this.filterStartup.bind(this)


        this.state = {
            nom: '',
            description: '',
            img: '',
            startups: [],
            startupsAff:[],
            secteurs:[],
            tendances: [],
            selectStartup:{value:"All",label:"All"},
            singleSelect:{ value: "fr", label: "Français" },
            tabs: 1
        }
    }


    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get(apiConfig.baseUrl+'/domaines/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    startups : response.data.startupsId,
                    startupsAff:response.data.startupsId,
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

    FrList(){
        return this.state.tendances.map(currentTendance => {
            if (currentTendance.langage==="Français")
            {
                return <Show tendance={currentTendance} key={currentTendance._id}/>;
            }
            return null

        })


    }

    EnList(){
        return this.state.tendances.map(currentTendance => {
            if (currentTendance.langage==="Anglais")
            {
                return <Show tendance={currentTendance} key={currentTendance._id}/>;
            }
            return null


        })
    }

    ArList(){
        return this.state.tendances.map(currentTendance => {
            if (currentTendance.langage==="Arabe")
            {
                return <Show tendance={currentTendance} key={currentTendance._id}/>;
            }
            return null


        })
    }
    showList(){

        this.state.tendances.sort(compare)

        if(this.state.singleSelect.value==='fr'){
            return this.FrList()
        }
        else if(this.state.singleSelect.value==='en'){
            return this.EnList()
        }
        else{
            return this.ArList()
        }

    }
    onChangeLangage(e){
        this.setState({
            singleSelect:e
        })
    }

    filterStartup(pays) {

        if (pays.value !== "All") {
            this.setState({
                startupsAff: this.state.startups.filter(el => el.pays === pays.value),
                selectStartup:pays
            })
        } else {
            this.setState({
                startupsAff: this.state.startups,
                selectStartup:pays
            })
        }
    }

    showStartups() {


        var options = ['All']
        this.state.startups.map(s => {
                    options.push(s.pays)
            })

        let op=[...new Set(options)].map(e=>({value:e,label:e}))

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

    showSecteurs(){
        return this.state.secteurs.map(currentSecteur=>
        {return(<Button className="btn-link" color="primary" onClick={()=> this.props.history.replace({ pathname: `/secteurs/${currentSecteur._id}`})}>
            {currentSecteur.nom}
        </Button>)})

    }

    render() {
        return (
            <>
                <IndexNavbar />
                <Particles style={{position: 'absolute', top:'100px'}} params={
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
                        <Row>
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

                                </div>
                                <br/>
                                <p style={{position: 'relative',
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
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
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </section>


                    <Footer/>
                </section>
            </>
        )
    }
}
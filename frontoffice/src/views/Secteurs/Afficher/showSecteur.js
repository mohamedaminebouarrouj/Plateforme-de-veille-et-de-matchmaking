import React, {Component, Fragment} from "react";
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


function Show(props){
    return (
        <React.Fragment>

            <p style={{fontSize: '12px'}}><img src={props.tendance.urlToImage} alt='•' style={{height: 'auto', width:'20%'}}/> <a target='_blank' href={props.tendance.url}>{props.tendance.titre}</a> </p>
            <p style={{fontSize: '11px' , opacity:'0.7'}}>{props.tendance.source} @ {props.tendance.datePublication.split('T')[0]} </p>
            <p style={{fontSize: '11px' , opacity:'0.2'}}>───────────────────────────────────────────────────────────────────</p>
        </React.Fragment>
    );
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

export default class ShowSecteur extends Component {
    constructor(props) {
        super(props);

        this.FrList=this.FrList.bind(this)
        this.EnList=this.EnList.bind(this)
        this.ArList=this.ArList.bind(this)
        this.onChangeLangage=this.onChangeLangage.bind(this)
        this.showList=this.showList.bind(this)
        this.showDomaines=this.showDomaines.bind(this)

        this.state = {
            nom: '',
            categorie:'',
            description: '',
            img: '',
            domaines: [],
            tendances: [],
            singleSelect:{ value: "fr", label: "Français" },
            tabs: 1
        }
    }


    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/secteurs/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    nom: response.data.nom,
                    categorie: response.data.categorie,
                    description: response.data.description,
                    domaines : response.data.domainesId,
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

        })
    }

    EnList(){
        return this.state.tendances.map(currentTendance => {
            if (currentTendance.langage==="Anglais")
            {
                return <Show tendance={currentTendance} key={currentTendance._id}/>;
            }

        })
    }

    ArList(){
        return this.state.tendances.map(currentTendance => {
            if (currentTendance.langage==="Arabe")
            {
                return <Show tendance={currentTendance} key={currentTendance._id}/>;
            }

        })
    }
    showList(){
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

    showDomaines(){
        return this.state.domaines.map(currentDomaine=>
        {return(<Button className="btn-link" color="primary" onClick={()=> this.props.history.replace({ pathname: `/domaines/${currentDomaine._id}`})}>
            {currentDomaine.nom}
        </Button>
        )})
    }

    render() {
        return (
            <>
                <IndexNavbar />

                <div className="wrapper">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/blob.png")}
                        />
                        <img
                            alt="..."
                            className="path2"
                            src={require("assets/img/path2.png")}
                        />
                        <img
                            alt="..."
                            className="shapes wave"
                            src={require("assets/img/waves.png")}
                        />
                        <img
                            alt="..."
                            className="shapes squares"
                            src={require("assets/img/patrat.png")}
                        />
                        <img
                            alt="..."
                            className="shapes circle"
                            src={require("assets/img/cercuri.png")}
                        />
                    </div>
                    <br/> <br/> <br/>
                    <section className="section">
                            <Row>
                                <Col className="ml-auto mr-auto" lg="6" md="6">
                                    <section>
                                    </section>
                                </Col>

                                <Col lg="5" md="6">
                                    <div style={{backgroundImage: `url(${this.state.img})`, backgroundRepeat: 'no-repeat',backgroundPosition:'center',backgroundSize:'cover', height: '300px'}}>


                                        <h1 style={{position: 'absolute', top:5,width:'auto',fontSize:'36px',backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
                                            {this.state.nom}
                                        </h1>
                                        <p style={{position: 'absolute',top:50,width:'auto',backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
                                            Catégorie: <a href="#">{this.state.categorie}</a> &nbsp;
                                        </p>

                                    </div>
                                    <br/>
                                    <p style={{position:'relative',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
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
                                                            active: this.state.tabs === 1
                                                        })}
                                                        onClick={e => this.toggleTabs(e, "tabs", 1)}
                                                        href=""
                                                    >
                                                        News
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.tabs === 2
                                                        })}
                                                        onClick={e => this.toggleTabs(e, "tabs", 2)}
                                                        href=""
                                                    >
                                                        Domaines reliés ({this.state.domaines.length})
                                                    </NavLink>
                                                </NavItem>

                                            </Nav>
                                            <TabContent
                                                className="tab-subcategories"
                                                activeTab={"tab" + this.state.tabs}
                                            >
                                                <TabPane tabId="tab1">
                                                    <div style={{width:'250px',float:'right'}}>
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
                                                            { value: "en", label: "English" },
                                                            { value: "ar", label: "عربيّة" }
                                                        ]}
                                                        placeholder="Selectionnez la langue"
                                                    />
                                                    </div>
                                                    <br/> <br/> <br/>

                                                    <div>
                                                        {this.showList()}
                                                    </div>

                                                </TabPane>

                                                <TabPane tabId="tab2">
                                                    <div>
                                                        {this.showDomaines()}
                                                    </div>

                                                </TabPane>

                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                    </section>


                    <Footer />
                </div>
            </>
        )
    }
}
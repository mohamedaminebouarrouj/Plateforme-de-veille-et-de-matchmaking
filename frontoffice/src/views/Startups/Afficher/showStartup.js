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
import AppComponent from "../../../components/Graph/AppComponent";

function Show(props){
    return (
        <React.Fragment>

            <p style={{fontSize: '12px'}}><img src={props.tendance.urlToImage} alt='•' style={{height: 'auto', width:'20%'}}/> <a rel="noopener noreferrer" target='_blank' href={props.tendance.url}>{props.tendance.titre}</a> </p>
            <p style={{fontSize: '11px' , opacity:'0.7'}}>{props.tendance.source} @ {props.tendance.datePublication.split('T')[0]} </p>
            <p style={{fontSize: '11px' , opacity:'0.2'}}>───────────────────────────────────────────────────────────────────</p>
        </React.Fragment>
    );
}
function ShowDomaines(props){
    let errorflag=true
    return (

        <div>
            <GridList cols={5} cellHeight={180}>
                {props.startup.map((tile) => (
                    <GridListTile key={tile.nom}>
                        <NavLink tag={Link} to={'/startups/'+tile._id}>
                            <img style={{opacity:0.7}} alt="" />
                            {tile.nom}
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
export default class ShowStartup extends Component {

    constructor(props) {
        super(props);

        this.FrList=this.FrList.bind(this)
        this.EnList=this.EnList.bind(this)
        this.ArList=this.ArList.bind(this)
        this.onChangeLangage=this.onChangeLangage.bind(this)
        this.showList=this.showList.bind(this)
        this.ShowDomaines=this.ShowDomaines.bind(this)

        this.state = {
            nom: '',
            dateCreation:'',
            description: '',
            logo: '',
            domainesId:[],
            fondateurs: [],
            siteWeb:'',
            singleSelect:{ value: "fr", label: "Français" },
            tabs: 1
        }
    }

    //nom: {type: String, required: true, unique: true},
    //         description: {type: String},
    //         fondateurs :[{type: String}],
    //         dateCreation: {type: Date},
    //         logo: {type:String},
    //         siteWeb:{type:String},
    //         domainesId:[{type: Schema.ObjectId,ref : 'Domaine'}]

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/startups/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    fondateurs: response.data.fondateurs,
                    dateCreation:response.data.dateCreation,
                    description: response.data.description,
                    domainesId : response.data.domainesId,
                    logo: response.data.logo,
                    siteWeb:response.data.siteWeb
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

    ShowDomaines() {
            return (<ShowDomaines domaine={this.state.domaine}/>)

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
                <div className="wrapper">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="dots"
                            src={require("../../../assets/img/dots.png")}
                        />
                        <img
                            alt="..."
                            className="path"
                            src={require("../../../assets/img/path1.png")}
                        />
                    </div>
                    <br/>
                    <section className="section">
                      <Row>
                          <Col>
                              <h1>{this.state.nom}</h1>
                              <h4>Fondateurs: </h4>
                              {this.state.fondateurs.map(fon=>{
                                  return(<p> • {fon}</p>)
                              })}
                          </Col>

                          <Col>
                              <h2>Date de promotion: </h2>
                              <h3>{this.state.dateCreation.split('-01T')[0]}</h3>

                              <h5>Domaines:</h5>
                              {this.state.domainesId.map(d=>{
                                  console.log(d)
                                  return(<a href={"/domaines/"+d._id}>{d.nom}</a>)
                              })}
                          </Col>
                      </Row>
                    </section>


                    <Footer />
                </div>
            </>
        )
    }
}
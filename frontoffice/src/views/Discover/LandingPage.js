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
import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';


// core components
import Footer from "components/Footer/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import {Button, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import {NavLink} from "react-router-dom";

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

let ps=null
function TitlebarGridList(props) {
  const classes = useStyles();
  return (
      <div>
        <GridList cols={5} cellHeight={180}>
          {props.val.map((tile) => (
              <GridListTile key={tile.nom}>
                <NavLink tag={Link} to={'/'+props.sel+'/'+tile._id}>
                <img src={tile.img}  style={{opacity:0.7}} alt={tile.nom} />
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
        </GridList>

      </div>
  );
}


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.onSecteurs=this.onSecteurs.bind(this)
    this.onDomaines=this.onDomaines.bind(this)
    this.onChallenges=this.onChallenges.bind(this)
    this.onStartups=this.onStartups.bind(this)

    this.secteursList=this.secteursList.bind(this)
    this.domainesList=this.domainesList.bind(this)
    this.challengesList=this.challengesList.bind(this)
    this.startupsList=this.startupsList.bind(this)

    this.onShow=this.onShow.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = {
      selected:'Secteurs',
      secteurs:[],
      domaines:[],
      challenges:[],
      startups:[],
      dropdownOpen: false};
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");

    axios.get('http://localhost:5000/secteurs/')
        .then(response => {
          this.setState({secteurs: response.data})
        })
        .catch((error) => {
          console.log(error);
        })

    axios.get('http://localhost:5000/domaines/')
        .then(response => {
          this.setState({domaines: response.data})
        })
        .catch((error) => {
          console.log(error);
        })

    axios.get('http://localhost:5000/challenges/')
        .then(response => {
          this.setState({challenges: response.data})
        })
        .catch((error) => {
          console.log(error);
        })

    axios.get('http://localhost:5000/startups/')
        .then(response => {
          this.setState({startups: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  toggle() {
    this.setState({
      dropdownOpen : !this.state.dropdownOpen
    })
  }

  onSecteurs(){
    this.setState(
        {selected:'Secteurs'}
        )
  }

  secteursList() {

    return <TitlebarGridList val={this.state.secteurs} sel={'secteurs'} />
  }

  domainesList() {

    return <TitlebarGridList val={this.state.domaines} sel={'domaines'} />
  }

  challengesList() {

    return <TitlebarGridList val={this.state.challenges} sel={'challenges'} />
  }

  startupsList() {
    return <TitlebarGridList val={this.state.startups} sel={'startups'} />
  }

  onDomaines(){

    this.setState(
        {selected:'Domaines d\'activité'}
    )

  }
  onChallenges(){
    this.setState(
        {selected:'Challenges'}
    )
  }

  onStartups(){

    this.setState(
        {selected:'Startups'}
    )
  }


  onShow(){
    if (this.state.selected==="Secteurs"){
      return this.secteursList()
    }
    else if (this.state.selected==='Domaines d\'activité'){
      return this.domainesList()
    }
    else if(this.state.selected==="Challenges"){
      return this.challengesList()
    }
    else if(this.state.selected==="Startups"){
      return this.startupsList()
    }
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
          <section className="section section-lg">
            <section className="section">
              <Container>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    {this.state.selected}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.onSecteurs}>Secteurs ({this.state.secteurs.length})</DropdownItem>
                    <DropdownItem onClick={this.onDomaines}>Domaines d'activité ({this.state.domaines.length})</DropdownItem>
                    <DropdownItem onClick={this.onChallenges}>Challenges ({this.state.challenges.length})</DropdownItem>
                    <DropdownItem onClick={this.onStartups}>Startups ({this.state.startups.length})</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Container>
            </section>
          </section>
          <section>
            <Table>
              {this.onShow()}
            </Table>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}

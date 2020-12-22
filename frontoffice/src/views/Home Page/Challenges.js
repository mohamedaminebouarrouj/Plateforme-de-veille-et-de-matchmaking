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
import {Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
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

function TitlebarGridList(props) {
    const classes = useStyles();
    return (
        <>
            {props.val.length>0?<GridList cols={5} cellHeight={180}>
                {props.val.map((tile) => (
                    <GridListTile key={tile.nom}>
                        <NavLink tag={Link} to={'/challenges/'+ tile._id}>
                            <img src={tile.img ? tile.img : require("../../assets/logos/Startups/default.png")}
                                 alt={tile.nom}/>
                        </NavLink>

                        <GridListTileBar
                            title={tile.nom}
                            subtitle={<span>Catégorie : <a href='#'>{tile.categorie}</a></span>}
                        />
                    </GridListTile>
                ))}
            </GridList>:<div style={{
                position: 'absolute', left: '50%', top: '100%',
                transform: 'translate(-50%, -50%)'}}><CircularProgress/> Loading...</div>}

        </>
    );
}
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.nom.toUpperCase().trim();
    // const bandB = b.nom.toUpperCase().trim();

    const bandA = a.startupsId.length;
    const bandB = b.startupsId.length;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison*-1;
}


export default class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.challengesList = this.challengesList.bind(this)

        this.state = {
            challenges: [],
            dropdownOpen: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/challenges/')
            .then(response => {
                this.setState({challenges:response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }



    challengesList() {

        this.state.challenges.sort(compare)
        return <TitlebarGridList val={this.state.challenges.slice(0,5)}/>
    }

    render() {
        return (
            <>
                <section className="section" style={{top: '-50px', left: '10px'}}>
                    <h1>Les challenges à la une</h1>

                    {this.challengesList()}
                </section>
            </>
        );
    }
}

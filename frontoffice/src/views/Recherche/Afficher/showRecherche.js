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
import {NavLink} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


function TitlebarGridList(props) {
    return (
        <>

            {props.data?<GridList cols={5} cellHeight={180}>
                {props.data.length > 0 ? props.data.map((tile) => (
                    <GridListTile key={tile.nom}>
                        <NavLink tag={Link} to={'/'+props.sel+"/"+ tile._id}>
                            <img src={tile.img ? tile.img : require("../../../assets/logos/Startups/default.png")}
                                 alt={tile.nom}/>
                        </NavLink>

                        <GridListTileBar
                            title={tile.nom}
                        />
                    </GridListTile>
                )) : <div><CircularProgress/> Loading...</div>}


            </GridList>: <div><CircularProgress/> Loading...</div>}

        </>
    );
}


export default class showRecherche extends React.Component {
    constructor(props) {
        super(props);
        this.challengesList = this.challengesList.bind(this)

        this.state = {
            data: [],
            challenges: [],
            startups: [],
            secteurs: [],
            domaines: [],
            dropdownOpen: false
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5000/secteurs/search/' + this.props.query)
            .then(response => {
                this.setState({
                    challenges: response.data.challenges,
                    startups: response.data.startups,
                    secteurs: response.data.secteurs,
                    domaines: response.data.domaines


                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            axios.get('http://localhost:5000/secteurs/search/' + this.props.query)
                .then(response => {
                    this.setState({
                        challenges: response.data.challenges,
                        startups: response.data.startups,
                        secteurs: response.data.secteurs,
                        domaines: response.data.domaines
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }

    componentWillUnmount() {
    }


    challengesList() {


        return (
            <>
                <h3>Challenges</h3>
                <TitlebarGridList data={this.state.challenges} sel="challenges"/>
                <br/>
                <h3>Secteurs</h3>
                <TitlebarGridList data={this.state.secteurs} sel="secteurs"/>
                <br/>
                <h3>Startups</h3>
                <TitlebarGridList data={this.state.startups} sel="startups"/>
                <br/>
                <h3>Domaines</h3>
                <TitlebarGridList data={this.state.domaines} sel="domaines"/>

            </>)
    }

    render() {
        return (
            <section className="section section-lg">

                <section className="section">
                    {this.challengesList()}
                </section>
            </section>
        );
    }
}

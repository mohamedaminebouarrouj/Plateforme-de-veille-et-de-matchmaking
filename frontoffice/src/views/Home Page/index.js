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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import Challenges from "./Challenges";
import Secteur from "./Secteur";

class Index extends React.Component {
    componentDidMount() {

        document.body.classList.toggle("index-page");
    }

    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    render() {
        return (
            <>
                <IndexNavbar history={this.props.history}/>
                <div className="wrapper" id="particles">

                    <div className="main" id="main">

                        <PageHeader/>
                        {localStorage.getItem('auth-token') !==null ? (JSON.parse(localStorage.getItem("loggedUser")).role === "Corporate" ?
                            <Secteur history={this.props.history}/> :
                            <Challenges/>) :
                            <Challenges/>}

                    </div>
                    <Footer/>
                </div>
            </>
        );
    }
}

export default Index;

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

// reactstrap components
import {Container} from "reactstrap";
import Basics from "../../views/IndexSections/Basics";
import Particles from "react-particles-js";
import Footer from "../Footer/Footer";

class PageHeader extends React.Component {
    render() {
        return (
            <div className="page-header header-filter">

                <Container>
                    <div className="content-center brand">
                        <h1 className="h1-seo"><span style={{color: '#ffe600'}}>I</span>nno<span
                            style={{color: '#ffe600'}}>S</span>eer•</h1>
                        <h4 className="d-none d-sm-block">
                            Une plateforme d'innovation pour les devins.
                        </h4>
                    </div>
                </Container>
            </div>


        );
    }
}

export default PageHeader;

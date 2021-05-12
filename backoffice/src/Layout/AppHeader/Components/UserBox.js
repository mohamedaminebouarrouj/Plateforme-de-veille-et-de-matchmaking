import React, {Fragment} from 'react';

import {
    Button
} from 'reactstrap';



class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }


    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left header-user-info">
                                <div>
                                    {JSON.parse(localStorage.getItem('loggedAdmin')).nom+ " "+JSON.parse(localStorage.getItem('loggedAdmin')).prenom}
                                </div>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div className="widget-content-left">
                                <Button outline className="mb-2 mr-2 btn-transition" color="danger" href="/#/login" onClick={()=>{
                                    localStorage.setItem('auth-tokenAdmin', null)
                                    localStorage.setItem('loggedAdmin', null)
                                }}>Se déconnecter</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;
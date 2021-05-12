import React, {Fragment} from 'react';

import cx from 'classnames';
import axios from 'axios';
import {apiConfig} from "../../../config/config";
import TableHover from '../../../Pages/Startups/Afficher/Examples/TableHover';


class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeSearch= this.onChangeSearch.bind(this)

        this.state = {
            search:'',
            activeSearch: false,
            startups: []
        };
    }

    componentDidMount() {

    }

    onChangeSearch(e)
    {
        if(e.target.value!=='')
        {
            axios.get(apiConfig.baseUrl + '/startups/search/' + e.target.value)
                .then(response => {
                    this.setState({
                            startups: response.data
                        }
                    )
                })
        }
    }



    render() {
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })} style={{float: 'right'}}>
                    <div className="input-holder">
                        <input type="text" className="search-input" onChange={this.onChangeSearch}/>
                        <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})}
                                className="search-icon"><span/></button>
                    </div>
                    <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})} className="close"/>
                </div>
            </Fragment>
        )
    }
}

export default SearchBox;
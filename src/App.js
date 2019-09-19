import React from "react";
import Result from "./component/result";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            proxyUrl :"http://127.0.0.1:8080/",
            inputQuery: "",
            searchQuery: "",
            frontUrlL: "",
            frontUrlR: "",
            resultL: [],
            resultR: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.fetchResult = this.fetchResult.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            inputQuery: e.target.value
        })
    }

    handleClick = (e) => {
        this.fetchResult(this.state.frontUrlL+this.state.inputQuery, "resultL");
        this.fetchResult(this.state.frontUrlR+this.state.inputQuery, "resultR");
        this.setState({
            searchQuery: this.state.inputQuery,
            inputQuery: ""
        })
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.handleClick();
        }
    }

    fetchResult = async (url, stateName) => {
        let frontUrl = this.state.proxyUrl + url
        let { data: result } = await axios.get(frontUrl);
        this.setState({
            [stateName]: result,
        });
    }

    render() {
        return (
                <div className="wrapper">
                    <div className="content-wrapper">
                    <section className="content-header">
                    <div className="col-sm-4 col-sm-offset-4">
                        <div className="input-group sm-3">
                            <input type="text" className="form-control" placeholder={this.state.searchQuery} value={this.state.inputQuery} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="button" onClick={this.handleClick}>
                                <FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                        </div>
                    </div>
                    </section>

                        <section className="content">
                            <div className="row">
                                <Result
                                    query={this.state.searchQuery}
                                    result={this.state.resultL}
                                />

                                <Result
                                    query={this.state.searchQuery}
                                    result={this.state.resultR}
                                />
                            </div>

                        </section>
                </div>

        <footer className="main-footer">
            <div className="pull-right hidden-xs">
                <b>Version</b>"0.0.1"
            </div>
            <strong>Copyright © 2019 <a href="http://www.naver.com">Lex</a>.</strong>
            &nbsp;
            All rights reserved.
                    </footer>
                </div>
        );
    }
}

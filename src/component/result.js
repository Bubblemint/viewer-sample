import React, { Component } from "react";
import Parser from 'html-react-parser';

export default  class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        query: "",
        result: [],
        url: ""
    }

    render() {
        let ds = this.props.result.ds || [];
        let m = this.props.result.m
        let info = null;

        if (ds.length > 0) {
            info = <div className="alert alert-light alert-dismissible fade show" role="alert">
                c: {m.c} | pc: {m.pc} | dc: {m.dc} | breeze_query: {m.breeze_query}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }

        return (
            <div className="col-md-6">

            {info}

            {ds.map((rs, i) => (
                 <div className="box" key={i}>
                     <div className="box-header with-border">
                         <h6> <a href={rs.docurl}>{Parser(rs.title)}</a> </h6>
                         <small> {rs.docid} | {rs.docdsid} </small>
                     </div>
                     <div className="box-body">
                         <img src={rs.thumbnail[0].url} alt={rs.org_title}/>
                     </div>
                 </div>
            ))}
            </div>
        );
    }
}
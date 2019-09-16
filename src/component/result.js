import React, { Component } from "react";

export default  class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        query: "",
        result: []
    }

    render() {
        return (
            <div className="col-md-6">
            {this.props.result.map((rs, i) => (
                 <div className="box" key={i}>
                     <div className="box-header with-border">
                         <h6> {rs.title} / {rs.id} </h6>
                     </div>
                     <div className="box-body">
                         {rs.body}
                     </div>
                 </div>
            ))}
            </div>
        );
    }
}
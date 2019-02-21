import React from "react";
import PropTypes from "prop-types";

export function Panel(props){
    return (
        <div className="panel card p-0">
            <div className="card-header">{props.title}</div>
            <div className="card-body p-0">
                {props.contents}                
            </div>
        </div>
    );
}

Panel.propTypes = {
    title: PropTypes.string,
    contents: PropTypes.object
};
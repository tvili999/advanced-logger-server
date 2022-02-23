import React from "react";
import classnames from "classnames";

import "./NetworkEntry.styl";

const toString = (value) => {
    if(typeof value === "object")
        return JSON.stringify(value);
    
    return value.toString();
}

class NetworkEntry extends React.Component {
    state = {
        expanded: false
    }

    render() {
        const request = this.props.entry.find(x => x[3] === "request");
        return (
            <div
                className={classnames("NetworkEntry", {
                    "NetworkEntry--error": this.props.entry.some(x => x[3] === "error")
                })}
            >
                <div
                    className="NetworkEntry__label"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <span className="NetworkEntry__message">
                        {request.slice(4, 6).join(" ")}
                    </span>
                    <span className="NetworkEntry__date">
                        {new Date(request[0]).toTimeString().substring(0, 8)}
                    </span>
                </div>
                {this.state.expanded && (
                    <pre>
                        {JSON.stringify(this.props.entry, null, 4)}
                    </pre>
                )}
            </div>
        )
    }
}

export default NetworkEntry;

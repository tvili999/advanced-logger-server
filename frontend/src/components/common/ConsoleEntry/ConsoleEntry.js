import React from "react";
import classnames from "classnames";

import "./ConsoleEntry.styl";

const toString = (value) => {
    if(typeof value === "object")
        return JSON.stringify(value);
    
    return value.toString();
}

class ConsoleEntry extends React.Component {
    state = {
        expanded: false
    }
    
    render() {
        const entries = Array.isArray(this.props.entry[3]) ? this.props.entry.slice(3).map(arg => {
            try {
                return JSON.stringify(JSON.parse(arg), null, 4)
            }
            catch {
                return arg
            }
        }) : []
        return (
            <div
                className={classnames("ConsoleEntry", {
                    "ConsoleEntry--error": this.props.entry[2] === "error",
                    "ConsoleEntry--warn": this.props.entry[2] === "warn"
                })}
            >
                <div
                    className="ConsoleEntry__label"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <span className="ConsoleEntry__type">
                        {this.props.entry[2]}
                    </span>
                    <span className="ConsoleEntry__message">
                        {toString(this.props.entry[3])}
                    </span>
                    <span className="ConsoleEntry__date">
                        {new Date(this.props.entry[0]).toTimeString().substring(0, 8)}
                    </span>
                </div>
                {this.state.expanded && (
                    <div className="ConsoleEntry__content">
                        {entries.map((x, i) => (
                            <pre key={i}>
                                {x}
                            </pre>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default ConsoleEntry;

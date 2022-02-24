import React from "react";
import classnames from "classnames";

import "./Entry.styl";

const toString = (value) => {
    if(typeof value === "object")
        return JSON.stringify(value);
    
    return value?.toString?.();
}

class Entry extends React.Component {
    state = {
        expanded: false
    }
    
    render() {
        const entries = this.props.entry.slice(3).map(arg => {
            try {
                return JSON.stringify(arg, null, 4)
            }
            catch(e) {
                return arg?.toString?.()
            }
        });
        return (
            <div
                className={classnames("Entry", {
                    "Entry--error": this.props.entry[2] === "error",
                    "Entry--warn": this.props.entry[2] === "warn"
                })}
            >
                <div
                    className="Entry__label"
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <span className="Entry__type">
                        {toString(this.props.entry[1])}
                    </span>
                    <span className="Entry__message">
                        {toString(this.props.entry.slice(2))}
                    </span>
                    <span className="Entry__date">
                        {new Date(this.props.entry[0]).toTimeString().substring(0, 8)}
                    </span>
                </div>
                {this.state.expanded && (
                    <div className="Entry__content">
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

export default Entry;

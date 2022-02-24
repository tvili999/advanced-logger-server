import React from "react";

import Link from "components/common/Link";

import { withSelectedLog } from "../../../contexts/SelectedLog/SelectedLog";

class LogSelector extends React.Component {
    state = {
        sessions: [],
        dates: [],
        logs: []
    }

    fetch = async () => {
        if(this.props.selectedLog.log) {

        }
        else if(this.props.selectedLog.date) {
            const logs = await this.props.selectedLog.getLogs();
            this.setState({ logs });
        }
        else if(this.props.selectedLog.session) {
            const dates = await this.props.selectedLog.getDates();
            this.setState({ dates });
        }
        else {
            const sessions = await this.props.selectedLog.getSessions();
            this.setState({ sessions });
        }
    }

    interval = null;
    componentDidMount() {
        this.fetch();
        this.interval = setInterval(this.fetch, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);        
    }    

    render() {
        return (
            <div 
                style={{
                    display: "flex",
                    flexFlow: "column"
                }}
            >
                <button
                    onClick={this.props.selectedLog.back}
                >
                    Back
                </button>
                {!this.props.selectedLog.session && (
                    this.state.sessions.map((x) => (
                        <Link
                            key={x}
                            onClick={() => this.props.selectedLog.setSession(x)}
                        >
                            {x}
                        </Link>
                    ))
                )}
                {!this.props.selectedLog.date && (
                    this.state.dates.map((x) => (
                        <Link
                            key={x}
                            onClick={() => this.props.selectedLog.setDate(x)}
                        >
                            {x}
                        </Link>
                    ))
                )}
                {!this.props.selectedLog.log && (
                    this.state.logs.map((x) => (
                        <Link
                            key={x}
                            onClick={() => this.props.selectedLog.setLog(x)}
                        >
                            {x}
                        </Link>
                    ))
                )}
            </div>
        )
    }
}

export default withSelectedLog(LogSelector);
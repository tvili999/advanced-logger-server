import React from "react";

import MainLayout from "components/layouts/MainLayout";
import ConsoleEntry from "components/common/ConsoleEntry";
import NetworkEntry from "components/common/NetworkEntry";

import { withSelectedLog } from "contexts/SelectedLog/SelectedLog";

class LogPage extends React.Component {
    state = {
        logs: []
    }

    interval = null;
    componentDidMount() {
        this.interval = setInterval(async () => {
            const log = await this.props.selectedLog.getLog();

            if(typeof log === "string") {
                const logs = log.split('\n').map(x => {
                    try {
                        return JSON.parse(x);
                    }
                    catch {
                        return null
                    }
                }).filter(x => x);

                this.setState({
                    logs
                })
            }
            else {
                this.setState({
                    logs: [log]
                })
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    parseRequests = () => {
        return this.state.logs
            .filter(x => {
                if(x[1] === "xhr")
                    return x[3] === "request";
            })
            .map(x => {
                return this.state.logs
                    .filter(y => y[1] === "xhr" && y[2] === x[2]);
            })
    }

    render() {
        return (
            <MainLayout>
                {{
                    buttons: (
                        <div>
                            <button
                                onClick={this.props.selectedLog.clear}
                            >
                                Vissza
                            </button>
                        </div>
                    ),
                    console: this.state.logs
                        .filter(x => x[1] === "console")
                        .map((x, i) => (
                            <ConsoleEntry key={i} entry={x}/>
                        )),
                    network: this.parseRequests()
                        .map((x, i) => (
                            <NetworkEntry key={i} entry={x}/>
                        ))
                }}
            </MainLayout>
        )
    }
}

export default withSelectedLog(LogPage)
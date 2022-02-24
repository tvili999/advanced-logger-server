import React from "react";

import MainLayout from "components/layouts/MainLayout";
import ConsoleEntry from "components/common/ConsoleEntry";
import NetworkEntry from "components/common/NetworkEntry";

import { withSelectedLog } from "contexts/SelectedLog/SelectedLog";
import Entry from "../../common/Entry";

class LogPage extends React.Component {
    state = {
        logs: []
    }

    fetch = async () => {
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
    }

    interval = null;
    componentDidMount() {
        this.fetch();
        this.interval = setInterval(this.fetch, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    splitLogs = () => {
        let result = [];

        let current = [];

        for(const entry of this.state.logs) {
            if(entry[1] == "loaded") {
                result.push(current);
                current = [];
            }
            current.push(entry);
        }
        if(current.length > 0)
            result.push(current);

        return result;
    }

    parseRequests = () => {
        const logParts = this.splitLogs();
        let result = [];
        for(const logPart of logParts) {
            const requests = logPart
                .filter(x => {
                    if(x[1] === "xhr")
                        return x[3] === "request";
                    return false;
                })
                .map(x => {
                    return logPart
                        .filter(y => y[1] === "xhr" && y[2] === x[2]);
                })
            result.push(...requests);
        }

        return result;
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
                        .map((x, i) => (
                            <Entry key={i} entry={x}/>
                        )),
                }}
            </MainLayout>
        )
    }
}

export default withSelectedLog(LogPage)
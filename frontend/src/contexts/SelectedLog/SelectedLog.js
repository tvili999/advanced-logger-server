import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const { Provider, Consumer } = React.createContext();

export class SelectedLogProvider extends React.Component {
    lastLog = {

    }

    state = {
        log: Cookies.get("_log"),
        session: Cookies.get("_session"),
        date: Cookies.get("_date"),
        getSessions: async () => {
            const resp = await axios.get(`/api/sessions`)

            return resp.data;
        },
        setSession: (session) => {
            Cookies.set("_session", session)
            this.setState({ session })
        },
        getDates: async () => {
            const { session, date, log } = this.state;
            const resp = await axios.get(`/api/sessions/${session}`)

            return resp.data;
        },
        setDate: (date) => {
            Cookies.set("_date", date)
            this.setState({ date })
        },
        getLogs: async () => {
            const { session, date, log } = this.state;
            const resp = await axios.get(`/api/sessions/${session}/${date}`)

            return resp.data;
        },
        setLog: (log) => {
            Cookies.set("_log", log)
            this.setState({ log })
        },
        lastLogData: null,
        lastModified: null,
        getLog: async () => {
            const { session, date, log } = this.state;
            this.lastLog ||= {};
            if(this.lastLog.session !== session || this.lastLog.date !== date || this.lastLog.log !== log) {
                this.lastLog = { session, date, log }
            }
            const modifiedQuery = this.lastLog.modified ? "?lastModified=" + this.lastLog.modified.toString() : "";
            const resp = await axios.get(`/api/sessions/${session}/${date}/${log}` + modifiedQuery);
            if(resp.headers["last-modified"])
                this.lastLog.modified = parseInt(resp.headers["last-modified"]);

            if(resp.status === 200)
                this.lastLog.data = resp.data;

            return this.lastLog.data;
        },
        clear: () => {
            Cookies.remove('_log');
            Cookies.remove('_date');
            Cookies.remove('_session');
            this.setState({ log: null, date: null, session: null });
        },
        back: () => {
            const { session, date, log } = this.state;
            if(log) {
                this.setState({ log: null })
                Cookies.remove('_log');
            }
            else if(date) {
                this.setState({ date: null })
                Cookies.remove('_date');
            }
            else if(session) {
                this.setState({ session: null })
                Cookies.remove('_session');
            }
        }
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        )
    }
}

export const withSelectedLog = (Component) => {
    const hoc = (props) => (
        <Consumer>
            {selectedLog => (
                <Component selectedLog={selectedLog} {...props}/>
            )}
        </Consumer>
    )

    hoc.displayName = "withSelectedLog()";

    return hoc;
}
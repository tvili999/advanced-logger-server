import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const { Provider, Consumer } = React.createContext();

export class SelectedLogProvider extends React.Component {
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
        getLog: async () => {
            const { session, date, log } = this.state;
            const resp = await axios.get(`/api/sessions/${session}/${date}/${log}`);

            return resp.data;
        },
        clear: () => {
            this.setState({ log: null, date: null, session: null });
        },
        back: () => {
            const { session, date, log } = this.state;
            if(log)
                this.setState({ log: null })
            else if(date)
                this.setState({ date: null })
            else if(session)
                this.setState({ session: null })
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
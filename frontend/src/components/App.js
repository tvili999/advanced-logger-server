import React from "react";

import "./App.styl"
import { withSelectedLog } from "../contexts/SelectedLog/SelectedLog";
import LogSelector from "./pages/LogSelector";
import LogPage from "./pages/LogPage";

class App extends React.Component {

    render() {
        return this.props.selectedLog.log ? (
            <LogPage/>
        ) : (
            <LogSelector/>
        )
    }
}

export default withSelectedLog(App);
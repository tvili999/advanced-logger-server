import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";

import App from "components/App";
import { SelectedLogProvider } from "./contexts/SelectedLog/SelectedLog";

const root = document.getElementById("root");

ReactDOM.render((
    <SelectedLogProvider>
        <App/>
    </SelectedLogProvider>
), root);

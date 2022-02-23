import React from "react";

import "./MainLayout.styl"

const MainLayout = ({ children }) => (
    <div className="MainLayout">
        <div className="MainLayout__buttons">
            {children?.buttons}
        </div>
        <div className="MainLayout__content">
            <div className="MainLayout__console">
                {children?.console}
            </div>
            <div className="MainLayout__network">
                {children?.network}
            </div>
        </div>
    </div>
)

export default MainLayout;
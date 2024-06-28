import React from "react";
import Menu from "../components/menu";
import "../style/style.css";

const dashboard = () => {
    return (
        <div>
            <Menu />
            <div className="container">                
                <h1>Dashboard</h1>
            </div>
        </div>
    );
};

export default dashboard;
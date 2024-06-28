import React from "react";

const LogOut = () => {
    localStorage.clear();
    window.location.reload();
};

export default LogOut;
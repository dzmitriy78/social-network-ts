import React from "react";
import "./preloader.css";
import preloader from "./../../../assets/images/3.gif"

const Preloader = () => {

    return <div className={"preloader"}>
        <img src={preloader} alt={"preloader"}/>
    </div>
}
export default Preloader
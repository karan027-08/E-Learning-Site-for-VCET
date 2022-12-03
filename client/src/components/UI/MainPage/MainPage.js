import React from "react";
import "./MainPage.css";
import circle from "../../../assets/Images/circle12.svg";

const mainPage = (props) => {
    let vcet = null;

    if (props.vcet) {
        vcet = (
            <reactFrag>
                <br />
                <span className="heading-3">VCET</span>
            </reactFrag>
        );
    }

    return (
        <>
            <h1 className="Content-text">
                <span className="heading-1">{props.heading1}</span>
                <br />
                <span className="heading-2">{props.heading2}</span>

                {vcet}

                <div className="MainPageback">
                    {/* <img className="circle1" src={circle1} alt="circle1"/>
                        <img className="circle2" src={circle2} alt="circle2"/> */}
                    <img className="circle1" src={circle} alt="circle2" />
                </div>
            </h1>
        </>
    );
};

export default mainPage;

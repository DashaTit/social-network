import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Header = ({profilePhoto}) => {
    const [login, setLogin] = useState(localStorage.getItem("login"));
    //const [profilePhoto, setprofilePhoto] = useState("./src/assets/reg.png");
    //const photo = (useSelector((state) => state));

    function exitProfile() {
        localStorage.clear();
        setLogin("");
        window.location.assign("http://localhost:5173/");
    }

    // useEffect(() => {
    //     setLogin(localStorage.getItem("login"));
    //     console.log(photo.profiles.profilePhoto)
    //     setprofilePhoto(photo.profiles.profilePhoto)
    // }, [login]);

    return (
        <div>
            <div className="header">
                <Link to={"/"}>
                    <div className="logo">
                        <img
                            className="logo-img"
                            src="./src/assets/logo.png"
                            alt=""
                        />
                        <h1 className="logo-title">stardust</h1>
                    </div>
                </Link>

                <div className="peoples">
                    {login ? (
                        <>
                            <div className="plus">
                                <Link to={"/create"}>
                                    <img src="./src/assets/plus.png" alt="" />
                                    <h1 className="logo-title">create</h1>
                                </Link>
                            </div>
                            <Link to={"/profile"}>
                                <div className="reg">
                                    <img
                                        className="logo-img"
                                        src={profilePhoto}
                                        alt=""
                                    />
                                    <h1 className="logo-title">profile</h1>
                                </div>
                            </Link>
                            <div className="exit" onClick={exitProfile}>
                                <img src="./src/assets/exit.png" alt="" />
                                <h1 className="logo-title">exit</h1>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to={"/registartion"}>
                                <div className="reg">
                                    <img
                                        className="logo-img"
                                        src="./src/assets/reg.png"
                                        alt=""
                                    />
                                    <h1 className="logo-title">register</h1>
                                </div>
                            </Link>
                            <Link to={"/login"}>
                                <div className="log">
                                    <img
                                        className="logo-img"
                                        src="./src/assets/reg.png"
                                        alt=""
                                    />
                                    <h1 className="logo-title">login</h1>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";


import Header from "./components/Header";
import Registartion from "./components/Registartion/Registartion";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import Main from "./components/Main/Main";

import { photo } from "./store/profileSlice"; //set progile photo in redux
import "./App.css"; // styles


function App() {
    const [profilePhoto, setprofilePhoto] = useState("./src/assets/reg.png");
    const [postList, setPostList] = useState([]);

    function checkAutorization() {
        if (!localStorage.getItem("login")) {
            return false;
        }
        return true;
    }
    const dispatch = useDispatch();

    useEffect(() => {
        const login = localStorage.getItem("login");
        login &&
            axios
                .get("http://blog/photo", {
                    params: {
                        login: login,
                    },
                })
                .then(function (res) {
                    let img = res.data;
                    setUser(img);
                });

        axios.get("http://blog/allPosts").then((rs) => setPostList(rs.data));
    }, []);

    function setUser(value) {
        // dispatch(photo(value));
        setprofilePhoto(value);
    }

    return (
        <div className={"container"}>
            <Header profilePhoto={profilePhoto} />
            <Routes>
                <Route path="/registartion" element={!checkAutorization() && <Registartion />} />
                <Route
                    path="/login"
                    element={!checkAutorization() && <Login setUserPhoto={setUser} />}
                />
                <Route
                    path="/profile"
                    element={
                        checkAutorization() && <Profile photo={profilePhoto} />
                    }
                />
                <Route path="/create" element={checkAutorization() && <CreatePost />} />
                <Route path="/" element={<Main postList={postList} />} />
            </Routes>
            
        </div>
    );
}

export default App;

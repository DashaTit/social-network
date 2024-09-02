import React, { useState } from "react";
import "react-advanced-cropper/dist/style.css";
import axios from "axios";
import styles from "./style.module.css";

const Main = ({postList}) => {
    return (
        <div>
            <div className={styles.posts}>
                {postList.map((e) => (
                    <img className={styles.post} src={e} alt="e" />
                ))}
            </div>
        </div>
    );
};
export default Main;

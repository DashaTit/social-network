import React, { useState, useRef, useEffect } from "react";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import axios from "axios";
import styles from "./style.module.css";

const CreatePost = () => {
    const [image, setImage] = useState("");
    const cropperRef = useRef(null);
    const [profilePhoto, setprofilePhoto] = useState("./src/assets/upload.png");

    const onLoadImage = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
        event.target.value = "";
    };

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                setprofilePhoto(canvas.toDataURL());
            }
        }
        setImage("");
    };

    const create = () => {
        if (profilePhoto !== "./src/assets/upload.png") {
            const form = new FormData();
            form.append("login", localStorage.getItem("login"));
            form.append("photo", String(profilePhoto));

            axios
                .post("http://blog/create", form, {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res.data);
                window.location.assign("http://localhost:5173/profile");
                })
                .catch((err) => {
                    console.log("error", err);
                });
        } else {
            alert("Choise the photo!");
        }
    };
    return (
        <div className={styles.main}>
            <div>
                <label htmlFor="profilePhoto">
                    <img className={styles.icon} src={profilePhoto} alt="" />
                </label>
                <input
                    type="file"
                    id="profilePhoto"
                    onChange={(e) => onLoadImage(e)}
                />
                <h1 onClick={create} className={styles.title}>
                    Create Post
                </h1>
            </div>

            {image && (
                <>
                    <div className={styles.modal}>
                        <Cropper
                            ref={cropperRef}
                            src={image}
                            stencilProps={{
                                aspectRatio: 1,
                                overlayClassName: "cropper-overlay",
                                // grid: true,
                            }}
                            className={"cropper"}
                        />
                        <button
                            className={styles.example__button}
                            onClick={onCrop}
                        >
                            Set Image
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
export default CreatePost;

import React, { useState, useRef, useEffect } from "react";
import { Cropper, CircleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import axios from "axios";
import styles from "./style.module.css";

const Profile = ({photo}) => {
    const [image, setImage] = useState("");
    const cropperRef = useRef(null);
    const [profilePhoto, setprofilePhoto] = useState(photo);
    const [postList, setPostList] = useState([]);


    //console.log(postList)

    useEffect(() => {
        axios
            .get("http://blog/post", {
                params: {
                    login: localStorage.getItem("login"),
                },
            })
            .then(function (res) {
                //console.log(res.data)
                res.data && setPostList(res.data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    }, []);

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
                console.log(canvas.toDataURL());
                setprofilePhoto(canvas.toDataURL());
            }
        }
        setImage("");

        const form = new FormData();
        form.append("login", localStorage.getItem("login"));
        form.append("photo", String(cropper.getCanvas().toDataURL()));

        axios
            .post("http://blog/profile", form, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("great!");
                window.location.assign("http://localhost:5173/");
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    return (
        <div>
            <div className={styles.profileHeader}>
                <div>
                    <label htmlFor="profilePhoto">
                        <img
                            className={styles.icon}
                            src={profilePhoto}
                            alt=""
                        />
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        onChange={(e) => onLoadImage(e)}
                    />
                </div>

                <div>
                    <h1 className={styles.title}>
                        {localStorage.getItem("login")}
                    </h1>
                </div>
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
                            stencilComponent={CircleStencil}
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

            <div className={styles.posts}>
                {postList.map((e) => (
                    <img className={styles.post} src={e} alt="e" />
                ))}
            </div>
        </div>
    );
};
export default Profile;

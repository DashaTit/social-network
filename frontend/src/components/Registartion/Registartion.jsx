import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Registartion = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onBlur",
    });
    const onSubmit = (data) => {
        const form = new FormData();
        form.append("login", data.login);
        form.append("password", data.password);
        form.append("checkPassword", data.passwordCheck);

        axios
            .post("http://blog/registration", form, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("login", data.login);
                window.location.assign("http://localhost:5173/");
            })
            .catch((err) => {
                console.log("error", err);
                if (err.message === "Request failed with status code 409") {
                    setErrorMessage("Такой пользователь уже существует");
                }
            });

        reset();
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Registration</h1>
            <h2 className={styles.undertitle}>
                Have account? <Link to={"/login"}>Login</Link>
            </h2>

            <h1 className={styles.undertitle} style={{ marginTop: 12 }}>
                {errorMessage}
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                method="post"
            >
                <div className={styles.input_container + " " + styles.ic1}>
                    <input
                        id="firstname"
                        {...register("login", {
                            required: "Поле обязательно к заполнению!",
                            minLength: {
                                value: 4,
                                message: "Минимальная длина - 4 символа!",
                            },
                        })}
                        className={styles.input}
                        type="text"
                        placeholder=" "
                    />
                    <div className={styles.cut}></div>
                    <label for="firstname" className={styles.placeholder}>
                        Login
                    </label>
                </div>
                <span className={styles.error}>{errors?.login?.message}</span>

                <div className={styles.input_container + " " + styles.ic1}>
                    <input
                        {...register("password", {
                            required: "Поле обязательно к заполнению!",
                            minLength: {
                                value: 4,
                                message: "Минимальная длина - 4 символа!",
                            },
                        })}
                        id="firstname"
                        className={styles.input}
                        type="text"
                        placeholder=" "
                    />
                    <div className={styles.cut}></div>
                    <label for="firstname" className={styles.placeholder}>
                        Password
                    </label>
                </div>
                <span className={styles.error}>
                    {errors?.password?.message}
                </span>

                <div className={styles.input_container + " " + styles.ic1}>
                    <input
                        {...register("passwordCheck", {
                            required: "Поле обязательно к заполнению!",
                            minLength: {
                                value: 4,
                                message: "Минимальная длина - 4 символа!",
                            },
                            validate: (val) => {
                                if (watch("password") != val) {
                                    return "Пароли не совпадают!";
                                }
                            },
                        })}
                        id="firstname"
                        className={styles.input}
                        type="text"
                        placeholder=" "
                    />
                    <div className={styles.cut}></div>
                    <label for="firstname" className={styles.placeholder}>
                        Password
                    </label>
                </div>
                <span className={styles.error}>
                    {errors?.passwordCheck?.message}
                </span>

                <input type="hidden" name="subm" values="abc" />

                <input className={styles.submit} type="submit" />
            </form>
        </div>
    );
};

export default Registartion;

import React, { useRef } from "react";
import { useNavigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { login } from "../services/API_login";

const Login = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await login(data);
            localStorage.setItem('authorization', result.token);
            localStorage.setItem('userLog', result.userLog);
            navigate('/');
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecta'});
        }
    };

    return (
        <div className="FormLogin">
            <Toast ref={toast}></Toast>
            <h3>Ingresar</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <span className="p-float-label">
                    <InputText id="userLaber" type="text" {...register("user", { required: true })} />
                    <label htmlFor="userLaber">Username</label>
                </span>
                <br />
                {errors.user && <small id="userLaber" className="p-error block">Este campo es obligatorio*</small>}
                <br />

                <span className="p-float-label">
                    <InputText id="passwordLaber" type="password" {...register("password", { required: true })} />
                    <label htmlFor="passwordLaber">Contraseña</label>
                </span>
                <br />
                {errors.user && <small id="passwordLaber" className="p-error block">Este campo es obligatorio*</small>}
                <br />

                <Button label="Ingresar" className="p-button-rounded" type="submit"/>
            </form>
        </div>
    );
};

export default Login;
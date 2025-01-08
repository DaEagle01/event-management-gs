import { useSignupMutation, useLoginMutation } from '../features/authentication/authApiSlice';
import { signupSchema, loginSchema } from '../utils/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useNotification from './useNotification';
import { useNavigate } from 'react-router-dom';

export const useAuth = (isSignup = true) => {
    const navigate = useNavigate();
    const [signup, { isLoading: isSignupLoading, isError: isSignupError, error: signupError }] = useSignupMutation();
    const [login, { isLoading: isLoginLoading, isError: isLoginError, error: loginError }] = useLoginMutation();
    const { notify } = useNotification();

    const schema = isSignup ? signupSchema : loginSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        // setError(null);
        try {
            if (isSignup) {
                const result = await signup(data).unwrap();
                console.log(result);
                if (result?.data?.token) {
                    notify("Your account registered successfully.", "success");
                    reset();
                }
            } else {
                const result = await login(data).unwrap();
                console.log(result);
                const token = result?.data?.token;
                if (token) {
                    localStorage.setItem("accessToken", token);
                    navigate("/");
                    notify("Your logged in successfully.", "success");
                    reset();
                }
            }
        } catch (err) {
            // setError(isSignup ? signupError : loginError);
            notify(
                err?.data?.errors?.[0]?.message ||
                err?.data?.message ||
                "Sorry, something went wrong. Please try again.",
                "error"
            );
            console.log(`${isSignup ? 'Signup' : 'Login'} failed:`, err);
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        loading: isSignupLoading || isLoginLoading || loading,
        // error,
    };
};
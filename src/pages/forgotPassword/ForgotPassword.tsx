import {ChangeEvent, FormEvent, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ForgotPassword(){
    const [loading, setLoading] = useState(false);
    const [email,setEmail] = useState('');

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const emailRegex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
          setLoading(false);
          return;
        }
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto justify-center">
                <h1>Forgot your password?</h1>
                <p>Enter your email to reset your password</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Enter email to reset password" className="w-full" required onChange={handleChange}></input>
                    <button
                        disabled={loading}
                        type="submit"
                        className="mt-6 border rounded-md text-raisinblack px-4 py-2 font-medium w-full bg-cambridgeblue"
                        >
                        {loading ? (
                            <span className="flex justify-center items-center bg-transparent">
                            <div
                                className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-transparent text-gray-300"
                                role="status"
                            >
                                <span className="sr-only">Loading</span>
                            </div>
                            Processing...
                            </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
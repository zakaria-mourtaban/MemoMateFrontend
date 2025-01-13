import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../core/components/logo";
import { signup } from "./api";
import "./styles/signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill in all fields");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        if (formData.username.length < 3) {
            setError("Username must be at least 3 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await signup(formData.username, formData.email, formData.password);
            navigate("/workspaces");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup">
                <div>
                    <div className="signup-logo">
                        <Logo />
                    </div>
                    <div>
                        <div className="signup-headline">
                            <h1>Sign Up</h1>
                        </div>
                        <div className="signup-subtext">
                            <p>
                                The first step to becoming one with the notepad,
                                to engage in a natural and fulfilling note
                                taking environment
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="inputs">
                    {error && <div className="error-message">{error}</div>}
                    <div className="input">
                        <p>Username</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="arcticpoet76"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <p>Email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="signup-submit">
                        <div className="signup-btn">
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </button>
                        </div>
                        <div className="redirect">
                            <div>Already have an account? </div>
                            <div 
                                className="redirect-link"
                                onClick={() => navigate("/login")}
                            >
                                Sign in
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="demo"></div>
        </div>
    );
};

export default Signup;
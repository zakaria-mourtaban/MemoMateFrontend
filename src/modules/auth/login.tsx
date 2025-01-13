import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../core/components/logo";
import { login } from "../core/utils/api";
import "./styles/login.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Please enter a valid email address");
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
            await login(formData.email, formData.password);
            navigate("/workspaces");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="demo"></div>
            <div className="login">
                <div>
                    <div className="login-logo">
                        <Logo />
                    </div>
                    <div>
                        <div className="login-headline">
                            <h1>Login</h1>
                        </div>
                        <div className="login-subtext">
                            <p>
                                Log in to become one with the notepad, to engage
                                in a natural and fulfilling note taking
                                environment
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="inputs">
                    {error && <div className="error-message">{error}</div>}
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
                    <div className="login-submit">
                        <div className="login-btn">
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        <div className="redirect">
                            <div>Don't have an account? </div>
                            <div 
                                className="redirect-link"
                                onClick={() => navigate("/signup")}
                            >
                                Sign Up
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
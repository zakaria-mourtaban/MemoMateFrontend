import { useNavigate } from "react-router-dom";
import Logo from "../core/components/logo";
import "./styles/login.css";

const Login = () => {
	const navigate = useNavigate();
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
				<div className="inputs">
					<div className="input">
						<p>Email</p>
						<input type="Email" placeholder="email@example.com" />
					</div>
					<div className="input">
						<p>Password</p>
						<input type="Password" placeholder="••••••••••••" />
					</div>
				</div>
				<div className="login-submit">
					<div className="login-btn">
						<button
							onClick={() => {
								navigate("/workspaces");
							}}
						>
							Login
						</button>
					</div>
					<div className="redirect">
						<div>Don't have an account? </div>
						<div className="redirect-link">Sign Up</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

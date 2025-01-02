import { useNavigate } from "react-router-dom";
import Logo from "../core/components/logo";
import "./styles/signup.css";

const Signup = () => {
	const navigate = useNavigate()
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
				<div className="inputs">
					<div className="input">
						<p>Username</p>
						<input type="Name" placeholder="arcticpoet76" />
					</div>
					<div className="input">
						<p>Email</p>
						<input type="Email" placeholder="email@example.com" />
					</div>
					<div className="input">
						<p>Password</p>
						<input type="Password" placeholder="••••••••••••" />
					</div>
				</div>
				<div className="signup-submit">
					<div className="signup-btn">
						<button
							onClick={() => {
								navigate("/workspaces");
							}}
						>
							Signup
						</button>
					</div>
					<div className="redirect">
						<div>Already have and account? </div>
						<div className="redirect-link">Sign in</div>
					</div>
				</div>
			</div>
			<div className="demo"></div>
		</div>
	);
};

export default Signup;

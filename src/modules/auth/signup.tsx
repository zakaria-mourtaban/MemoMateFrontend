import Logo from "../core/components/logo";

const Signup = () => {
	return (
		<div className="signup-container">
			<div className="signup">
				<div className="logo">
					<Logo />
				</div>
				<div className="headline">
					<h1>Sign Up</h1>
				</div>
				<div className="subtext">
					<h5>
						The first step to becoming one with the notepad, to
						engage in a natural and fulfilling note taking
						environment
					</h5>
				</div>
				<div className="input">
					<h6>Username</h6>
					<input type="Name" placeholder="arcticpoet76" />
				</div>
				<div className="input">
					<h6>Email</h6>
					<input type="Email" placeholder="email@example.com" />
				</div>
				<div className="input">
					<h6>Password</h6>
					<input type="Password" placeholder="************" />
				</div>
				<div className="signupbtn">
					<button>Signup</button>
				</div>
				<div className="redirect">
					<div>Already have and account?{" "}</div>
					<div className="redirect-link">Sign in</div>
				</div>
			</div>
			<div className="demo"></div>
		</div>
	);
};

export default Signup;

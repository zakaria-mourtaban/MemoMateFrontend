// authActions.js
export const loginSuccess = (user, token) => {
	localStorage.setItem('token', token);
	return {
	  type: 'LOGIN_SUCCESS',
	  payload: { user, token },
	};
  };
  
  export const logout = () => {
	localStorage.removeItem('token');
	return {
	  type: 'LOGOUT',
	};
  };
  
  export const loadUser = () => {
	return async (dispatch) => {
	  const token = localStorage.getItem('token');
	  if (token) {
		const response = await fetch('/api/auth/user', {
		  headers: { 'Authorization': `Bearer ${token}` },
		});
		const data = await response.json();
		if (response.ok) {
		  dispatch(loginSuccess(data.user, token));
		}
	  }
	};
  };
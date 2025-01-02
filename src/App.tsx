import React from "react";
import "./App.css";
import "@fontsource/poppins";
import Notes from "./modules/note/note";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "modules/auth/signup";
import Login from "modules/auth/login";
import Chats from "modules/chats/chats";
import Workspaces from "modules/workspaces/workspaces";
import Config from "modules/config/config";

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<div className="App">
					<Routes>
						<Route path="/" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/notes" element={<Notes />} />
						<Route path="/chats" element={<Chats />} />
						<Route path="/workspaces" element={<Workspaces />} />
						<Route path="/preferences" element={<Config />} />
						<Route path="/admin" element={<Admin />} />
					</Routes>
				</div>
			</Provider>
		</BrowserRouter>
	);
}

export default App;

import React from "react";
import "./App.css";
import "@fontsource/poppins";
import Notes from "./modules/note/note";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
					</Routes>
				</div>
			</Provider>
		</BrowserRouter>
	);
}

export default App;

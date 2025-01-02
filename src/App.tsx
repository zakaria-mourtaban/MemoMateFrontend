import React from "react";
import "./App.css";
import "@fontsource/poppins";
import Note from "./modules/note/note";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store/store";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Note />
			</div>
		</Provider>
	);
}

export default App;

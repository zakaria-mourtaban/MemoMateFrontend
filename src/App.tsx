import React from 'react';
import './App.css';
import "@fontsource/poppins"; 
import Note from "./modules/note/note";
import Excalidraw from "./modules/note/excalidraw/Excalidraw"
import { Provider } from 'react-redux'; // Import Provider from react-redux

function App() {
  return (
      <div className="App">
        <Note />
      </div>
  );
}

export default App;

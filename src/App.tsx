import React from 'react';
import './App.css';
import Note from "./modules/note";
import Excalidraw from "./modules/note/excalidraw/Excalidraw"
import { Provider } from 'react-redux'; // Import Provider from react-redux

function App() {
  return (
      <div className="App">
        <Excalidraw />
      </div>
  );
}

export default App;

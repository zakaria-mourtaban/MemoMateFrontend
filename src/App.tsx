import React from 'react';
import './App.css';
import Note from "./modules/note/components/note/index.tsx";
import { Provider } from 'react-redux'; // Import Provider from react-redux

function App() {
  return (
      <div className="App">
        <Note />
      </div>
  );
}

export default App;

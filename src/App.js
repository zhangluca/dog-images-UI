import React from 'react';
import './App.css';
import DogImageGenerator from './DogImageGenerator';
import ChatHistory from './ChatHistory';

function App() {
  return (
    <div className="App">
      <DogImageGenerator />
      <ChatHistory />
    </div>
  );
}

export default App;

import React from 'react';
import Marketplace from './Marketplace';
import Predict from './Predict';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* This could be your navigation or header */}
      <header className="py-4 px-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Farming AI Predictor</h1>
      </header>
      
      {/* This is the main content area */}
      <main className="p-6">
        {/* You can choose which component to render */}
        <Marketplace />
        {/* Or render the Predict component */}
        {/* <Predict /> */}
      </main>
    </div>
  );
};

export default App;
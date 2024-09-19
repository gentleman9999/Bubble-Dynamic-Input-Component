import React from 'react';
import DynamicInput from './DynamicInput';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full min-h-128">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Dynamic Input Component</h1>
        <p className="text-center text-gray-600 mb-4">
          Add and manage your inputs with the dynamic input component.
        </p>
        <DynamicInput />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const RandomNumberApp = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const fetchRandomNumber = async () => {
    setIsLoading(true);
    setShowNumber(false);
    try {
      const response = await fetch('http://localhost:3000/random', {
        method: 'POST',
      });
      const data = await response.json();
      setRandomNumber(data.value);
      setTimeout(() => {
        setIsLoading(false);
        setShowNumber(true);
      }, 1500); // Simula un poco de tiempo de carga
    } catch (error) {
      console.error('Error fetching random number:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showNumber) {
      const timer = setTimeout(() => {
        setShowNumber(false);
      }, 5000); // Oculta el número después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [showNumber]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-bold mb-8 text-white shadow-lg">Generador de Números Aleatorios</h1>
      <button 
        onClick={fetchRandomNumber}
        className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-110"
        disabled={isLoading}
      >
        {isLoading ? 'Generando...' : 'Obtener Número Aleatorio'}
      </button>
      {isLoading && (
        <div className="mt-8 w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      )}
      {showNumber && (
        <div className="mt-8 relative">
          <div className="absolute inset-0 bg-white opacity-25 rounded-lg blur"></div>
          <div className="relative bg-white bg-opacity-75 rounded-lg p-8 shadow-2xl transform transition duration-500 ease-in-out hover:scale-110">
            <p className="text-6xl font-bold text-gray-800 animate-pulse">
              {randomNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomNumberApp;
import React, { useState } from 'react';
import { regresionLineal, predecirAlquiler, rangoPredicciones } from '../utils/regresion';

const Prediction = ({ propiedades }) => {
  const [m2Input, setM2Input] = useState('');
  const [prediccion, setPrediccion] = useState(null);
  
  const { a, b, r2, error } = regresionLineal(propiedades);
  const rango = !error ? rangoPredicciones(propiedades, a, b) : null;
  
  const handlePredecir = () => {
    const m2 = parseFloat(m2Input);
    if (isNaN(m2) || m2 <= 0) {
      setPrediccion('Ingresá un número válido');
      return;
    }
    const pred = predecirAlquiler(m2, a, b);
    setPrediccion(`S/ ${pred}`);
  };
  
  if (error) {
    return (
      <div className="prediction-card">
        <h3>🔮 Predicción de alquiler</h3>
        <p className="error">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="prediction-card">
      <h3>🔮 Predicción de alquiler por metro cuadrado</h3>
      
      <div className="regression-info">
        <p><strong>Modelo:</strong> Alquiler = {a.toFixed(0)} + {b.toFixed(2)} × m²</p>
        <p><strong>Precisión del modelo (R²):</strong> {(r2 * 100).toFixed(1)}%</p>
        <p className="r2-note">
          {r2 > 0.7 ? '✅ Modelo confiable' : r2 > 0.4 ? '⚠️ Modelo aceptable' : '📉 Modelo con margen de mejora'}
        </p>
      </div>
      
      <div className="prediction-input">
        <label>Metros cuadrados:</label>
        <div className="input-group">
          <input 
            type="number" 
            value={m2Input} 
            onChange={(e) => setM2Input(e.target.value)}
            placeholder="Ej: 85"
          />
          <button onClick={handlePredecir}>Predecir alquiler</button>
        </div>
        {prediccion && (
          <div className="prediccion-resultado">
            <strong>Predicción:</strong> {prediccion}
          </div>
        )}
      </div>
      
      <div className="prediction-range">
        <p><strong>📐 Rango de predicción:</strong></p>
        <ul>
          <li>{rango.min.m2} m² → S/ {rango.min.prediccion}</li>
          <li>{rango.medio.m2.toFixed(0)} m² → S/ {rango.medio.prediccion}</li>
          <li>{rango.max.m2} m² → S/ {rango.max.prediccion}</li>
        </ul>
        <p className="note">*Basado en los datos actuales</p>
      </div>
    </div>
  );
};

export default Prediction;
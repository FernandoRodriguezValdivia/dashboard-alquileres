// Regresión lineal simple: y = a + b*x
// donde y = alquiler (variable a predecir), x = m2 (variable independiente)

export function regresionLineal(propiedades) {
  const n = propiedades.length;
  
  if (n < 2) {
    return { a: 0, b: 0, error: "Se necesitan al menos 2 propiedades para calcular regresión" };
  }
  
  // Sumatorias
  const sumX = propiedades.reduce((s, p) => s + p.m2, 0);
  const sumY = propiedades.reduce((s, p) => s + p.alquiler, 0);
  const sumXY = propiedades.reduce((s, p) => s + (p.m2 * p.alquiler), 0);
  const sumX2 = propiedades.reduce((s, p) => s + (p.m2 * p.m2), 0);
  
  // Cálculo de pendiente (b) e intercepto (a)
  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const a = (sumY - b * sumX) / n;
  
  // Calcular R² (bondad del ajuste)
  const yMean = sumY / n;
  const ssRes = propiedades.reduce((sum, p) => sum + Math.pow(p.alquiler - (a + b * p.m2), 2), 0);
  const ssTot = propiedades.reduce((sum, p) => sum + Math.pow(p.alquiler - yMean, 2), 0);
  const r2 = 1 - (ssRes / ssTot);
  
  return { a, b, r2: r2.toFixed(4), error: null };
}

export function predecirAlquiler(m2, a, b) {
  return (a + b * m2).toFixed(0);
}

// Predecir para un rango de metros cuadrados (útil para mostrar tendencia)
export function rangoPredicciones(propiedades, a, b) {
  const m2s = propiedades.map(p => p.m2);
  const minM2 = Math.min(...m2s);
  const maxM2 = Math.max(...m2s);
  
  return {
    min: { m2: minM2, prediccion: predecirAlquiler(minM2, a, b) },
    max: { m2: maxM2, prediccion: predecirAlquiler(maxM2, a, b) },
    medio: { m2: (minM2 + maxM2) / 2, prediccion: predecirAlquiler((minM2 + maxM2) / 2, a, b) }
  };
}
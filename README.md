# Dashboard de Análisis de Alquileres

## 🎯 ¿Qué hace?
Visualiza datos de propiedades en alquiler y calcula métricas clave:
- Alquiler promedio
- Precio por metro cuadrado promedio
- Propiedad más rentable (mejor relación precio/m²)
- Tasa de ocupación
- Distribución por rangos de precio

## 🛠️ Stack
- ReactJS
- JavaScript (cálculos matemáticos puros)
- CSS moderno (Grid, Flexbox, gradientes)

## 🧠 Métricas Analíticas
Implementé **5 métricas analíticas**:
1. Promedio ponderado de alquiler
2. Ratio precio/metro cuadrado para detectar mejor oferta
3. Porcentaje de ocupación como indicador de demanda
4. Distribución de frecuencias para rangos de precio
5. Comparativa de rentabilidad entre propiedades

## 📊 Decisión técnica destacada
Separé toda la lógica matemática en `calculos.js` para que sea testeable e independiente de la UI. Las mismas funciones podrían reutilizarse en backend Node.js.

## 🔗 Demo


## 🚀 Cómo correrlo local
```bash
npm install
npm run dev
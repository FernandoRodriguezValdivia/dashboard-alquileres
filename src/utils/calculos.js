// 1. Alquiler promedio
export function promedioAlquiler(propiedades) {
  const total = propiedades.reduce((sum, p) => sum + p.alquiler, 0);
  return (total / propiedades.length).toFixed(2);
}

// 2. Precio por metro cuadrado promedio
export function precioPromedioPorM2(propiedades) {
  const totalRatio = propiedades.reduce((sum, p) => sum + (p.alquiler / p.m2), 0);
  return (totalRatio / propiedades.length).toFixed(2);
}

// 3. Propiedad más rentable (menor S/m2)
export function propiedadMasRentable(propiedades) {
  return propiedades.reduce((mejor, actual) => {
    const ratioMejor = mejor.alquiler / mejor.m2;
    const ratioActual = actual.alquiler / actual.m2;
    return ratioActual < ratioMejor ? actual : mejor;
  });
}

// 4. Tasa de ocupación
export function tasaOcupacion(propiedades) {
  const alquiladas = propiedades.filter(p => p.estado === 'alquilado').length;
  return ((alquiladas / propiedades.length) * 100).toFixed(1);
}

// 5. Distribución por rango de precios (bonus)
export function distribucionPrecios(propiedades) {
  const rangos = {
    "menor a 1000": 0,
    "1000 - 1500": 0,
    "1501 - 2000": 0,
    "mayor a 2000": 0
  };
  
  propiedades.forEach(p => {
    if (p.alquiler < 1000) rangos["menor a 1000"]++;
    else if (p.alquiler <= 1500) rangos["1000 - 1500"]++;
    else if (p.alquiler <= 2000) rangos["1501 - 2000"]++;
    else rangos["mayor a 2000"]++;
  });
  
  return rangos;
}
import React, { useState } from 'react';
import { 
  promedioAlquiler, 
  precioPromedioPorM2, 
  propiedadMasRentable, 
  tasaOcupacion,
  distribucionPrecios 
} from '../utils/calculos';
import propiedadesData from '../data/propiedades.json';
import Card from './Card';
import Bar from './Bar';
import Filters from './Filters';

const Dashboard = () => {
  const [filtro, setFiltro] = useState('todos');
  
  const todasPropiedades = propiedadesData.propiedades;
  
  const propiedades = filtro === 'todos' 
    ? todasPropiedades 
    : todasPropiedades.filter(p => p.estado === filtro);
  
  if (propiedades.length === 0) {
    return (
      <div className="dashboard">
        <h1>📊 Dashboard de Análisis de Alquileres</h1>
        <Filters filtro={filtro} setFiltro={setFiltro} todasPropiedades={todasPropiedades} />
        <p className="sin-resultados">No hay propiedades en esta categoría.</p>
      </div>
    );
  }
  
  const promedio = promedioAlquiler(propiedades);
  const precioM2 = precioPromedioPorM2(propiedades);
  const masRentable = propiedadMasRentable(propiedades);
  const ocupacion = tasaOcupacion(propiedades);
  const distribucion = distribucionPrecios(propiedades);

  return (
    <div className="dashboard">
      <h1>📊 Dashboard de Análisis de Alquileres</h1>

      <Filters filtro={filtro} setFiltro={setFiltro} todasPropiedades={todasPropiedades} />
      
      <div className="stats-grid">
        <Card 
          title="💰 Alquiler promedio" 
          value={`S/ ${promedio}`}
        />
        <Card
          title="📐 Precio por m² promedio"
          value={`S/ ${precioM2} /m²`}
        />
        <Card
          title="🏆 Más rentable (S/m²)"
          value={masRentable.nombre}
          detail={`S/ ${(masRentable.alquiler / masRentable.m2).toFixed(2)}/m²`}
        />
        <Card
          title="📈 Ocupación"
          value={`${ocupacion}%`}
        />
      </div>
      
      <div className="distribucion">
        <h3>📊 Distribución por rango de precios</h3>
        <div className="rangos">
          {Object.entries(distribucion).map(([rango, cantidad]) => (
            <div key={rango} className="rango">
              <span>{rango}</span>
              <Bar length={propiedades.length} value={cantidad} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer-mate">
        🧠 Aplicación de: promedios, ratios, porcentajes y distribución de frecuencias
      </div>
    </div>
  );
};

export default Dashboard;
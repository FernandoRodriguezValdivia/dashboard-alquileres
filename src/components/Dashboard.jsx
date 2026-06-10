import { useState } from 'react';
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
import Chart from './Chart';
import Prediction from './Prediction';

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

      <Chart distribucion={distribucion} propiedadesLength={propiedades.length} />

      <Prediction propiedades={propiedades} />

      <div className="footer-mate">
        🧠 Aplicación de: promedios, ratios, porcentajes y distribución de frecuencias
        <div className="project-footer">
          <div className="footer-content">
            <a
              href="https://github.com/FernandoRodriguezValdivia/dashboard-alquileres"
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.75 7.8 6.56 9.07.48.09.66-.21.66-.46 0-.23-.01-.84-.01-1.65-2.67.58-3.23-1.28-3.23-1.28-.44-1.11-1.07-1.41-1.07-1.41-.87-.6.07-.58.07-.58.96.07 1.47.98 1.47.98.85 1.45 2.23 1.03 2.77.79.09-.61.33-1.03.6-1.27-2.11-.24-4.33-1.06-4.33-4.71 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.98.76-.21 1.58-.32 2.4-.32.82 0 1.64.11 2.4.32 1.82-1.24 2.62-.98 2.62-.98.52 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.66-2.22 4.47-4.33 4.71.34.29.64.86.64 1.73 0 1.25-.01 2.26-.01 2.57 0 .26.18.56.66.46C19.25 19.8 22 16.23 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
              Ver código en GitHub
            </a>
            <p className="footer-note">Desarrollado por Fernando Rodriguez</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
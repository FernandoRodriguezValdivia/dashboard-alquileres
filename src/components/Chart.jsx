import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Chart = ({ distribucion, propiedadesLength }) => {
  const data = Object.entries(distribucion).map(([rango, cantidad]) => ({
    rango,
    cantidad,
    porcentaje: ((cantidad / propiedadesLength) * 100).toFixed(1)
  }));

  return (
    <div className="recharts-container">
      <h3>📊 Distribución de precios (vista gráfica)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rango" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => {
            if (name === 'cantidad') return [`${value} propiedades`, 'Cantidad'];
            return [value, name];
          }} />
          <Bar dataKey="cantidad" fill="#667eea" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">Cada barra muestra cuántas propiedades están en ese rango de precio</p>
    </div>
  );
};

export default Chart;
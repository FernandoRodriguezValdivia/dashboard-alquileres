const Filters = ({ filtro, setFiltro, todasPropiedades }) => {
  return (
    <div className="filtros">
        <button
            onClick={() => setFiltro('todos')}
            className={filtro === 'todos' ? 'activo' : ''}
        >
            Todos ({todasPropiedades.length})   
        </button>
        <button
            onClick={() => setFiltro('alquilado')}
            className={filtro === 'alquilado' ? 'activo' : ''}
        >
            Alquilados ({todasPropiedades.filter(p => p.estado === 'alquilado').length})
        </button>
        <button
            onClick={() => setFiltro('libre')}
            className={filtro === 'libre' ? 'activo' : ''}
        >
            Libres ({todasPropiedades.filter(p => p.estado === 'libre').length})
        </button>
    </div>
  );
}

export default Filters;
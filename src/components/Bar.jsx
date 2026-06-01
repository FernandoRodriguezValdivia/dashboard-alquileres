const Bar = ({ length, value }) => {
  return (
    <div className="barra-container">
        <div className="barra" style={{ width: `${(value / length) * 100}%` }}>
            {value}
        </div>
    </div>
  );
}

export default Bar;
const Card = ({ title, value, detalle }) => {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p className="valor">{value}</p>
        {detalle && <p className="detalle">{detalle}</p>}
    </div>
  );
}

export default Card;
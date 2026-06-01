const Card = ({ title, value, detail }) => {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p className="valor">{value}</p>
        {detail && <p className="detalle">{detail}</p>}
    </div>
  );
}

export default Card;
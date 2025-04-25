const CardItem = ({ card }) => {
    return (
        <div className="card bg-base-100 shadow-md">
            <div className="card-body">
                <h2 className="card-title">
                    {card.cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                </h2>
                <p>Expires: {card.expiryDate}</p>
                <p>Type: {card.cardType}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-error">Block</button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
import CardItem from './CardItem';

const CardList = ({ cards }) => {
    if (cards.length === 0) {
        return (
            <div className="alert alert-info">
                No cards found for this account. Add your first card.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map(card => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
};

export default CardList;
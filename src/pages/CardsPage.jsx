import { useState, useEffect } from 'react';
import { CardService } from '../services/cardService';
import CardList from '../components/card/CardList';
import CardForm from '../components/card/CardItem';
import useAuthStore from '../store/authStore';

const CardsPage = () => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        const loadCards = async () => {
            try {
                const data = await CardService.getByUser(user.userID);
                setCards(data);
            } catch (error) {
                console.error('Failed to load cards:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCards();
    }, [user.userID]);

    const handleCardAdded = (newCard) => {
        setCards([...cards, newCard]);
    };

    const handleCardDeleted = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
    };

    if (isLoading) {
        return <div>Loading cards...</div>;
    }

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Cards</h1>
                <CardForm onCardAdded={handleCardAdded} userId={user.userID} />
            </div>

            <CardList
                cards={cards}
                onCardDeleted={handleCardDeleted}
            />
        </div>
    );
};

export default CardsPage;
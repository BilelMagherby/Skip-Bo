import React from 'react';

const Section = ({ title, children }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>{title}</h2>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--color-dark)' }}>
            {children}
        </div>
    </div>
);

const Rules = () => {
    return (
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 2rem', background: 'white', marginTop: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>How to Play Skip-Bo</h1>

            <Section title="Objective">
                <p>The goal is to be the first player to play all the cards from your stockpile in numerical order (1-12).</p>
            </Section>

            <Section title="Setup">
                <ul>
                    <li>Each player is dealt a stockpile of 30 cards (face down), with the top card turned face up.</li>
                    <li>The remaining cards form a Draw Pile.</li>
                    <li>Players also have space for 4 discard piles.</li>
                    <li>In the center, there are 4 Building Piles which must be started with a 1 or a Skip-Bo card.</li>
                </ul>
            </Section>

            <Section title="Gameplay Turn">
                <ol style={{ paddingLeft: '20px' }}>
                    <li><strong>Draw:</strong> At the start of your turn, draw cards from the Draw Pile until you have 5 cards in your hand.</li>
                    <li><strong>Play:</strong> You can play cards from your hand, your stockpile, or your discard piles onto the Building Piles.
                        <ul>
                            <li>Building piles must be built sequentially from 1 to 12.</li>
                            <li>A Skip-Bo card is wild and can be played as any number.</li>
                            <li>If you play a 12, the pile is cleared and shuffled back into the deck.</li>
                        </ul>
                    </li>
                    <li><strong>Discard:</strong> If you cannot or do not want to play any more cards, you must discard one card from your hand into one of your 4 discard piles to end your turn.</li>
                </ol>
            </Section>

            <Section title="Winning">
                <p>The first player to play the last card from their stockpile wins the game!</p>
            </Section>
        </div>
    );
};

export default Rules;

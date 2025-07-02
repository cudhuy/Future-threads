import styles from './cardsDeck.module.css';

export default function CardsDeck({ cards, onCardClick, selectedCardId }) {
	return (
		<div className={styles.cardsDeckContainer}>
			<div className={styles.cardsDeck}>
				{cards.map((card) => {
					const isSelected = selectedCardId === card.id;
					const isFaded = selectedCardId && selectedCardId !== card.id;

					return (
						<div
							key={card.id}
							className={`${styles.card} ${isSelected ? styles.selected : ''} ${
								isFaded ? styles.fadeOut : ''
							}`}
							onClick={() => onCardClick(card)}
						>
							<h3>{card.title}</h3>
							<p>{card.description}</p>
							<div className={styles.cardEffects}>
								{Object.entries(card.effects).map(([stat, value]) => (
									<span
										key={stat}
										className={`${styles.effect} ${
											value > 0 ? styles.positive : styles.negative
										}`}
									>
										{stat}: {value > 0 ? `+${value}` : value}
									</span>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

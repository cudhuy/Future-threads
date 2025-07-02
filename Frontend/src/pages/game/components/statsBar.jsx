import styles from './statsBar.module.css';

const statIcons = {
	military: '⚔️',
	politics: '🏛️',
	environment: '🌱',
	qualityOfLife: '🏠',
	economy: '💰',
};

export default function StatsBar({ stats }) {
	const statColors = {
		military: '#ff6b6b',
		politics: '#70a1ff',
		environment: '#51cf66',
		qualityOfLife: '#fcc419',
		economy: '#9c88ff',
	};
	return (
		<div className={styles.statsBar}>
			{Object.entries(stats).map(([stat, value]) => (
				<div key={stat} className={styles.statItem} data-stat={stat}>
					<div className={styles.statHeader}>
						<span className={styles.statIcon}>{statIcons[stat]}</span>
						<span className={styles.statLabel}>{stat.toUpperCase()}</span>
					</div>
					<div className={styles.statBarContainer}>
						<div
							className={styles.statBar}
							style={{ width: `${value}%`, backgroundColor: statColors[stat] }}
						/>
					</div>
					<span className={styles.statValue}>{value}/100</span>
				</div>
			))}
		</div>
	);
}

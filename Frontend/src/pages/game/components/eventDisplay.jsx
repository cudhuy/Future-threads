import styles from './eventDisplay.module.css';

export default function EventDisplay({ text }) {
	return (
		<div className={styles.eventDisplay}>
			<div className={styles.eventText}>{text}</div>
		</div>
	);
}

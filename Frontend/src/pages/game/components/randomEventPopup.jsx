import styles from './randomEventPopup.module.css';

export default function RandomEventPopup({ event, onClose }) {
	return (
		<div className={styles.popupOverlay}>
			<div className={styles.popupContent}>
				<p>{event}</p>
				<button onClick={onClose}>Continue</button>
			</div>
		</div>
	);
}

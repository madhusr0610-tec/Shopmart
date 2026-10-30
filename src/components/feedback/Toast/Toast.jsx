
import { useEffect } from 'react';
import styles from './Toast.module.css';

function Toast({ message, onClose }) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(onClose, 3000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={styles.toast} role="status">
            <div className={styles.icon}>✓</div>

            <div className={styles.content}>
                <strong className={styles.title}>Success</strong>
                <p className={styles.message}>{message}</p>
            </div>

            <button
                className={styles.close}
                onClick={onClose}
                aria-label="Close notification"
                type="button"
            >
                ×
            </button>

            <div className={styles.progress} />
        </div>
    );
}

export default Toast;
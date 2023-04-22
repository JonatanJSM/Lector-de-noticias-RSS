import styles from "../styles/aAlertSED.module.css";
import React, { useState } from 'react';
interface ModalProps {
  onClose: () => void;
  action: boolean;
  aviso: string;
}
const AlertSED: React.FC<ModalProps> = ({ onClose, action, aviso }) => {
  const [visible, setVisible] = useState(true);
  function handleClose() {
    setVisible(false);
    onClose();
  }
  return visible ? (
    <div className={action?styles.contenedorPrincipal:styles.precaucion}>
      <div className={styles.mensajeAlert}>
        {aviso}
      </div>
      <button onClick={handleClose} className={styles.boton}>X</button>
    </div>
  ) : null;
};export default AlertSED;
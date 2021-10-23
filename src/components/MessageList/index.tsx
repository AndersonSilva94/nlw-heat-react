import styles from './styles.module.scss';
import logoImage from '../../assets/logo.svg';

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="Do/While 2021" />
      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/AndersonSilva94.png" alt="Anderson Silva" />
            </div>
            <span>Andy Silva</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/AndersonSilva94.png" alt="Anderson Silva" />
            </div>
            <span>Andy Silva</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/AndersonSilva94.png" alt="Anderson Silva" />
            </div>
            <span>Andy Silva</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
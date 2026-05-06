import clsx from 'clsx'
import styles from './FaqSection.module.css'

interface FaqItemProps {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}

export function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div className={clsx(styles.faqItem, { [styles.open]: open })}>
      <button type="button" className={styles.faqQuestion} onClick={onToggle}>
        {question} <span className={styles.faqIcon}>+</span>
      </button>
      <div className={styles.faqAnswer} dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  )
}

import { useState } from 'react'
import { useFaqs } from '../hooks'
import { FaqItem } from './FaqItem'
import { Reveal } from './Reveal'
import styles from './FaqSection.module.css'

export function FaqSection() {
  const { faqs } = useFaqs()
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className={styles.faqSection}>
      <div className={styles.faqInner}>
        <Reveal>
          <h2>
            Frequently <em>Asked</em>
          </h2>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <FaqItem
                key={f.id}
                question={f.question}
                answer={f.answer}
                open={openId === f.id}
                onToggle={() => toggle(f.id)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

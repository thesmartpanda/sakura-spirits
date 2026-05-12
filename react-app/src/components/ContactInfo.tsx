import { Reveal } from './Reveal'
import { InfoBlock } from './InfoBlock'
import styles from './ContactInfo.module.css'

export function ContactInfo() {
  return (
    <Reveal>
      <InfoBlock label="Email Us">
        <p className={styles.infoValue}>
          <a href="mailto:hello@sakura-spirits.com" className={styles.infoLink}>
            hello@sakura-spirits.com
          </a>
        </p>
        <p className={styles.infoSub}>We reply to all enquiries within one working day.</p>
      </InfoBlock>

      <InfoBlock label="Call Us">
        <p className={styles.infoValue}>+44 (0)20 7946 0312</p>
        <p className={styles.infoSub}>Available Monday – Friday, 9am–6pm GMT.</p>
      </InfoBlock>

      <InfoBlock label="Opening Hours">
        <table className={styles.hoursTable}>
          <tbody>
            <tr>
              <td>Monday – Friday</td>
              <td>9:00 – 18:00</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>10:00 – 17:00</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>Closed</td>
            </tr>
            <tr>
              <td>UK Bank Holidays</td>
              <td>Closed</td>
            </tr>
          </tbody>
        </table>
      </InfoBlock>

      <InfoBlock label="Visit Us">
        <p className={styles.infoValue}>
          12 Artisan Quarter
          <br />
          Bermondsey, London SE1 3QW
        </p>
        <p className={styles.infoSub}>
          Our tasting room is open by appointment. Please{' '}
          <a href="mailto:hello@sakura-spirits.com" className={styles.infoLink}>
            email us
          </a>{' '}
          to arrange a visit.
        </p>
      </InfoBlock>
    </Reveal>
  )
}

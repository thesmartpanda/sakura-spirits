import { Hero } from '../components/Hero'
import { FeaturedSection } from '../components/FeaturedSection'
import { PhilosophyBand } from '../components/PhilosophyBand'
import { RegionsSection } from '../components/RegionsSection'
// import { NewsletterSection } from '../components/NewsletterSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <PhilosophyBand />
      <RegionsSection />
      {/* <NewsletterSection /> */}
    </>
  )
}

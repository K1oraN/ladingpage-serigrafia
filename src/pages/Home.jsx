import { useEffect, useState } from 'react'
import { About } from '../components/About.jsx'
import { ContactCTA } from '../components/ContactCTA.jsx'
import { Footer } from '../components/Footer.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Header } from '../components/Header.jsx'
import { Hero } from '../components/Hero.jsx'
import { Services } from '../components/Services.jsx'
import { Testimonials } from '../components/Testimonials.jsx'
import { WhyChooseUs } from '../components/WhyChooseUs.jsx'
import { SITE_CONFIG_UPDATED_EVENT, buildWhatsAppLink, getSiteConfig } from '../utils/storage.js'

export function Home() {
  const [config, setConfig] = useState(() => getSiteConfig())
  const whatsappLink = buildWhatsAppLink(config.whatsapp)
  const themeStyle = {
    '--color-primary': config.colors.primary,
    '--color-secondary': config.colors.secondary,
  }

  useEffect(() => {
    const refreshConfig = () => setConfig(getSiteConfig())

    window.addEventListener('storage', refreshConfig)
    window.addEventListener(SITE_CONFIG_UPDATED_EVENT, refreshConfig)

    return () => {
      window.removeEventListener('storage', refreshConfig)
      window.removeEventListener(SITE_CONFIG_UPDATED_EVENT, refreshConfig)
    }
  }, [])

  return (
    <div className="home-page" style={themeStyle}>
      <Header companyName={config.companyName} whatsappLink={whatsappLink} />
      <main>
        <Hero config={config} whatsappLink={whatsappLink} />
        <About about={config.about} />
        <Services services={config.services} />
        <Gallery gallery={config.gallery} />
        <WhyChooseUs items={config.whyChooseUs} />
        <Testimonials testimonials={config.testimonials} />
        <ContactCTA
          contact={config.contact}
          buttonText={config.buttonText}
          whatsappLink={whatsappLink}
        />
      </main>
      <Footer companyName={config.companyName} whatsappLink={whatsappLink} />
    </div>
  )
}

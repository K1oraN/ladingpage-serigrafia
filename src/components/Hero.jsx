export function Hero({ config, whatsappLink }) {
  const heroImageUrl =
    config.heroImageUrl ||
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=80'
  const heroStyle = {
    backgroundImage: `linear-gradient(110deg, rgba(5, 24, 35, 0.94), rgba(5, 24, 35, 0.74), rgba(5, 24, 35, 0.24)), url(${heroImageUrl})`,
  }

  return (
    <section className="hero-section" id="inicio" style={heroStyle}>
      <div className="hero-content">
        <span className="eyebrow">Serigrafia, brindes e gráfica rápida</span>
        <h1>{config.mainTitle}</h1>
        <p>{config.mainText}</p>
        <div className="hero-actions">
          <a className="primary-button" href={whatsappLink} target="_blank" rel="noreferrer">
            {config.buttonText}
          </a>
          <a className="secondary-button" href="#servicos">
            Ver serviços
          </a>
        </div>
      </div>

      <div className="hero-proof" aria-label="Destaques da produção">
        <div>
          <strong>Estampas duráveis</strong>
          <span>Cores firmes em camisetas, uniformes e brindes.</span>
        </div>
        <div>
          <strong>Identidade completa</strong>
          <span>Da peça impressa ao material promocional da marca.</span>
        </div>
        <div>
          <strong>Orçamento sob medida</strong>
          <span>Atendimento direto para empresas, eventos e projetos.</span>
        </div>
      </div>
    </section>
  )
}

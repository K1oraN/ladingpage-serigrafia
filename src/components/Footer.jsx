import { Link } from 'react-router-dom'

export function Footer({ companyName, whatsappLink }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>{companyName}</strong>
        <p>Serigrafia, brindes e materiais gráficos personalizados.</p>
      </div>
      <div className="footer-links">
        <a href={whatsappLink} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href="#inicio">Topo</a>
        <Link to="/admin">Painel admin</Link>
      </div>
    </footer>
  )
}

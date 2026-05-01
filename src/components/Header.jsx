import { Link } from 'react-router-dom'

const navItems = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#depoimentos', label: 'Depoimentos' },
]

const getCompanyInitials = (companyName) => {
  const words = (companyName || '').split(' ').filter(Boolean)
  const firstWord = words[0] || ''
  const camelCaseInitial = firstWord.slice(1).match(/[A-ZÀ-Ý]/)?.[0]

  if (firstWord && camelCaseInitial) {
    return `${firstWord[0]}${camelCaseInitial}`.toUpperCase()
  }

  const initials = words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return initials || 'PM'
}

export function Header({ companyName, whatsappLink }) {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Voltar ao início">
        <span className="brand-mark">{getCompanyInitials(companyName)}</span>
        <span>{companyName}</span>
      </a>

      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="header-quote" href={whatsappLink} target="_blank" rel="noreferrer">
          Orçamento
        </a>
        <Link className="admin-shortcut" to="/admin">
          Admin
        </Link>
      </div>
    </header>
  )
}

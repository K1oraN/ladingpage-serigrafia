import { Link } from 'react-router-dom'

const menuItems = [
  { href: '#conteudo', label: 'Conteúdo' },
  { href: '#cores', label: 'Cores' },
  { href: '#sobre-admin', label: 'Sobre' },
  { href: '#servicos-admin', label: 'Serviços' },
  { href: '#diferenciais-admin', label: 'Diferenciais' },
  { href: '#galeria-admin', label: 'Galeria' },
  { href: '#depoimentos-admin', label: 'Depoimentos' },
]

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <span>PM</span>
        <strong>Painel PrintMaster</strong>
      </div>

      <nav aria-label="Menu do painel administrativo">
        {menuItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Link className="back-home" to="/">
        Ver landing page
      </Link>
    </aside>
  )
}

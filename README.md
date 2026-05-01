# PrintMaster Personalizados

Landing page moderna em React + Vite para uma empresa de serigrafia e gráfica personalizada. O projeto tem uma página pública comercial e um painel administrativo simples para editar conteúdo, cores, imagens por URL e listas do site.

## Tecnologias

- React
- Vite
- React Router DOM
- CSS puro
- LocalStorage para persistir as alterações do painel admin

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Com a configuração padrão do Vite, o site abre em:

```text
http://localhost:5173/
```

Gere a versão de produção:

```bash
npm run build
```

Pré-visualize a versão gerada:

```bash
npm run preview
```

## Rotas

- `/`: landing page pública.
- `/admin`: painel administrativo.

## Painel administrativo

Acesse `http://localhost:5173/admin` com o servidor rodando.

O painel permite editar:

- Nome da empresa.
- Título principal.
- Texto principal.
- Texto do botão.
- Número ou link do WhatsApp.
- Cor principal.
- Cor secundária.
- Texto da seção Sobre.
- Lista de serviços.
- Diferenciais da seção “Por que escolher a gente”.
- Imagens da galeria usando URL.
- Depoimentos.
- Chamada final de contato.

Ao clicar em **Salvar alterações**, os dados são gravados no `localStorage` do navegador. A landing page lê esses dados automaticamente. Se não existir nenhuma configuração salva, o site usa os dados de `src/data/defaultSiteConfig.js`.

O botão **Restaurar padrão** limpa o `localStorage` e volta para o conteúdo inicial.

## Estrutura

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Gallery.jsx
│   ├── WhyChooseUs.jsx
│   ├── Testimonials.jsx
│   ├── ContactCTA.jsx
│   ├── Footer.jsx
│   └── AdminSidebar.jsx
├── pages/
│   ├── Home.jsx
│   └── Admin.jsx
├── data/
│   └── defaultSiteConfig.js
├── styles/
│   ├── global.css
│   ├── home.css
│   └── admin.css
├── utils/
│   └── storage.js
├── App.jsx
└── main.jsx
```

## Arquivos principais

- `src/App.jsx`: configura as rotas com React Router DOM.
- `src/pages/Home.jsx`: monta a landing page pública usando as configurações salvas.
- `src/pages/Admin.jsx`: painel administrativo com formulário de edição.
- `src/data/defaultSiteConfig.js`: conteúdo padrão do site.
- `src/utils/storage.js`: funções para buscar, salvar e restaurar dados no `localStorage`.
- `src/styles/home.css`: visual responsivo da landing page.
- `src/styles/admin.css`: visual responsivo do painel admin.

## Observações

- Não há login nesta etapa.
- Não há banco de dados nesta etapa.
- Não há upload real de imagens nesta etapa.
- As imagens da galeria e do topo são cadastradas por URL.

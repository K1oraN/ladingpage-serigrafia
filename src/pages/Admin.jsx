import { useEffect, useState } from 'react'
import { AdminSidebar } from '../components/AdminSidebar.jsx'
import { getSiteConfig, resetSiteConfig, saveSiteConfig } from '../utils/storage.js'

const emptyGalleryItem = {
  title: 'Novo trabalho',
  imageUrl: '',
  description: 'Descrição do trabalho personalizado.',
}

const emptyTestimonial = {
  name: 'Nome do cliente',
  role: 'Cargo ou empresa',
  text: 'Depoimento do cliente sobre o atendimento e a qualidade do trabalho.',
}

const emptyWhyChooseUs = {
  title: 'Novo diferencial',
  text: 'Descreva um ponto forte do atendimento, da produção ou da entrega.',
}

const galleryPreviewFallback =
  'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80'

const handleGalleryPreviewError = (event) => {
  if (!event.currentTarget.dataset.fallbackApplied) {
    event.currentTarget.dataset.fallbackApplied = 'true'
    event.currentTarget.src = galleryPreviewFallback
  }
}

export function Admin() {
  const [config, setConfig] = useState(() => getSiteConfig())
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!successMessage) {
      return undefined
    }

    const timer = window.setTimeout(() => setSuccessMessage(''), 3000)
    return () => window.clearTimeout(timer)
  }, [successMessage])

  const updateField = (field, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [field]: value,
    }))
  }

  const updateNestedField = (section, field, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [section]: {
        ...currentConfig[section],
        [field]: value,
      },
    }))
  }

  const updateListItem = (listName, index, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [listName]: currentConfig[listName].map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }))
  }

  const updateObjectListItem = (listName, index, field, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [listName]: currentConfig[listName].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const addListItem = (listName, item) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [listName]: [...currentConfig[listName], item],
    }))
  }

  const removeListItem = (listName, index) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [listName]: currentConfig[listName].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    const savedConfig = saveSiteConfig(config)
    setConfig(savedConfig)
    setSuccessMessage('Alterações salvas com sucesso.')
  }

  const handleReset = () => {
    const defaultConfig = resetSiteConfig()
    setConfig(defaultConfig)
    setSuccessMessage('Configurações restauradas para o padrão.')
  }

  return (
    <div className="admin-page">
      <AdminSidebar />

      <main className="admin-content">
        <div className="admin-topbar">
          <div>
            <span>Painel administrativo</span>
            <h1>Editar landing page</h1>
          </div>
          {successMessage && (
            <p className="success-message" role="status" aria-live="polite">
              {successMessage}
            </p>
          )}
        </div>

        <form className="admin-form" onSubmit={handleSave}>
          <section className="admin-section" id="conteudo">
            <div className="admin-section-title">
              <span>01</span>
              <div>
                <h2>Conteúdo principal</h2>
                <p>Textos exibidos no topo da landing page.</p>
              </div>
            </div>

            <div className="form-grid">
              <label>
                Nome da empresa
                <input
                  value={config.companyName}
                  onChange={(event) => updateField('companyName', event.target.value)}
                />
              </label>

              <label>
                Texto do botão
                <input
                  value={config.buttonText}
                  onChange={(event) => updateField('buttonText', event.target.value)}
                />
              </label>

              <label className="full-field">
                Título principal
                <input
                  value={config.mainTitle}
                  onChange={(event) => updateField('mainTitle', event.target.value)}
                />
              </label>

              <label className="full-field">
                Texto principal
                <textarea
                  rows="4"
                  value={config.mainText}
                  onChange={(event) => updateField('mainText', event.target.value)}
                />
              </label>

              <label>
                WhatsApp
                <input
                  value={config.whatsapp}
                  placeholder="5599999999999 ou link completo"
                  onChange={(event) => updateField('whatsapp', event.target.value)}
                />
              </label>

              <label>
                Imagem do topo
                <input
                  value={config.heroImageUrl}
                  placeholder="https://..."
                  onChange={(event) => updateField('heroImageUrl', event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="admin-section" id="cores">
            <div className="admin-section-title">
              <span>02</span>
              <div>
                <h2>Cores do site</h2>
                <p>Paleta principal usada nos botões, destaques e seções.</p>
              </div>
            </div>

            <div className="color-grid">
              <label>
                Cor principal
                <input
                  type="color"
                  value={config.colors.primary}
                  onChange={(event) => updateNestedField('colors', 'primary', event.target.value)}
                />
              </label>

              <label>
                Cor secundária
                <input
                  type="color"
                  value={config.colors.secondary}
                  onChange={(event) =>
                    updateNestedField('colors', 'secondary', event.target.value)
                  }
                />
              </label>
            </div>
          </section>

          <section className="admin-section" id="sobre-admin">
            <div className="admin-section-title">
              <span>03</span>
              <div>
                <h2>Seção sobre</h2>
                <p>Resumo institucional da gráfica.</p>
              </div>
            </div>

            <div className="form-grid">
              <label className="full-field">
                Título da seção
                <input
                  value={config.about.title}
                  onChange={(event) => updateNestedField('about', 'title', event.target.value)}
                />
              </label>

              <label className="full-field">
                Texto da seção Sobre
                <textarea
                  rows="5"
                  value={config.about.text}
                  onChange={(event) => updateNestedField('about', 'text', event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="admin-section" id="servicos-admin">
            <div className="admin-section-title">
              <span>04</span>
              <div>
                <h2>Serviços</h2>
                <p>Lista de produtos e soluções oferecidas.</p>
              </div>
            </div>

            <div className="repeat-list">
              {config.services.map((service, index) => (
                <div className="repeat-row" key={`${service}-${index}`}>
                  <label>
                    Serviço {index + 1}
                    <input
                      value={service}
                      onChange={(event) => updateListItem('services', index, event.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => removeListItem('services', index)}>
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="ghost-button"
              onClick={() => addListItem('services', 'Novo serviço')}
            >
              Adicionar serviço
            </button>
          </section>

          <section className="admin-section" id="diferenciais-admin">
            <div className="admin-section-title">
              <span>05</span>
              <div>
                <h2>Diferenciais</h2>
                <p>Textos da seção “Por que escolher a gente”.</p>
              </div>
            </div>

            <div className="repeat-list">
              {config.whyChooseUs.map((item, index) => (
                <div className="testimonial-editor" key={`${item.title}-${index}`}>
                  <div className="form-grid">
                    <label>
                      Título
                      <input
                        value={item.title}
                        onChange={(event) =>
                          updateObjectListItem('whyChooseUs', index, 'title', event.target.value)
                        }
                      />
                    </label>

                    <label className="full-field">
                      Texto
                      <textarea
                        rows="3"
                        value={item.text}
                        onChange={(event) =>
                          updateObjectListItem('whyChooseUs', index, 'text', event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => removeListItem('whyChooseUs', index)}>
                    Remover diferencial
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="ghost-button"
              onClick={() => addListItem('whyChooseUs', emptyWhyChooseUs)}
            >
              Adicionar diferencial
            </button>
          </section>

          <section className="admin-section" id="galeria-admin">
            <div className="admin-section-title">
              <span>06</span>
              <div>
                <h2>Galeria</h2>
                <p>Imagens por URL para mostrar trabalhos realizados.</p>
              </div>
            </div>

            <div className="admin-gallery-list">
              {config.gallery.map((item, index) => (
                <article className="admin-gallery-item" key={`${item.title}-${index}`}>
                  <img
                    src={item.imageUrl || galleryPreviewFallback}
                    alt=""
                    onError={handleGalleryPreviewError}
                  />
                  <div className="form-grid">
                    <label>
                      Título
                      <input
                        value={item.title}
                        onChange={(event) =>
                          updateObjectListItem('gallery', index, 'title', event.target.value)
                        }
                      />
                    </label>

                    <label>
                      URL da imagem
                      <input
                        value={item.imageUrl}
                        placeholder="https://..."
                        onChange={(event) =>
                          updateObjectListItem('gallery', index, 'imageUrl', event.target.value)
                        }
                      />
                    </label>

                    <label className="full-field">
                      Descrição
                      <textarea
                        rows="3"
                        value={item.description}
                        onChange={(event) =>
                          updateObjectListItem('gallery', index, 'description', event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => removeListItem('gallery', index)}>
                    Remover imagem
                  </button>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="ghost-button"
              onClick={() => addListItem('gallery', emptyGalleryItem)}
            >
              Adicionar imagem
            </button>
          </section>

          <section className="admin-section" id="depoimentos-admin">
            <div className="admin-section-title">
              <span>07</span>
              <div>
                <h2>Depoimentos</h2>
                <p>Frases de clientes exibidas na landing page.</p>
              </div>
            </div>

            <div className="repeat-list">
              {config.testimonials.map((testimonial, index) => (
                <div className="testimonial-editor" key={`${testimonial.name}-${index}`}>
                  <div className="form-grid">
                    <label>
                      Nome
                      <input
                        value={testimonial.name}
                        onChange={(event) =>
                          updateObjectListItem('testimonials', index, 'name', event.target.value)
                        }
                      />
                    </label>

                    <label>
                      Cargo ou empresa
                      <input
                        value={testimonial.role}
                        onChange={(event) =>
                          updateObjectListItem('testimonials', index, 'role', event.target.value)
                        }
                      />
                    </label>

                    <label className="full-field">
                      Depoimento
                      <textarea
                        rows="3"
                        value={testimonial.text}
                        onChange={(event) =>
                          updateObjectListItem('testimonials', index, 'text', event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => removeListItem('testimonials', index)}>
                    Remover depoimento
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="ghost-button"
              onClick={() => addListItem('testimonials', emptyTestimonial)}
            >
              Adicionar depoimento
            </button>
          </section>

          <section className="admin-section">
            <div className="admin-section-title">
              <span>08</span>
              <div>
                <h2>Chamada final</h2>
                <p>Texto do bloco de contato no fim da página.</p>
              </div>
            </div>

            <div className="form-grid">
              <label className="full-field">
                Título
                <input
                  value={config.contact.title}
                  onChange={(event) => updateNestedField('contact', 'title', event.target.value)}
                />
              </label>

              <label className="full-field">
                Texto
                <textarea
                  rows="4"
                  value={config.contact.text}
                  onChange={(event) => updateNestedField('contact', 'text', event.target.value)}
                />
              </label>
            </div>
          </section>

          <div className="admin-actions">
            <button type="button" className="reset-button" onClick={handleReset}>
              Restaurar padrão
            </button>
            <button type="submit" className="save-button">
              Salvar alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

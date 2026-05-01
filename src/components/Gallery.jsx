const fallbackGalleryImage =
  'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80'

const handleImageError = (event) => {
  if (!event.currentTarget.dataset.fallbackApplied) {
    event.currentTarget.dataset.fallbackApplied = 'true'
    event.currentTarget.src = fallbackGalleryImage
  }
}

export function Gallery({ gallery }) {
  return (
    <section className="section gallery-section" id="galeria">
      <div className="section-heading">
        <span className="section-kicker">Trabalhos recentes</span>
        <h2>Ideias impressas com presença e personalidade</h2>
      </div>

      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <article className="gallery-card" key={`${item.title}-${index}`}>
            <img
              src={item.imageUrl || fallbackGalleryImage}
              alt={item.title || 'Trabalho personalizado'}
              onError={handleImageError}
            />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

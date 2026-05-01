export function Testimonials({ testimonials }) {
  return (
    <section className="section testimonials-section" id="depoimentos">
      <div className="section-heading">
        <span className="section-kicker">Depoimentos</span>
        <h2>Clientes que confiam no nosso trabalho</h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={`${testimonial.name}-${testimonial.role}`}>
            <p>“{testimonial.text}”</p>
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

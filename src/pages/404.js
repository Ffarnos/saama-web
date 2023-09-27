import { Link } from "gatsby"

const pageStyles = {
  color: "#333",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  textAlign: "center",
}

const headingStyles = {
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "#FF6347", // Color rojo brillante
}

const paragraphStyles = {
  fontSize: "1.2rem",
  marginBottom: "2rem",
}

const linkStyles = {
  fontSize: "1.2rem",
  color: "#007acc", // Color azul
  textDecoration: "underline",
}

const NotFoundPage = () => {
  return (
      <main style={pageStyles}>
        <h1 style={headingStyles}>Página no encontrada 😔</h1>
        <p style={paragraphStyles}>
          Lo sentimos, no pudimos encontrar lo que estabas buscando.
        </p>
        <p style={paragraphStyles}>
          <Link to="/" style={linkStyles}>Volver a la página de inicio</Link>.
        </p>
      </main>
  )
}

export default NotFoundPage

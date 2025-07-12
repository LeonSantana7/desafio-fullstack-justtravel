import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-white py-4 mt-5">
      <div className="container">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/LeonSantana7"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Link para o Github"
          >
            <i className="fab fa-github"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/leon-santana-8b5041193/"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Link para o Linkedin"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </section>

        <section className="mb-4">
          <p>Desenvolvido por Leon Santana</p>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © {currentYear} Copyright:
          <a
            className="text-white ms-2"
            href="#!"
            style={{ textDecoration: "none" }}
          >
            Leon Santana Barbosa - Projeto FullStack
          </a>
        </div>
      </div>
    </footer>
  );
}

const EMAIL = "hamza@justinterfaces.tech";

const mail = (subject: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

const PORTFOLIO = [
  {
    name: "Screening",
    status: "Active",
    summary: "Timed screenings and rent/buy on-demand film.",
  },
  {
    name: "Workbench",
    status: "Active",
    summary: "A fabrication calculator for wood, print and laser work.",
  },
  {
    name: "Postrun",
    status: "Active",
    summary: "A running and reflection practice: Log + Works.",
  },
  {
    name: "Ratio",
    status: "Exploring",
    summary: "Portable user context for AI apps.",
  },
] as const;

const CONTACTS = [
  { label: "Support", note: "Help with a product", subject: "Support" },
  { label: "Privacy", note: "Data and privacy requests", subject: "Privacy" },
  {
    label: "Portfolio",
    note: "Products, partnerships, press",
    subject: "Portfolio enquiry",
  },
  { label: "General", note: "Anything else", subject: "Hello" },
] as const;

export default function Home() {
  return (
    <main className="page">
      <header className="top">
        <span>Interfaces</span>
        <span>London / Web</span>
      </header>

      <section className="hero">
        <h1>Interfaces</h1>
        <p className="tagline">The Interfaces Company of Tomorrow</p>
      </section>

      <section className="about">
        <p>
          Interfaces is an independent human technology company. We research,
          design and build technology that expands human capability, creativity
          and agency. Technology does not simply help people do things. It
          changes what people can do, how they think, what they value and who
          they become. So we treat it as a human environment, and we make
          products that people can understand, control and leave on reasonable
          terms.
        </p>
      </section>

      <section aria-labelledby="portfolio">
        <h2 id="portfolio">Portfolio</h2>
        <ul className="rows">
          {PORTFOLIO.map((p) => (
            <li key={p.name}>
              <span className="name">{p.name}</span>
              <span className="desc">{p.summary}</span>
              <span className="tag">{p.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <ul className="rows">
          {CONTACTS.map((c) => (
            <li key={c.label}>
              <a className="name link" href={mail(c.subject)}>
                {c.label}
              </a>
              <span className="desc">{c.note}</span>
              <a className="tag link" href={mail(c.subject)}>
                {EMAIL}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="foot">
        <span>
          &copy; {new Date().getFullYear()} The Interfaces Company of Tomorrow
          Ltd
        </span>
        <span>Made at Interfaces.</span>
      </footer>
    </main>
  );
}

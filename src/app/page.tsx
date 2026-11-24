const DOMAIN = "theinterfaces.company";

const CONTACTS = [
  { label: "Support", address: `support@${DOMAIN}` },
  { label: "Privacy", address: `privacy@${DOMAIN}` },
  { label: "Contact", address: `inbox@${DOMAIN}` },
] as const;

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <h1>
          The Interfaces
          <br />
          Company of
          <br />
          Tomorrow
        </h1>
        <p>
          An independent human technology company. We research, design and
          build technology that expands human capability, creativity and
          agency, with products people can understand, control and leave on
          reasonable terms.
        </p>
      </section>

      <footer className="foot">
        <ul>
          {CONTACTS.map((c) => (
            <li key={c.label}>
              <span>{c.label}</span>
              <a href={`mailto:${c.address}`}>{c.address}</a>
            </li>
          ))}
        </ul>
        <small>
          &copy; {new Date().getFullYear()} The Interfaces Company of Tomorrow
          Ltd
        </small>
      </footer>
    </main>
  );
}

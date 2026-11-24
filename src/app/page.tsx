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
          Interfaces is an independent human technology company. We research,
          design and build technology that expands human capability, creativity
          and agency. Technology does not simply help people do things. It
          changes what people can do, how they think, what they value and who
          they become. So we treat it as a human environment, and we make
          products that people can understand, control and leave on reasonable
          terms.
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

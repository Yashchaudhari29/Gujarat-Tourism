import { memo } from "react";

export default memo(function ExploreDeeperHub() {
  return (
    <section className="route-page explore-deeper-page" id="explore-deeper" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ marginBottom: "60px", textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>EXPLORE DEEPER</span>
        <h1 tabIndex={-1} style={{ marginTop: '16px', marginBottom: '20px' }}>The Gujarat Explorers</h1>
        <p style={{ fontSize: '1.1rem', color: '#4b605c', lineHeight: 1.8 }}>Go beyond the surface with five interactive tools designed to map history, uncover connections, and deeply explore Gujarat's heritage, environment, and people.</p>
      </div>

      <div className="explorers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <a href="/explore/history" className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src="/assets/dholavira.jpg" alt="Historical Atlas" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Map through time</span>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.5rem' }}>Historical Atlas</h3>
            <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.6, color: 'var(--secondary)' }}>Understand how settlement, trade, political authority, and cultural exchange changed over time across the vast landscapes of Gujarat.</p>
            <span className="primary" style={{ textAlign: 'center', textDecoration: 'none', alignSelf: 'flex-start' }}>Launch Atlas ↗</span>
          </div>
        </a>

        <a href="/explore/connections" className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src="/assets/lothal.jpg" alt="Connections" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>“Why here?” explorer</span>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.5rem' }}>Connections</h3>
            <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.6, color: 'var(--secondary)' }}>Discover why ports, crafts, and agricultural practices developed exactly where they did, bridging geography with human ingenuity.</p>
            <span className="primary" style={{ textAlign: 'center', textDecoration: 'none', alignSelf: 'flex-start' }}>Explore Connections ↗</span>
          </div>
        </a>

        <a href="/explore/objects" className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src="/assets/patola.jpg" alt="Story Discovery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>One object, many stories</span>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.5rem' }}>Story Discovery</h3>
            <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.6, color: 'var(--secondary)' }}>Enter Gujarat's history through specific surviving artifacts like textiles, beads, and inscriptions that carry generations of knowledge.</p>
            <span className="primary" style={{ textAlign: 'center', textDecoration: 'none', alignSelf: 'flex-start' }}>Discover Objects ↗</span>
          </div>
        </a>

        <a href="/leadership" className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src="/assets/narendra-modi.jpg" alt="People" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', objectPosition: 'center 15%' }} />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Gujarati documentary profiles</span>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.5rem' }}>People</h3>
            <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.6, color: 'var(--secondary)' }}>Immerse yourself in substantial, polished documentary storytelling of those who shaped this place, from freedom fighters to modern leaders.</p>
            <span className="primary" style={{ textAlign: 'center', textDecoration: 'none', alignSelf: 'flex-start' }}>Meet the People ↗</span>
          </div>
        </a>

        <a href="/explore/environment" className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src="/assets/gir-lion.jpg" alt="Environmental Understanding" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Seasonal Gujarat</span>
            <h3 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.5rem' }}>Environmental Understanding</h3>
            <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.6, color: 'var(--secondary)' }}>See how landscapes, water availability, and human activities vary through the Gujarati seasons, dictating the rhythm of life.</p>
            <span className="primary" style={{ textAlign: 'center', textDecoration: 'none', alignSelf: 'flex-start' }}>Explore Seasons ↗</span>
          </div>
        </a>

      </div>
      <style>{`
        .explorer-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(22,57,50,0.15); }
        .explorer-card:hover img { transform: scale(1.05); }
        .explorer-card .primary { padding: 12px 20px; font-size: 0.9rem; }
      `}</style>
    </section>
  );
});

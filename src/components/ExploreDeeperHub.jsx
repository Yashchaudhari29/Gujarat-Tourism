import { memo } from "react";

export default memo(function ExploreDeeperHub() {
  return (
    <section className="route-page explore-deeper-page" id="explore-deeper" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="section-heading" style={{ marginBottom: "40px" }}>
        <div>
          <span className="eyebrow">EXPLORE DEEPER</span>
          <h1 tabIndex={-1}>The Gujarat Explorers</h1>
        </div>
        <p>Go beyond the surface with five interactive tools designed to map history, uncover connections, and deeply explore Gujarat's heritage, environment, and people.</p>
      </div>

      <div className="explorers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
        
        <div className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>Historical Atlas</h3>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '16px' }}>Map through time</span>
          <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.5 }}>Understand how settlement, trade, political authority, and cultural exchange changed over time.</p>
          <a href="/explore/history" className="button primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Launch Atlas</a>
        </div>

        <div className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>Connections</h3>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '16px' }}>“Why here?” explorer</span>
          <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.5 }}>Discover why ports, crafts, and agricultural practices developed exactly where they did.</p>
          <a href="/explore/connections" className="button primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Explore Connections</a>
        </div>

        <div className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>Story Discovery</h3>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '16px' }}>One object, many stories</span>
          <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.5 }}>Enter Gujarat's history through specific surviving artifacts like textiles, beads, and inscriptions.</p>
          <a href="/explore/objects" className="button primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Discover Objects</a>
        </div>

        <div className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>People</h3>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '16px' }}>Gujarati documentary profiles</span>
          <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.5 }}>Immerse yourself in substantial, polished documentary storytelling of those who shaped this place.</p>
          <a href="/leadership" className="button primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Meet the People</a>
        </div>

        <div className="explorer-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '8px' }}>Environmental Understanding</h3>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.85em', letterSpacing: '0.05em', marginBottom: '16px' }}>Seasonal Gujarat</span>
          <p style={{ flexGrow: 1, marginBottom: '24px', lineHeight: 1.5 }}>See how landscapes, water availability, and human activities vary through the Gujarati seasons.</p>
          <a href="/explore/environment" className="button primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Explore Seasons</a>
        </div>

      </div>
    </section>
  );
});

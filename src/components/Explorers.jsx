import { memo, useState } from "react";
import atlasData from "../data/historical-atlas.json";
import connectionsData from "../data/connections.json";
import objectsData from "../data/objects.json";
import peopleData from "../data/documentary-people.json";
import envData from "../data/environment.json";

function HistoricalAtlas() {
  const [selectedEra, setSelectedEra] = useState(atlasData.eras[0].id);
  const era = atlasData.eras.find(e => e.id === selectedEra);
  const sites = atlasData.sites.filter(s => s.era_id === selectedEra);

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <a href="#explore-deeper" className="back-link">← Hub</a>
        <h2>Historical Atlas</h2>
        <div className="era-tabs">
          {atlasData.eras.map(e => (
            <button key={e.id} onClick={() => setSelectedEra(e.id)} className={`tab-btn ${selectedEra === e.id ? 'active' : ''}`}>{e.name}</button>
          ))}
        </div>
      </div>
      <div className="explorer-content">
        <div className="era-info">
          <h3>{era.name} ({era.date_range})</h3>
          <p>{era.description}</p>
          <small>Source: {era.sources}</small>
        </div>
        <div className="sites-grid">
          {sites.map(s => (
            <div key={s.id} className="site-card">
              <h4>{s.name} <span className="badge">{s.type}</span></h4>
              <p>{s.description}</p>
              <div className="site-meta">
                <strong>Evidence:</strong> {s.evidence}<br/>
                <strong>Location:</strong> {s.location_note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Connections() {
  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <a href="#explore-deeper" className="back-link">← Hub</a>
        <h2>Connections: Why Here?</h2>
      </div>
      <div className="explorer-content">
        <div className="connections-grid">
          {connectionsData.map(c => (
            <div key={c.id} className="conn-card">
              <h3>{c.title} <span className="badge">{c.category}</span></h3>
              <p><strong>Developed:</strong> {c.development}</p>
              <p><strong>Why Here:</strong> {c.local_conditions}</p>
              <p><strong>Contributors:</strong> {c.contributors}</p>
              <p><strong>Connections:</strong> {c.connections}</p>
              <p><strong>Modern Relevance:</strong> {c.modern_relevance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryDiscovery() {
  const [selected, setSelected] = useState(null);
  
  if (selected) {
    return (
      <div className="explorer-container">
        <a href="#objects-explorer" onClick={(e) => { e.preventDefault(); setSelected(null); }} className="back-link">← All Objects</a>
        <h2>{selected.name}</h2>
        <div className="object-detail">
          <p><strong>Type:</strong> {selected.type}</p>
          <p><strong>Origin:</strong> {selected.origin_date}</p>
          <p><strong>Location:</strong> {selected.present_location}</p>
          <p><strong>Materials:</strong> {selected.materials_technique}</p>
          <p><strong>Meaning:</strong> {selected.meaning}</p>
          <p><strong>Revelation:</strong> {selected.revelation}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <a href="#explore-deeper" className="back-link">← Hub</a>
        <h2>Story Discovery</h2>
      </div>
      <div className="objects-grid">
        {objectsData.map(o => (
          <div key={o.id} className="object-card" onClick={() => setSelected(o)}>
            <h3>{o.name}</h3>
            <p>{o.recognition}</p>
            <button className="primary outline">View Story</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentaryPeople() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div className="explorer-container">
        <a href="#people-explorer" onClick={(e) => { e.preventDefault(); setSelected(null); }} className="back-link">← All Profiles</a>
        <h2>{selected.name}</h2>
        <p className="subtitle">{selected.dates} • {selected.district_connection}</p>
        <p className="overview">{selected.overview}</p>
        <div className="script-chapters">
          {selected.script_chapters.map((ch, i) => (
            <div key={i} className="chapter">
              <h3>{ch.title}</h3>
              <p className="gujarati-text">{ch.gujarati_script}</p>
              <small className="pronunciation">Note: {ch.pronunciation_notes}</small>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <a href="#explore-deeper" className="back-link">← Hub</a>
        <h2>Documentary Profiles</h2>
      </div>
      <div className="people-grid">
        {peopleData.map(p => (
          <div key={p.id} className="person-card" onClick={() => setSelected(p)}>
            <h3>{p.name}</h3>
            <p>{p.dates}</p>
            <p>{p.overview.substring(0, 100)}...</p>
            <button className="primary outline">Read Script</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Environment() {
  const [season, setSeason] = useState(envData.seasons[0]);
  const observations = envData.observations.filter(o => o.season_id.toLowerCase() === season.toLowerCase());

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <a href="#explore-deeper" className="back-link">← Hub</a>
        <h2>Seasonal Gujarat</h2>
        <div className="era-tabs">
          {envData.seasons.map(s => (
            <button key={s} onClick={() => setSeason(s)} className={`tab-btn ${season === s ? 'active' : ''}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="explorer-content">
        <div className="env-grid">
          {observations.map(o => (
            <div key={o.id} className="env-card">
              <h3>{o.region_id}</h3>
              <p><strong>Rainfall/Temp:</strong> {o.rainfall_temp}</p>
              <p><strong>Water:</strong> {o.water_wetlands}</p>
              <p><strong>Agriculture:</strong> {o.agriculture_livelihoods}</p>
              <p><strong>Wildlife:</strong> {o.wildlife_activity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(function Explorers({ route }) {
  return (
    <section className="section-wrap" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      {route === '#atlas-explorer' && <HistoricalAtlas />}
      {route === '#connections-explorer' && <Connections />}
      {route === '#objects-explorer' && <StoryDiscovery />}
      {route === '#people-explorer' && <DocumentaryPeople />}
      {route === '#environment-explorer' && <Environment />}
    </section>
  );
});

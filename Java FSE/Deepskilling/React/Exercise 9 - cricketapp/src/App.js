import React from 'react';

// ── ListofPlayers Component ─────────────────────────────
function ListofPlayers() {
  // Array of 11 players with name and score using ES6 object shorthand
  const players = [
    { name: 'Rohit Sharma',    score: 85 },
    { name: 'Shubman Gill',    score: 42 },
    { name: 'Virat Kohli',     score: 91 },
    { name: 'Shreyas Iyer',    score: 63 },
    { name: 'KL Rahul',        score: 55 },
    { name: 'Hardik Pandya',   score: 38 },
    { name: 'Ravindra Jadeja', score: 72 },
    { name: 'Axar Patel',      score: 29 },
    { name: 'Jasprit Bumrah',  score: 11 },
    { name: 'Mohammed Shami',  score: 8  },
    { name: 'Kuldeep Yadav',   score: 15 },
  ];

  // ES6 map() to display all players
  const allPlayersList = players.map((p, i) => (
    <li key={i} style={styles.playerItem}>
      <strong>{p.name}</strong> — Score: {p.score}
    </li>
  ));

  // ES6 arrow function + filter: players with score below 70
  const lowScorers = players.filter(p => p.score < 70);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🏏 List of Players (map)</h2>
      <ul style={styles.list}>{allPlayersList}</ul>

      <h3 style={styles.subTitle}>⚠️ Players with score below 70 (filter + arrow fn)</h3>
      <ul style={styles.list}>
        {lowScorers.map((p, i) => (
          <li key={i} style={{ ...styles.playerItem, color: '#e74c3c' }}>
            {p.name} — Score: {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── IndianPlayers Component ─────────────────────────────
function IndianPlayers() {
  // Two arrays for T20 and Ranji Trophy players
  const T20players    = ['Rohit Sharma', 'Virat Kohli', 'Hardik Pandya', 'KL Rahul', 'Suryakumar Yadav'];
  const RanjiTrophy   = ['Prithvi Shaw', 'Shubman Gill', 'Sanju Samson', 'Devdutt Padikkal', 'Ruturaj Gaikwad'];

  // ES6 Destructuring: split T20 into odd/even positions
  const [first, second, ...rest] = T20players;
  const oddTeam  = [first, ...rest.filter((_, i) => i % 2 === 0)];
  const evenTeam = [second, ...rest.filter((_, i) => i % 2 !== 0)];

  // ES6 Spread/Merge: merge T20 and Ranji arrays
  const merged = [...T20players, ...RanjiTrophy];

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🇮🇳 Indian Players (ES6 Features)</h2>

      <h3 style={styles.subTitle}>Odd Team (Destructuring)</h3>
      <ul style={styles.list}>
        {oddTeam.map((p, i) => <li key={i} style={styles.playerItem}>{p}</li>)}
      </ul>

      <h3 style={styles.subTitle}>Even Team (Destructuring)</h3>
      <ul style={styles.list}>
        {evenTeam.map((p, i) => <li key={i} style={styles.playerItem}>{p}</li>)}
      </ul>

      <h3 style={styles.subTitle}>🔀 Merged T20 + Ranji Trophy (Spread operator)</h3>
      <ul style={styles.list}>
        {merged.map((p, i) => <li key={i} style={styles.playerItem}>{p}</li>)}
      </ul>
    </div>
  );
}

// ── App Component ───────────────────────────────────────
function App() {
  // Flag controls which component to show
  const flag = true;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏏 Cricket App — ES6 Features</h1>
      <p style={styles.flagInfo}>flag = <code>{String(flag)}</code></p>
      {flag ? <ListofPlayers /> : <IndianPlayers />}
      <hr style={styles.divider} />
      <IndianPlayers />
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '700px', margin: '0 auto', padding: '24px', background: '#f9f9f9', minHeight: '100vh' },
  title: { color: '#1a5276', textAlign: 'center' },
  flagInfo: { textAlign: 'center', color: '#7f8c8d', fontSize: '14px' },
  section: { background: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  sectionTitle: { color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '8px' },
  subTitle: { color: '#2980b9', marginTop: '16px' },
  list: { listStyle: 'none', padding: 0, margin: '8px 0' },
  playerItem: { padding: '6px 10px', borderRadius: '4px', background: '#f4f6f9', marginBottom: '4px', fontSize: '14px' },
  divider: { border: 'none', borderTop: '2px dashed #ddd', margin: '24px 0' }
};

export default App;

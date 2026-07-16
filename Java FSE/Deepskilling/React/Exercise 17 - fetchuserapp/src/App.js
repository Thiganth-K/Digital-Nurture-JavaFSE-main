import React, { Component } from 'react';

class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true, error: null };
  }

  componentDidMount() {
    fetch('https://api.randomuser.me/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then(data => {
        this.setState({ user: data.results[0], loading: false });
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
      });
  }

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return (
        <div style={styles.center}>
          <div style={styles.spinner}></div>
          <p style={{ color: '#7f8c8d' }}>Fetching user from API...</p>
        </div>
      );
    }

    if (error) {
      return <div style={{ ...styles.center, color: '#e74c3c' }}>⚠️ {error}</div>;
    }

    const { name, picture, email, phone, location, dob } = user;
    const fullName = `${name.title} ${name.first} ${name.last}`;

    return (
      <div style={styles.page}>
        <h1 style={styles.pageTitle}>👤 Random User — REST API Demo</h1>
        <p style={styles.apiLabel}>Source: <code>https://api.randomuser.me/</code></p>

        <div style={styles.card}>
          <img src={picture.large} alt={fullName} style={styles.avatar} />
          <div style={styles.info}>
            <h2 style={styles.name}>{fullName}</h2>
            <div style={styles.grid}>
              <span style={styles.key}>Email</span>
              <span style={styles.val}>{email}</span>
              <span style={styles.key}>Phone</span>
              <span style={styles.val}>{phone}</span>
              <span style={styles.key}>City</span>
              <span style={styles.val}>{location.city}, {location.country}</span>
              <span style={styles.key}>Age</span>
              <span style={styles.val}>{dob.age} years</span>
              <span style={styles.key}>Gender</span>
              <span style={styles.val} style={{ textTransform: 'capitalize' }}>{user.gender}</span>
            </div>
          </div>
        </div>

        <button
          style={styles.refreshBtn}
          onClick={() => { this.setState({ loading: true, user: null }); this.componentDidMount(); }}
        >
          🔄 Fetch Another User
        </button>
      </div>
    );
  }
}

const styles = {
  page:       { fontFamily: 'Segoe UI, sans-serif', background: 'linear-gradient(135deg, #0d47a1, #1976d2)', minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  pageTitle:  { color: '#fff', textAlign: 'center', marginBottom: '6px' },
  apiLabel:   { color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '32px', textAlign: 'center' },
  card:       { background: '#fff', borderRadius: '16px', padding: '32px', display: 'flex', gap: '28px', alignItems: 'flex-start', maxWidth: '600px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
  avatar:     { width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #1976d2', objectFit: 'cover' },
  info:       { flex: 1 },
  name:       { color: '#0d47a1', margin: '0 0 16px 0', fontSize: '22px' },
  grid:       { display: 'grid', gridTemplateColumns: '80px 1fr', rowGap: '8px' },
  key:        { color: '#7f8c8d', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', alignSelf: 'center' },
  val:        { color: '#2c3e50', fontSize: '14px', alignSelf: 'center' },
  center:     { fontFamily: 'Segoe UI, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' },
  spinner:    { width: '48px', height: '48px', border: '5px solid #ecf0f1', borderTop: '5px solid #1976d2', borderRadius: '50%', marginBottom: '16px', animation: 'spin 1s linear infinite' },
  refreshBtn: { marginTop: '24px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', padding: '10px 26px', borderRadius: '24px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }
};

function App() {
  return <Getuser />;
}

export default App;

import React, { Component } from 'react';

// Guest Page - shown when not logged in
function GuestPage({ flights }) {
  return (
    <div style={styles.pageSection}>
      <h2 style={styles.guestTitle}>✈️ Available Flights</h2>
      <p style={styles.guestNote}>Please log in to book a ticket.</p>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Flight No.</th>
            <th style={styles.th}>From</th>
            <th style={styles.th}>To</th>
            <th style={styles.th}>Departure</th>
            <th style={styles.th}>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={styles.td}>{f.no}</td>
              <td style={styles.td}>{f.from}</td>
              <td style={styles.td}>{f.to}</td>
              <td style={styles.td}>{f.departure}</td>
              <td style={styles.td}>₹ {f.price.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// User Page - shown when logged in
function UserPage({ onLogout, username }) {
  return (
    <div style={styles.pageSection}>
      <h2 style={styles.userTitle}>👋 Welcome, {username}!</h2>
      <p style={styles.userNote}>You are logged in. You can now book flight tickets.</p>
      <div style={styles.bookingBox}>
        <h3>🎫 Book a Ticket</h3>
        <p>Select a flight from the list and proceed to payment.</p>
        <button style={styles.bookBtn}>Proceed to Book</button>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, username: 'John Doe' };
    this.handleLogin  = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin()  { this.setState({ isLoggedIn: true  }); }
  handleLogout() { this.setState({ isLoggedIn: false }); }

  render() {
    const { isLoggedIn, username } = this.state;

    const flights = [
      { no: 'AI 101', from: 'Delhi',   to: 'Mumbai',    departure: '08:00 AM', price: 4500 },
      { no: 'SG 202', from: 'Chennai', to: 'Bangalore', departure: '10:30 AM', price: 2800 },
      { no: '6E 303', from: 'Mumbai',  to: 'Hyderabad', departure: '01:15 PM', price: 3200 },
      { no: 'UK 404', from: 'Kolkata', to: 'Delhi',     departure: '06:00 PM', price: 5100 },
    ];

    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <h1 style={styles.brand}>✈️ SkyBook — Flight Ticket Booking</h1>
          <div>
            {isLoggedIn ? (
              <button style={styles.logoutBtn} onClick={this.handleLogout}>Logout</button>
            ) : (
              <button style={styles.loginBtn} onClick={this.handleLogin}>Login</button>
            )}
          </div>
        </header>

        <main style={styles.main}>
          {/* Conditional Rendering */}
          {isLoggedIn
            ? <UserPage username={username} onLogout={this.handleLogout} />
            : <GuestPage flights={flights} />
          }
        </main>
      </div>
    );
  }
}

const styles = {
  app:        { fontFamily: 'Segoe UI, sans-serif', background: '#f0f4f8', minHeight: '100vh' },
  header:     { background: '#1a237e', color: 'white', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand:      { margin: 0, fontSize: '20px' },
  loginBtn:   { background: '#4caf50', color: '#fff', border: 'none', padding: '9px 22px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  logoutBtn:  { background: '#f44336', color: '#fff', border: 'none', padding: '9px 22px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  main:       { padding: '30px' },
  pageSection:{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 3px 12px rgba(0,0,0,0.08)' },
  guestTitle: { color: '#1a237e' }, guestNote: { color: '#e57373', marginBottom: '16px' },
  userTitle:  { color: '#2e7d32' }, userNote:  { color: '#555' },
  table:      { width: '100%', borderCollapse: 'collapse' },
  thead:      { background: '#1a237e', color: 'white' },
  th:         { padding: '11px 14px', textAlign: 'left', fontSize: '13px' },
  td:         { padding: '10px 14px', fontSize: '14px', color: '#34495e' },
  rowEven:    { background: '#f9f9f9' }, rowOdd: { background: '#fff' },
  bookingBox: { background: '#e8f5e9', borderRadius: '8px', padding: '20px', marginTop: '16px' },
  bookBtn:    { background: '#43a047', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }
};

export default App;

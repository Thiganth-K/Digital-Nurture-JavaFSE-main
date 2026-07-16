import React, { Component } from 'react';

class CountPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryCount: 0,
      exitCount:  0
    };
    this.UpdateEntry = this.UpdateEntry.bind(this);
    this.UpdateExit  = this.UpdateExit.bind(this);
  }

  UpdateEntry() {
    this.setState(prevState => ({ entryCount: prevState.entryCount + 1 }));
  }

  UpdateExit() {
    this.setState(prevState => ({
      exitCount: prevState.exitCount < prevState.entryCount
        ? prevState.exitCount + 1
        : prevState.exitCount
    }));
  }

  render() {
    const { entryCount, exitCount } = this.state;
    const insideMall = entryCount - exitCount;

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🏬 Mall People Counter</h1>

        <div style={styles.countersRow}>
          <div style={{ ...styles.counter, borderColor: '#27ae60' }}>
            <span style={styles.countLabel}>People Entered</span>
            <span style={{ ...styles.countNum, color: '#27ae60' }}>{entryCount}</span>
          </div>
          <div style={{ ...styles.counter, borderColor: '#e74c3c' }}>
            <span style={styles.countLabel}>People Exited</span>
            <span style={{ ...styles.countNum, color: '#e74c3c' }}>{exitCount}</span>
          </div>
          <div style={{ ...styles.counter, borderColor: '#3498db' }}>
            <span style={styles.countLabel}>Inside Mall</span>
            <span style={{ ...styles.countNum, color: '#3498db' }}>{insideMall}</span>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button style={{ ...styles.btn, background: '#27ae60' }} onClick={this.UpdateEntry}>
            🚪 Login (Enter)
          </button>
          <button style={{ ...styles.btn, background: '#e74c3c' }} onClick={this.UpdateExit}>
            🚪 Exit
          </button>
        </div>

        <p style={styles.info}>
          Number of people who entered the mall: <strong>{entryCount}</strong><br />
          Number of people who exited the mall: <strong>{exitCount}</strong>
        </p>
      </div>
    );
  }
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '560px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' },
  title: { color: '#2c3e50', marginBottom: '30px' },
  countersRow: { display: 'flex', justifyContent: 'space-around', marginBottom: '30px' },
  counter: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 20px', border: '2px solid', borderRadius: '10px', minWidth: '120px' },
  countLabel: { fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' },
  countNum: { fontSize: '42px', fontWeight: 'bold' },
  buttonRow: { display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' },
  btn: { color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: '600' },
  info: { color: '#555', lineHeight: '1.8', background: '#f8f9fa', padding: '12px', borderRadius: '8px' }
};

export default CountPeople;

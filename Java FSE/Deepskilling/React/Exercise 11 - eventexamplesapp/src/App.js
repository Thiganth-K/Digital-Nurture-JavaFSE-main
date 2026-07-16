import React, { Component } from 'react';
import CurrencyConverter from './CurrencyConverter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, message: '', syntheticMsg: '' };
    this.increment      = this.increment.bind(this);
    this.decrement      = this.decrement.bind(this);
    this.sayHello       = this.sayHello.bind(this);
    this.increaseAndSay = this.increaseAndSay.bind(this);
    this.sayWelcome     = this.sayWelcome.bind(this);
    this.handleOnPress  = this.handleOnPress.bind(this);
  }

  increment()  { this.setState(s => ({ counter: s.counter + 1 })); }
  decrement()  { this.setState(s => ({ counter: s.counter - 1 })); }
  sayHello()   { this.setState({ message: 'Hello! This is a static message.' }); }

  increaseAndSay() {
    this.increment();
    this.sayHello();
  }

  sayWelcome(msg) {
    this.setState({ message: msg });
  }

  handleOnPress(e) {
    this.setState({ syntheticMsg: `Synthetic Event fired! Type: ${e.type} — "I was clicked"` });
  }

  render() {
    const { counter, message, syntheticMsg } = this.state;

    return (
      <div style={styles.page}>
        <h1 style={styles.title}>⚡ React Event Handling Examples</h1>

        {/* Counter Section */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>1. Increment / Decrement Counter</h2>
          <div style={styles.counterRow}>
            <button style={styles.btnGreen}  onClick={this.increment}>Increment ▲</button>
            <span   style={styles.counterVal}>{counter}</span>
            <button style={styles.btnRed}    onClick={this.decrement}>Decrement ▼</button>
          </div>
        </section>

        {/* Multiple Methods Section */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>2. Increase Button (Multiple Methods)</h2>
          <button style={styles.btnBlue} onClick={this.increaseAndSay}>Increase</button>
          {message && <p style={styles.infoBox}>{message} (Counter: {counter})</p>}
        </section>

        {/* Say Welcome with Argument */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>3. Say Welcome (with argument)</h2>
          <button style={styles.btnPurple} onClick={() => this.sayWelcome('welcome')}>
            Say Welcome
          </button>
          {message === 'welcome' && <p style={styles.infoBox}>✅ Message received: "welcome"</p>}
        </section>

        {/* Synthetic Event */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>4. Synthetic Event (OnPress)</h2>
          <button style={styles.btnOrange} onClick={this.handleOnPress}>OnPress Click</button>
          {syntheticMsg && <p style={styles.infoBox}>{syntheticMsg}</p>}
        </section>

        {/* Currency Converter */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>5. Currency Converter (₹ → €)</h2>
          <CurrencyConverter />
        </section>
      </div>
    );
  }
}

const styles = {
  page:       { fontFamily: 'Segoe UI, sans-serif', maxWidth: '700px', margin: '0 auto', padding: '24px', background: '#f4f6f9', minHeight: '100vh' },
  title:      { color: '#1a237e', textAlign: 'center' },
  card:       { background: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  cardTitle:  { color: '#2c3e50', margin: '0 0 14px 0', fontSize: '16px' },
  counterRow: { display: 'flex', alignItems: 'center', gap: '20px' },
  counterVal: { fontSize: '36px', fontWeight: 'bold', color: '#2c3e50', minWidth: '50px', textAlign: 'center' },
  btnGreen:   { background: '#27ae60', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  btnRed:     { background: '#e74c3c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  btnBlue:    { background: '#2980b9', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  btnPurple:  { background: '#8e44ad', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  btnOrange:  { background: '#e67e22', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  infoBox:    { background: '#eaf4fb', color: '#1a5276', padding: '10px 14px', borderRadius: '6px', marginTop: '10px', fontSize: '14px' }
};

export default App;

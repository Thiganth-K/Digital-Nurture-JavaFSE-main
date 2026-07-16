import React, { Component } from 'react';

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = { rupees: '', euros: '' };
    this.handleChange  = this.handleChange.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ rupees: e.target.value, euros: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const RATE = 0.011; // 1 INR ≈ 0.011 EUR
    const result = (parseFloat(this.state.rupees) * RATE).toFixed(4);
    this.setState({ euros: isNaN(result) ? 'Invalid input' : result });
  }

  render() {
    const { rupees, euros } = this.state;
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <label style={styles.label}>Amount in ₹ (INR):</label>
          <input
            type="number"
            value={rupees}
            onChange={this.handleChange}
            placeholder="Enter Rupees"
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.btn}>Convert to €</button>
        {euros && (
          <p style={styles.result}>
            ₹ {rupees} = <strong>€ {euros}</strong>
          </p>
        )}
      </form>
    );
  }
}

const styles = {
  form:   { marginTop: '10px' },
  row:    { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  label:  { color: '#555', fontSize: '14px', minWidth: '140px' },
  input:  { border: '1px solid #ddd', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', width: '180px' },
  btn:    { background: '#16a085', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  result: { background: '#eafaf1', color: '#1e8449', padding: '10px 14px', borderRadius: '6px', marginTop: '10px', fontSize: '16px' }
};

export default CurrencyConverter;

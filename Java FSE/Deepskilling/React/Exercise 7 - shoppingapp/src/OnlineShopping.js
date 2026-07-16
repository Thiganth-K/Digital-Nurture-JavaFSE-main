import React, { Component } from 'react';

// Cart class - represents a shopping cart item
class Cart {
  constructor(itemname, price) {
    this.Itemname = itemname;
    this.Price = price;
  }
}

class OnlineShopping extends Component {
  constructor(props) {
    super(props);
    // Array of Cart items initialized in constructor
    this.cartItems = [
      new Cart('Laptop',        75000),
      new Cart('Wireless Mouse',  999),
      new Cart('USB Keyboard',   1499),
      new Cart('HD Monitor',    18000),
      new Cart('Webcam',         3500),
    ];
  }

  render() {
    const total = this.cartItems.reduce((sum, item) => sum + item.Price, 0);

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🛒 Online Shopping Cart</h1>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Item Name</th>
              <th style={styles.th}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {this.cartItems.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.Itemname}</td>
                <td style={styles.td}>₹ {item.Price.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={styles.footerRow}>
              <td colSpan="2" style={{ ...styles.td, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
              <td style={{ ...styles.td, fontWeight: 'bold', color: '#27ae60' }}>
                ₹ {total.toLocaleString('en-IN')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

const styles = {
  container: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' },
  title: { color: '#2c3e50', textAlign: 'center', marginBottom: '24px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { background: '#2c3e50', color: 'white' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '14px' },
  td: { padding: '11px 16px', fontSize: '14px', color: '#34495e', borderBottom: '1px solid #eee' },
  rowEven: { background: '#f9f9f9' },
  rowOdd: { background: '#ffffff' },
  footerRow: { background: '#eafaf1' }
};

export default OnlineShopping;

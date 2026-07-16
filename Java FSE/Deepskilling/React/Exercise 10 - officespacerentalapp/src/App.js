import React from 'react';

// Office space data object
const officeData = {
  heading: 'Office Space Rental — Available Listings',
  imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
};

// List of office spaces
const offices = [
  { id: 1, name: 'TechHub Workspace',       rent: 45000, address: '12 MG Road, Bangalore' },
  { id: 2, name: 'Innovate Co-work Space',   rent: 72000, address: '5 Connaught Place, Delhi' },
  { id: 3, name: 'Coastal Business Center',  rent: 55000, address: '7 Marine Lines, Mumbai' },
  { id: 4, name: 'Green Valley Office Park', rent: 38000, address: '23 Anna Nagar, Chennai' },
  { id: 5, name: 'Silicon Suites',           rent: 89000, address: '88 Cyber City, Hyderabad' },
  { id: 6, name: 'Heritage Business Hub',    rent: 62000, address: '14 Park Street, Kolkata' },
];

function App() {
  return (
    <div style={styles.page}>
      {/* JSX Element: Heading */}
      <h1 style={styles.heading}>{officeData.heading}</h1>

      {/* JSX Attribute: Image */}
      <img
        src={officeData.imageUrl}
        alt="Office Space"
        style={styles.heroImage}
      />

      {/* JSX Expression: Loop through office list */}
      <div style={styles.grid}>
        {offices.map(office => {
          // Inline CSS: red if rent < 60000, green if >= 60000
          const rentColor = office.rent < 60000 ? 'red' : 'green';

          return (
            <div key={office.id} style={styles.card}>
              <h3 style={styles.officeName}>{office.name}</h3>
              <p style={styles.address}>📍 {office.address}</p>
              <p style={styles.rentLabel}>
                Monthly Rent: <span style={{ color: rentColor, fontWeight: 'bold', fontSize: '18px' }}>
                  ₹ {office.rent.toLocaleString('en-IN')}
                </span>
              </p>
              <span style={{
                ...styles.badge,
                background: office.rent < 60000 ? '#fdecea' : '#e8f5e9',
                color: office.rent < 60000 ? '#c62828' : '#2e7d32'
              }}>
                {office.rent < 60000 ? '🔴 Budget' : '🟢 Premium'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '960px', margin: '0 auto', padding: '24px', background: '#f5f5f5' },
  heading: { textAlign: 'center', color: '#1a237e', fontSize: '26px', marginBottom: '20px' },
  heroImage: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '28px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.08)', border: '1px solid #eee' },
  officeName: { color: '#2c3e50', margin: '0 0 8px 0', fontSize: '16px' },
  address: { color: '#7f8c8d', fontSize: '13px', margin: '0 0 10px 0' },
  rentLabel: { color: '#34495e', fontSize: '14px', margin: '0 0 10px 0' },
  badge: { display: 'inline-block', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }
};

export default App;

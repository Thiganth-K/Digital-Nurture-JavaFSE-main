import React from 'react';
import CalculateScore from './Components/CalculateScore';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', fontFamily: 'Segoe UI, sans-serif' }}>
        Score Calculator
      </h1>
      <CalculateScore Name="Alice Johnson" School="Greenwood High" Total={450} Goal={400} />
      <CalculateScore Name="Bob Smith" School="Riverside Academy" Total={370} Goal={400} />
      <CalculateScore Name="Carol White" School="Lakeside School" Total={480} Goal={400} />
    </div>
  );
}

export default App;

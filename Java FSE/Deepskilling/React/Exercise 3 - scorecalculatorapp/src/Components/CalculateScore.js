import React from 'react';
import './Stylesheets/mystyle.css';

function CalculateScore(props) {
  const { Name, School, Total, Goal } = props;

  // Calculate average score (out of 500 total marks, 5 subjects = 100 each)
  const subjects = 5;
  const average = (Total / (subjects * 100)) * 100;
  const status = Total >= Goal ? 'Achieved' : 'Not Achieved';
  const statusColor = Total >= Goal ? '#27ae60' : '#e74c3c';

  return (
    <div className="score-card">
      <h2 className="student-name">{Name}</h2>
      <dl className="score-details">
        <dt>School</dt>
        <dd>{School}</dd>
        <dt>Total Marks</dt>
        <dd>{Total} / 500</dd>
        <dt>Average Score</dt>
        <dd>{average.toFixed(2)}%</dd>
        <dt>Goal</dt>
        <dd>{Goal}</dd>
        <dt>Goal Status</dt>
        <dd style={{ color: statusColor, fontWeight: 'bold' }}>{status}</dd>
      </dl>
    </div>
  );
}

export default CalculateScore;

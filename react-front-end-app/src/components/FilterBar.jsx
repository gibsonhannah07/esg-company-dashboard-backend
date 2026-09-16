import "../styles/components/FilterBar.css";
import React from 'react'

export default function ({ industries, selected, onFilterChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="industry-filter">Filter by Industry:</label>
      <select
        id="industry-filter"
        value={selected}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {industries.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </select>
    </div>
  );
}

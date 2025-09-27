import React from "react";

export default function SafetyTable({ inspections }) {
  return (
    <ul className="bg-white p-4 rounded shadow">
      {inspections.map((i, idx) => (
        <li key={idx} className="border-b py-2">
          Compliance Score: {i.score}%
        </li>
      ))}
    </ul>
  );
}

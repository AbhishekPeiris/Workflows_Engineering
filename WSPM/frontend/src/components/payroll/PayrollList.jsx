import React from "react";

export default function PayrollList({ records }) {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Worker ID</th>
          <th className="p-2">Period</th>
          <th className="p-2">Hours</th>
          <th className="p-2">Pay</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, idx) => (
          <tr key={idx} className="border-t">
            <td className="p-2">{r.workerId}</td>
            <td className="p-2">{r.period}</td>
            <td className="p-2">{r.hoursWorked}</td>
            <td className="p-2">Rs.{r.totalPay}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

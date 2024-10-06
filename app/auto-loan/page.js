"use client"

import React, { useState } from 'react';

const AutoLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(loanTerm) * 12;

    // Calculate the monthly payment
    const monthly = (principal * calculatedInterest) / (1 - Math.pow(1 + calculatedInterest, -calculatedPayments));
    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Auto Loan Calculator</h2>
      <form onSubmit={(e) => { e.preventDefault(); calculateMonthlyPayment(); }}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="loanAmount">Loan Amount ($):</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="interestRate">Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="loanTerm">Loan Term (Years):</label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate Monthly Payment
        </button>
      </form>

      {monthlyPayment !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Monthly Payment: ${monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
};

export default AutoLoanCalculator;

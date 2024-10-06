"use client";

import { useState, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale, Tooltip } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { registerables } from 'chart.js';

Chart.register(...registerables, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale, Tooltip);

const MortgageCalculator = () => {
  const [chart, setChart] = useState(null);
  const [yearlyData, setYearlyData] = useState([]);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [formValues, setFormValues] = useState({
    homePrice: 200000,
    downPayment: 20,
    loanTerm: 30,
    interestRate: 5,
    startDate: '2024-10-07',
  });

  const [additionalCosts, setAdditionalCosts] = useState({
    propertyTaxCheck: false,
    homeInsuranceCheck: false,
    pmiCheck: false,
    hoaCheck: false,
    otherCostsCheck: false,
  });

  const [costValues, setCostValues] = useState({
    propertyTax: 0,
    homeInsurance: 0,
    pmi: 0,
    hoaFees: 0,
    otherCosts: 0,
  });

  const calculateMortgage = () => {
    const { homePrice, downPayment, loanTerm, interestRate, startDate } = formValues;
    const downPaymentAmount = (downPayment / 100) * homePrice;
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    let remainingBalance = loanAmount;
    let cumulativePayment = 0;
    let cumulativeInterest = 0;
    let yearlyPayment = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let currentDate = new Date(startDate);
    const newData = [];
    const amortizationData = [];

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;

      remainingBalance -= principalPayment;
      yearlyPrincipal += principalPayment;
      yearlyPayment += principalPayment + interestPayment;
      yearlyInterest += interestPayment;
      cumulativePayment += principalPayment + interestPayment;
      cumulativeInterest += interestPayment;

      if (month % 12 === 0 || month === totalMonths) {
        newData.push({
          year: Math.ceil(month / 12),
          date: new Date(currentDate),
          cumulativePayment,
          cumulativeInterest,
          remainingBalance,
        });

        amortizationData.push({
          year: Math.ceil(month / 12),
          principalPayment: yearlyPrincipal.toFixed(2),
          interestPayment: yearlyInterest.toFixed(2),
          totalPayment: yearlyPayment.toFixed(2),
          remainingBalance: remainingBalance.toFixed(2),
          propertyTaxes: additionalCosts.propertyTaxCheck ? ((homePrice * 0.01) / 12).toFixed(2) : '0.00', 
          homeInsurance: additionalCosts.homeInsuranceCheck ? costValues.homeInsurance.toFixed(2) : '0.00',
          pmi: additionalCosts.pmiCheck ? costValues.pmi.toFixed(2) : '0.00',
          hoaFees: additionalCosts.hoaCheck ? costValues.hoaFees.toFixed(2) : '0.00',
          otherCosts: additionalCosts.otherCostsCheck ? costValues.otherCosts.toFixed(2) : '0.00',
          totalAnnualCost: (yearlyPayment + (additionalCosts.propertyTaxCheck ? (homePrice * 0.01) / 12 : 0) + (additionalCosts.homeInsuranceCheck ? costValues.homeInsurance : 0) + (additionalCosts.pmiCheck ? costValues.pmi : 0) + (additionalCosts.hoaCheck ? costValues.hoaFees : 0) + (additionalCosts.otherCostsCheck ? costValues.otherCosts : 0)).toFixed(2),
        });

        yearlyPrincipal = 0;
        yearlyPayment = 0;
        yearlyInterest = 0;
      }
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    setYearlyData(newData);
    setAmortizationSchedule(amortizationData);
  };

  useEffect(() => {
    calculateMortgage();
  }, [formValues, additionalCosts, costValues]);

  const renderChart = () => {
    const ctx = document.getElementById('mortgageChart');
    if (chart) chart.destroy();
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Cumulative Payment',
            data: yearlyData.map(data => ({ x: data.date, y: data.cumulativePayment })),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
          {
            label: 'Remaining Balance',
            data: yearlyData.map(data => ({ x: data.date, y: data.remainingBalance })),
            borderColor: 'rgba(54,162,235,1)',
            fill: false,
          },
          {
            label: 'Cumulative Interest',
            data: yearlyData.map(data => ({ x: data.date, y: data.cumulativeInterest })),
            borderColor: 'rgba(255,99,132,1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'year',
            },
            title: {
              display: true,
              text: 'Year',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amount ($)',
            },
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context) {
                const date = new Date(context[0].parsed.x);
                return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
              },
            },
          },
        },
      },
    });
    setChart(newChart);
  };

  useEffect(() => {
    if (yearlyData.length > 0) {
      renderChart();
    }
  }, [yearlyData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalCosts((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setCostValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Enhanced Home Loan Calculator</h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="lg:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mortgage Details</h2>
          <form className="space-y-4">
            {[
              { label: 'Home Price ($)', name: 'homePrice', type: 'number' },
              { label: 'Down Payment (%)', name: 'downPayment', type: 'number' },
              { label: 'Loan Term (years)', name: 'loanTerm', type: 'number' },
              { label: 'Interest Rate (%)', name: 'interestRate', type: 'number' },
              { label: 'Start Date', name: 'startDate', type: 'date' },
            ].map(({ label, name, type }, index) => (
              <div key={index}>
                <label className="block text-gray-600 mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formValues[name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Additional Costs</h2>
            {[
              { label: 'Property Tax', name: 'propertyTaxCheck' },
              { label: 'Home Insurance', name: 'homeInsuranceCheck' },
              { label: 'PMI', name: 'pmiCheck' },
              { label: 'HOA Fees', name: 'hoaCheck' },
              { label: 'Other Costs', name: 'otherCostsCheck' },
            ].map(({ label, name }, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  name={name}
                  checked={additionalCosts[name]}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-gray-600">{label}</label>
                {additionalCosts[name] && (
                  <input
                    type="number"
                    name={name.replace('Check', '')}
                    value={costValues[name.replace('Check', '')]}
                    onChange={handleCostChange}
                    placeholder={`Enter ${label} Amount`}
                    className="ml-4 w-1/2 p-2 border border-gray-300 rounded-md"
                  />
                )}
              </div>
            ))}
          </form>
        </section>
        <section className="lg:w-1/2">
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mortgage Chart</h2>
            <div className="relative h-[70vh]">
              <canvas id="mortgageChart" />
            </div>
          </div>
        </section>
        
      </div>
      <section className="">
          <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">Schedule Details</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Principal Payment ($)</th>
                <th className="border border-gray-300 p-2">Interest Payment ($)</th>
                <th className="border border-gray-300 p-2">Total Payment ($)</th>
                <th className="border border-gray-300 p-2">Remaining Balance ($)</th>
                <th className="border border-gray-300 p-2">Property Taxes ($)</th>
                <th className="border border-gray-300 p-2">Home Insurance ($)</th>
                <th className="border border-gray-300 p-2">PMI ($)</th>
                <th className="border border-gray-300 p-2">HOA Fees ($)</th>
                <th className="border border-gray-300 p-2">Other Costs ($)</th>
                <th className="border border-gray-300 p-2">Total Annual Cost ($)</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{data.year}</td>
                  <td className="border border-gray-300 p-2">{data.principalPayment}</td>
                  <td className="border border-gray-300 p-2">{data.interestPayment}</td>
                  <td className="border border-gray-300 p-2">{data.totalPayment}</td>
                  <td className="border border-gray-300 p-2">{data.remainingBalance}</td>
                  <td className="border border-gray-300 p-2">{data.propertyTaxes}</td>
                  <td className="border border-gray-300 p-2">{data.homeInsurance}</td>
                  <td className="border border-gray-300 p-2">{data.pmi}</td>
                  <td className="border border-gray-300 p-2">{data.hoaFees}</td>
                  <td className="border border-gray-300 p-2">{data.otherCosts}</td>
                  <td className="border border-gray-300 p-2">{data.totalAnnualCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </div>
  );
};

export default MortgageCalculator;

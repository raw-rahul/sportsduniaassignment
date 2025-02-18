import { useState, useEffect } from "react";
import PayoutTable from "../../components/PayoutTable";
import { exportToCSV, exportToPDF } from "../../utils/helpers";
import "./Payout.css"; 

const Payout = () => {
  const initialData = [
    { author: "John Doe", articles: 5, rate: 10 },
    { author: "Jane Smith", articles: 3, rate: 15 },
  ];

  const [payouts, setPayouts] = useState(
    () => JSON.parse(localStorage.getItem("payouts")) || initialData
  );

  useEffect(() => {
    localStorage.setItem("payouts", JSON.stringify(payouts));
  }, [payouts]);

  const handleExportCSV = () => {
    const csvData = payouts.map((item) => ({
      Author: item.author,
      Articles: item.articles,
      Rate: item.rate,
      TotalPayout: item.articles * item.rate,
    }));
    exportToCSV(csvData, "payouts.csv");
  };

  const handleExportPDF = () => {
    const pdfData = payouts.map((item) => ({
      Author: item.author,
      Articles: item.articles,
      Rate: item.rate,
      TotalPayout: item.articles * item.rate,
    }));
    exportToPDF(pdfData, "payouts.pdf");
  };

  const totalPayoutAmount = payouts.reduce(
    (sum, item) => sum + item.articles * item.rate,
    0
  );

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="payout-container">
        <h1 className="payout-header text-3xl">Payout Calculator</h1>
        
        <div className="payout-table-container">
          <PayoutTable payouts={payouts} setPayouts={setPayouts} />
        </div>

        <div className="payout-footer">
          <div className="total-amount">
            Total Payout: ₹ {totalPayoutAmount.toFixed(2)}
          </div>
          <div className="export-buttons">
            <button onClick={handleExportCSV} className="export-button csv">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
            <button onClick={handleExportPDF} className="export-button pdf">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payout;
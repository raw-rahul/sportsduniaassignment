const PayoutTable = ({ payouts, setPayouts }) => {
  const handleRateChange = (index, rate) => {
    const updatedPayouts = payouts.map((item, i) =>
      i === index ? { ...item, rate: parseFloat(rate) || 0 } : item
    );
    setPayouts(updatedPayouts);
  };

  return (
    <table className="payout-table">
      <thead>
        <tr>
          <th>Author</th>
          <th>Articles</th>
          <th>Rate (₹)</th>
          <th>Total Payout (₹)</th>
        </tr>
      </thead>
      <tbody>
        {payouts.map((item, index) => (
          <tr key={index}>
            <td>{item.author}</td>
            <td>{item.articles}</td>
            <td>
              <input
                type="number"
                value={item.rate}
                onChange={(e) => handleRateChange(index, e.target.value)}
                className="rate-input"
                min="0"
                step="0.1"
              />
            </td>
            <td className="payout-amount">
              ₹ {(item.articles * item.rate).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PayoutTable;
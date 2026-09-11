import { useState } from "react";

function AIAnomalyAlert() {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState("");

  const handleCheck = () => {
    const savedMilk = localStorage.getItem("milkRecords");

    if (!savedMilk) {
      setMessage("No milk data available for analysis.");
      setAlerts([]);
      return;
    }

    const milkRecords = JSON.parse(savedMilk);

    if (milkRecords.length === 0) {
      setMessage("No milk records available for analysis.");
      setAlerts([]);
      return;
    }

    const unusualRecords = [];

    milkRecords.forEach((record) => {
      const quantity = Number(record.quantity || 0);
      const fat = Number(record.fat || 0);
      const snf = Number(record.snf || 0);

      let reasons = [];

      // Unusual quantity
      if (quantity < 2 || quantity > 30) {
        reasons.push("Unusual milk quantity");
      }

      // Unusual Fat
      if (fat < 2 || fat > 8) {
        reasons.push("Unusual Fat value");
      }

      // Unusual SNF
      if (snf < 7 || snf > 10) {
        reasons.push("Unusual SNF value");
      }

      if (reasons.length > 0) {
        unusualRecords.push({
          ...record,
          reasons: reasons,
        });
      }
    });

    setAlerts(unusualRecords);

    if (unusualRecords.length === 0) {
      setMessage("No unusual milk readings found.");
    } else {
      setMessage(
        `${unusualRecords.length} unusual milk reading(s) detected.`
      );
    }
  };

  return (
    <div>
      <h1>⚠️ AI Unusual Milk Reading Alert</h1>

      <p>
        This module checks milk quantity, Fat and SNF values
        and identifies unusual readings.
      </p>

      <hr />

      <button onClick={handleCheck}>
        🔍 Check Milk Readings
      </button>

      <p>{message}</p>

      {alerts.length > 0 && (
        <>
          <hr />

          <h2>⚠️ Unusual Readings</h2>

          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Quantity</th>
                <th>Fat</th>
                <th>SNF</th>
                <th>Alert Reason</th>
              </tr>
            </thead>

            <tbody>
              {alerts.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.session}</td>
                  <td>{record.quantity} L</td>
                  <td>{record.fat}</td>
                  <td>{record.snf}</td>
                  <td>
                    {record.reasons.map((reason, index) => (
                      <div key={index}>⚠️ {reason}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {alerts.length === 0 && message === "No unusual milk readings found." && (
        <>
          <hr />
          <h3>✅ All Readings Look Normal</h3>
          <p>
            No unusual Fat, SNF or milk quantity was detected
            in the available records.
          </p>
        </>
      )}

      <hr />

      <h3>💡 AI Insight</h3>

      <p>
        Unusual readings can help the farmer identify possible
        data-entry mistakes or milk-quality changes.
      </p>
    </div>
  );
}

export default AIAnomalyAlert;
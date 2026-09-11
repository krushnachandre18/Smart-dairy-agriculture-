import { useState } from "react";

function AIForecast() {
  const [forecast, setForecast] = useState(null);
  const [message, setMessage] = useState("");

  const handleForecast = () => {
    const savedMilk = localStorage.getItem("milkRecords");

    if (!savedMilk) {
      setMessage("No milk data available for AI forecast.");
      setForecast(null);
      return;
    }

    const milkRecords = JSON.parse(savedMilk);

    if (milkRecords.length === 0) {
      setMessage("No milk records available for AI forecast.");
      setForecast(null);
      return;
    }

    const totalMilk = milkRecords.reduce(
      (total, record) => total + Number(record.quantity || 0),
      0
    );

    const averageMilk = totalMilk / milkRecords.length;

    // Simple forecast
    const predictedMilk = averageMilk.toFixed(2);

    setForecast({
      totalMilk: totalMilk.toFixed(2),
      averageMilk: averageMilk.toFixed(2),
      predictedMilk: predictedMilk,
    });

    setMessage("AI Milk Forecast generated successfully!");
  };

  return (
    <div>
      <h1>🤖 AI Milk Production Forecast</h1>

      <p>
        This module analyzes previous milk records and gives
        a simple prediction for future milk production.
      </p>

      <hr />

      <button onClick={handleForecast}>
        🔮 Generate Milk Forecast
      </button>

      <p>{message}</p>

      {forecast && (
        <>
          <hr />

          <h2>📊 AI Forecast Result</h2>

          <h3>🥛 Total Recorded Milk</h3>
          <p>{forecast.totalMilk} Litres</p>

          <h3>📈 Average Milk Production</h3>
          <p>{forecast.averageMilk} Litres</p>

          <h3>🔮 Predicted Milk Production</h3>
          <p>{forecast.predictedMilk} Litres</p>

          <hr />

          <h3>💡 AI Insight</h3>

          <p>
            Based on the available milk records, the expected
            milk production is approximately{" "}
            <b>{forecast.predictedMilk} Litres</b>.
          </p>
        </>
      )}
    </div>
  );
}

export default AIForecast;
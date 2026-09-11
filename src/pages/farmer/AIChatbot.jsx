import { useState } from "react";
import "./AIChatbot.css";

function AIChatbot() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "AI",
      text: "Hello! 👋 I am Smart Dairy AI Assistant. How can I help you?"
    }
  ]);

  // Get data from localStorage
  const getData = () => {
    const milkRecords = JSON.parse(
      localStorage.getItem("milkRecords") || "[]"
    );

    const incomeRecords = JSON.parse(
      localStorage.getItem("incomeRecords") || "[]"
    );

    const expenseRecords = JSON.parse(
      localStorage.getItem("expenseRecords") || "[]"
    );

    const cows = JSON.parse(
      localStorage.getItem("cows") || "[]"
    );

    return {
      milkRecords,
      incomeRecords,
      expenseRecords,
      cows
    };
  };

  // 1. Milk Forecast
  const milkForecast = () => {
    const { milkRecords } = getData();

    if (milkRecords.length === 0) {
      return "No milk records available for forecasting. 🥛";
    }

    const totalMilk = milkRecords.reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

    const averageMilk = totalMilk / milkRecords.length;

    return `🥛 Milk Forecast: Based on your recorded data, expected milk production is approximately ${averageMilk.toFixed(
      2
    )} Litres per entry.`;
  };

  // 2. Expense Analysis
  const expenseAnalysis = () => {
    const { expenseRecords } = getData();

    if (expenseRecords.length === 0) {
      return "No expense records available. 💸";
    }

    const totalExpense = expenseRecords.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );

    const averageExpense =
      totalExpense / expenseRecords.length;

    const highestExpense = Math.max(
      ...expenseRecords.map((expense) =>
        Number(expense.amount || 0)
      )
    );

    return `💸 Expense Analysis:
Total Expense: ₹${totalExpense}
Average Expense: ₹${averageExpense.toFixed(2)}
Highest Expense: ₹${highestExpense}`;
  };

  // 3. Profit Analysis
  const profitAnalysis = () => {
    const { incomeRecords, expenseRecords } = getData();

    const totalIncome = incomeRecords.reduce(
      (total, income) =>
        total + Number(income.amount || 0),
      0
    );

    const totalExpense = expenseRecords.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );

    const profit = totalIncome - totalExpense;

    if (profit > 0) {
      return `📊 Profit Analysis:
Total Income: ₹${totalIncome}
Total Expense: ₹${totalExpense}
Current Profit: ₹${profit} 📈`;
    }

    if (profit < 0) {
      return `📊 Profit Analysis:
Total Income: ₹${totalIncome}
Total Expense: ₹${totalExpense}
Current Loss: ₹${Math.abs(profit)} ⚠️`;
    }

    return "📊 Currently there is no profit or loss.";
  };

  // 4. Unusual Milk Reading Alert
  const anomalyAlert = () => {
    const { milkRecords } = getData();

    if (milkRecords.length === 0) {
      return "No milk records available for anomaly checking.";
    }

    const unusualRecords = milkRecords.filter((record) => {
      const quantity = Number(record.quantity || 0);
      const fat = Number(record.fat || 0);
      const snf = Number(record.snf || 0);

      return (
        quantity < 2 ||
        quantity > 30 ||
        fat < 2 ||
        fat > 8 ||
        snf < 7 ||
        snf > 10
      );
    });

    if (unusualRecords.length === 0) {
      return "✅ No unusual milk readings detected.";
    }

    return `⚠️ Alert: ${unusualRecords.length} unusual milk reading(s) detected. Please check the milk records.`;
  };

  // 5. General Chatbot
  const getAIResponse = (question) => {
    const q = question.toLowerCase();

    const { milkRecords, incomeRecords, expenseRecords, cows } =
      getData();

    const totalMilk = milkRecords.reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

    const totalIncome = incomeRecords.reduce(
      (total, record) =>
        total + Number(record.amount || 0),
      0
    );

    const totalExpense = expenseRecords.reduce(
      (total, record) =>
        total + Number(record.amount || 0),
      0
    );

    const profit = totalIncome - totalExpense;

    if (
      q.includes("milk") ||
      q.includes("दूध") ||
      q.includes("दुध")
    ) {
      return `Your recorded milk production is ${totalMilk} Litres. 🥛`;
    }

    if (
      q.includes("cow") ||
      q.includes("cows") ||
      q.includes("गाय")
    ) {
      return `You currently have ${cows.length} cows registered. 🐄`;
    }

    if (
      q.includes("income") ||
      q.includes("earning") ||
      q.includes("कमाई") ||
      q.includes("उत्पन्न")
    ) {
      return `Your total recorded income is ₹${totalIncome}. 💰`;
    }

    if (
      q.includes("expense") ||
      q.includes("expenses") ||
      q.includes("खर्च")
    ) {
      return `Your total recorded expenses are ₹${totalExpense}. 💸`;
    }

    if (
      q.includes("profit") ||
      q.includes("loss") ||
      q.includes("नफा") ||
      q.includes("तोटा")
    ) {
      if (profit > 0) {
        return `Your current profit is ₹${profit}. 📈`;
      }

      if (profit < 0) {
        return `Your current loss is ₹${Math.abs(profit)}. ⚠️`;
      }

      return "Currently there is no profit or loss. ➖";
    }

    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("नमस्कार")
    ) {
      return "Hello! 👋 I am ready to help you with your dairy and farm data.";
    }

    return "I can help you with Milk, Cows, Income, Expenses, Profit/Loss and AI analysis. 🤖";
  };

  // Send chatbot message
  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    const userMessage = {
      sender: "You",
      text: message
    };

    const aiMessage = {
      sender: "AI",
      text: getAIResponse(message)
    };

    setChat((previousChat) => [
      ...previousChat,
      userMessage,
      aiMessage
    ]);

    setMessage("");
  };

  // AI feature button
  const runFeature = (featureName, response) => {
    setChat((previousChat) => [
      ...previousChat,
      {
        sender: "You",
        text: featureName
      },
      {
        sender: "AI",
        text: response
      }
    ]);
  };

  return (
  <div className="ai-chatbot-page">

    {/* Header */}
    <div className="ai-chatbot-header">
      <div className="ai-chatbot-icon">🤖</div>
      <div>
        <h1>Smart Dairy AI Assistant</h1>
        <p>Your intelligent assistant for dairy and farm management.</p>
      </div>
    </div>

    {/* AI Insights */}
    <div className="ai-insights-card">
      <div className="ai-section-title">
        <div>
          <h2>🧠 AI Insights</h2>
          <p>Get quick analysis from your dairy and farm data.</p>
        </div>
      </div>

      <div className="ai-insights-grid">

        <button
          className="ai-insight-button"
          onClick={() =>
            runFeature("🥛 Milk Forecast", milkForecast())
          }
        >
          <span>🥛</span>
          <strong>Milk Forecast</strong>
          <small>Analyze milk production</small>
        </button>

        <button
          className="ai-insight-button"
          onClick={() =>
            runFeature("💸 Expense Analysis", expenseAnalysis())
          }
        >
          <span>💸</span>
          <strong>Expense Analysis</strong>
          <small>Analyze farm expenses</small>
        </button>

        <button
          className="ai-insight-button"
          onClick={() =>
            runFeature("📊 Profit Analysis", profitAnalysis())
          }
        >
          <span>📊</span>
          <strong>Profit Analysis</strong>
          <small>Check profit and loss</small>
        </button>

        <button
          className="ai-insight-button"
          onClick={() =>
            runFeature(
              "⚠️ Unusual Milk Reading",
              anomalyAlert()
            )
          }
        >
          <span>⚠️</span>
          <strong>Milk Alert</strong>
          <small>Detect unusual readings</small>
        </button>

      </div>
    </div>

    {/* Chat */}
    <div className="ai-chat-card">

      <div className="ai-chat-header">
        <div>
          <h2>💬 AI Chat</h2>
          <p>Ask questions about your dairy and farm data.</p>
        </div>

        <div className="ai-online-status">
          <span></span>
          AI Online
        </div>
      </div>

      <div className="chat-messages">

        {chat.map((item, index) => (
          <div
            key={index}
            className={`chat-message ${
              item.sender === "You" ? "user-message" : "ai-message"
            }`}
          >

            <div className="chat-avatar">
              {item.sender === "You" ? "👤" : "🤖"}
            </div>

            <div className="chat-bubble">
              <div className="chat-sender">
                {item.sender === "You" ? "You" : "Smart Dairy AI"}
              </div>

              <div className="chat-text">
                {item.text}
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* Quick Questions */}
      <div className="quick-questions">

        <h3>💡 Quick Questions</h3>

        <div className="quick-question-grid">

          <button
            onClick={() =>
              runFeature(
                "How much milk do I have?",
                getAIResponse("milk")
              )
            }
          >
            🥛 Milk
          </button>

          <button
            onClick={() =>
              runFeature(
                "How many cows do I have?",
                getAIResponse("cows")
              )
            }
          >
            🐄 Cows
          </button>

          <button
            onClick={() =>
              runFeature(
                "What is my income?",
                getAIResponse("income")
              )
            }
          >
            💰 Income
          </button>

          <button
            onClick={() =>
              runFeature(
                "What are my expenses?",
                getAIResponse("expenses")
              )
            }
          >
            💸 Expenses
          </button>

          <button
            onClick={() =>
              runFeature(
                "What is my profit?",
                getAIResponse("profit")
              )
            }
          >
            📊 Profit
          </button>

        </div>

      </div>

      {/* Message Input */}
      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Ask something about your dairy or farm..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          Send ➤
        </button>

      </div>

    </div>

    {/* Footer */}
    <div className="ai-chatbot-footer">
      <p>🤖 Smart Dairy AI Assistant</p>
      <small>Helping you manage your dairy and farm smarter.</small>
    </div>

  </div>
);
}

export default AIChatbot;
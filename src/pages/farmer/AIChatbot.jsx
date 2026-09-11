import { useState } from "react";

function AIChatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "AI",
      text: "Hello! 👋 I am Smart Dairy AI Assistant. How can I help you?"
    }
  ]);

  const getAIResponse = (question) => {
    const q = question.toLowerCase();

    // Milk Data
    const milkRecords = JSON.parse(
      localStorage.getItem("milkRecords") || "[]"
    );

    const totalMilk = milkRecords.reduce(
      (total, record) => total + Number(record.quantity || 0),
      0
    );

    // Income Data
    const incomeRecords = JSON.parse(
      localStorage.getItem("incomeRecords") || "[]"
    );

    const totalIncome = incomeRecords.reduce(
      (total, income) => total + Number(income.amount || 0),
      0
    );

    // Expense Data
    const expenseRecords = JSON.parse(
      localStorage.getItem("expenseRecords") || "[]"
    );

    const totalExpense = expenseRecords.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

    const profit = totalIncome - totalExpense;

    // Cow Data
    const cows = JSON.parse(
      localStorage.getItem("cows") || "[]"
    );

    // Milk questions
    if (
      q.includes("milk") ||
      q.includes("milk production") ||
      q.includes("दूध")
    ) {
      return `Your recorded milk production is ${totalMilk} Litres. 🥛`;
    }

    // Cow questions
    if (
      q.includes("cow") ||
      q.includes("cows") ||
      q.includes("गाय")
    ) {
      return `You currently have ${cows.length} cows registered in the system. 🐄`;
    }

    // Income questions
    if (
      q.includes("income") ||
      q.includes("earning") ||
      q.includes("कमाई")
    ) {
      return `Your total recorded income is ₹${totalIncome}. 💰`;
    }

    // Expense questions
    if (
      q.includes("expense") ||
      q.includes("expenses") ||
      q.includes("खर्च")
    ) {
      return `Your total recorded expenses are ₹${totalExpense}. 💸`;
    }

    // Profit questions
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

    // Help
    if (
      q.includes("help") ||
      q.includes("what can you do")
    ) {
      return "I can help you with Milk, Cows, Income, Expenses and Profit/Loss. 🤖";
    }

    return "Sorry, I don't understand that question yet. Try asking about milk, cows, income, expenses or profit.";
  };

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

  return (
    <div>
      <h1>🤖 Smart Dairy AI Assistant</h1>

      <p>
        Ask questions about your dairy and farm data.
      </p>

      <hr />

      {/* Chat Area */}

      <div>
        {chat.map((item, index) => (
          <div key={index}>
            <p>
              <b>{item.sender}:</b> {item.text}
            </p>
          </div>
        ))}
      </div>

      <hr />

      {/* Message Input */}

      <input
        type="text"
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>

      <hr />

      <h3>💡 Try asking:</h3>

      <p>• How much milk did I produce?</p>
      <p>• How many cows do I have?</p>
      <p>• What is my income?</p>
      <p>• What are my expenses?</p>
      <p>• What is my profit?</p>
    </div>
  );
}

export default AIChatbot;
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();

async function getTransactionSummary(address) {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "1") {
    throw new Error(data.message || "Failed to fetch transactions");
  }

  const transactions = data.result.slice(0, 5); // grab the latest 5
  let summary = "";

  for (const tx of transactions) {
    const valueEth = parseFloat(tx.value) / 1e18;
    const direction = tx.from.toLowerCase() === address.toLowerCase() ? "sent" : "received";
    summary += `Wallet ${direction} ${valueEth.toFixed(4)} ETH to/from ${tx.to} on ${new Date(tx.timeStamp * 1000).toLocaleDateString()}. `;
  }

  return summary;
}

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});
async function getWalletBalance(address) {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "1") {
    throw new Error(data.message || "Failed to fetch balance");
  }

  const eth = parseFloat(data.result) / 1e18;
  return eth.toFixed(4); // return balance in ETH, 4 decimal places
}

app.post("/explain", async (req, res) => {
  const { wallet } = req.body;

  try {
    const [balance, txSummary] = await Promise.all([
      getWalletBalance(wallet),
      getTransactionSummary(wallet)
    ]);

    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `Summarize the behavior of this Ethereum wallet: ${txSummary}`,
        parameters: { max_new_tokens: 100 }
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    res.json({
      message: data[0].generated_text,
      balance: balance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

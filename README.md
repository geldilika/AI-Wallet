#  AI Wallet Explainer

**AI Wallet Explainer** is a full-stack web app that analyzes any Ethereum wallet and uses a language model to explain its on-chain behavior in plain English.

Built for the **"Create your Agentic Future"** Hackathon, this project showcases how AI agents can interpret blockchain data for transparency, insight, and user-friendly interaction.

---

##  Features

-  Enter any Ethereum wallet address
-  Fetches recent transactions from Etherscan
-  Uses AI (via Hugging Face) to summarize activity
-  Displays wallet ETH balance
-  Clean, responsive user interface

---

##  How It Works

1. **User enters an Ethereum wallet address** in the web interface
2. The backend:
   - Uses the **Etherscan API** to get recent transactions + balance
   - Formats a summary of the wallet activity
   - Sends that summary to a **Hugging Face text generation model**
3. The AI returns a natural-language explanation of the wallet behavior
4. The frontend displays both the **ETH balance** and **AI summary**

---

##  Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js + Express
- **APIs**:
  - Etherscan (wallet data + balance)
  - Hugging Face  for language generation
- **Platform**: Replit (deployed app + development)
- **GitHub**: SSH-authenticated, CI-ready
---

##  Running Locally

> You’ll need Node.js + an `.env` file with:
> - `HF_API_KEY=your_huggingface_key`
> - `ETHERSCAN_API_KEY=your_etherscan_key`

---
Why It Matters
This project explores the future of agentic AI in Web3:

- AI can make blockchain data understandable  
- Wallets can become self-explaining agents  
- Builds trust by demystifying on-chain activity  
### 🚀 Live Demo
Try it yourself here -> https://29256a57-4ba2-444f-b31a-2cdd98f44c1f-00-18d48o8w1x4op.picard.replit.dev/


Demo here : https://www.loom.com/share/a1a542ec5ea140fcac845f679b47a1a9?sid=314744e6-f3af-4b1c-9177-6eee7c130acd

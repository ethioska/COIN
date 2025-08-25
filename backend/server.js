const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {}; // store user balances (in-memory for now)

// 🚀 test endpoint
app.get("/", (req, res) => {
  res.send("Telegram Mini App Backend Running...");
});

// register new user
app.post("/register", (req, res) => {
  const { userId } = req.body;
  if (!users[userId]) {
    users[userId] = { coins: { NC: 5 }, referrals: [] }; // give 5 NC initially
  }
  res.json(users[userId]);
});

// place a bet
app.post("/bet", (req, res) => {
  const { userId, amount } = req.body;
  if (!users[userId] || users[userId].coins.NC < amount) {
    return res.status(400).json({ error: "Not enough coins" });
  }
  users[userId].coins.NC -= amount;
  res.json({ success: true, balance: users[userId].coins.NC });
});

// referral system
app.post("/referral", (req, res) => {
  const { referrerId, newUserId } = req.body;
  if (users[referrerId] && users[newUserId]) {
    users[referrerId].coins.NC += 0.0005; // reward
    users[referrerId].referrals.push(newUserId);
  }
  res.json(users[referrerId]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

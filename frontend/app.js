const tg = window.Telegram.WebApp;
const backendUrl = "http://localhost:5000"; // change to your server later

document.getElementById("register").addEventListener("click", async () => {
  const userId = tg.initDataUnsafe?.user?.id || "guest_" + Date.now();
  const res = await fetch(`${backendUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  document.getElementById("status").innerText = "Registered! Balance: " + data.coins.NC + " NC";
});

document.getElementById("place-bet").addEventListener("click", async () => {
  const userId = tg.initDataUnsafe?.user?.id || "guest_" + Date.now();
  const res = await fetch(`${backendUrl}/bet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, amount: 1 })
  });
  const data = await res.json();
  document.getElementById("status").innerText = data.success
    ? "Bet placed! New balance: " + data.balance
    : "Error: " + data.error;
});

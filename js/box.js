window.onload = () => {
  // ALL YOUR CODE GOES INSIDE THIS

  const API_URL = "http://localhost:3000";

  document.getElementById("submitCode").addEventListener("click", async (e) => {
    e.preventDefault();

    const userCode = document.getElementById("accessCodeInput").value.trim().toUpperCase();

    if (!userCode) {
      document.getElementById("message").textContent = "❌ Please enter a code.";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/check-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userCode })
      });

      const result = await response.json();

      if (result.valid) {
        await fetch(`${API_URL}/mark-used`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: userCode })
        });

        document.getElementById("message").textContent = "✅ Code accepted.";
        document.getElementById("accessCodeInput").style.display = "none";
        document.getElementById("submitCode").style.display = "none";
        document.getElementById("boxContent").style.display = "block";
      } else {
        document.getElementById("message").textContent = "❌ Invalid or already used code.";
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      document.getElementById("message").textContent = "⚠️ Server error. Please try again later.";
    }
  });

  let hintStep = 0;
  document.getElementById("showHintBtn").addEventListener("click", () => {
    hintStep++;
    if (hintStep === 1) {
      alert("🔍 Hint 1: 'Look beyond what you see. The answer lies in the shadow.'");
      document.getElementById("showHintBtn").textContent = "Reveal Hint 2";
    } else if (hintStep === 2) {
      alert("🔍 Hint 2: 'It’s not a riddle, it’s a direction. Follow it.'");
      document.getElementById("showHintBtn").textContent = "Reveal Hint 3";
    } else if (hintStep === 3) {
      alert("🔍 Hint 3: 'You know the truth. The symbols were always there.'");
      document.getElementById("showHintBtn").remove();

      const extraBtn = document.createElement("button");
      extraBtn.textContent = "Buy Extra Hint (£2)";
      extraBtn.classList.add("button");
      extraBtn.id = "buyExtraHint";
      document.getElementById("boxContent").appendChild(extraBtn);

      extraBtn.addEventListener("click", () => {
        alert("✅ Simulated payment successful.");
        extraBtn.remove();

        const extraHint = document.createElement("p");
        extraHint.innerHTML = "💡 Extra Hint: 'The answer is hidden inside what you touched last...'";
        document.getElementById("boxContent").appendChild(extraHint);
      });
    }
  });
};

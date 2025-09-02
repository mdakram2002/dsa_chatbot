
export async function sendMessageToServer(input) {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "user", text: input }
        ]
      }),
    });
    // console.log("API URL:", process.env.REACT_APP_BASE_URL);

    const data = await res.json();
    return data.reply || "No response from server.";
  } catch (err) {
    console.error(err);
    return "Error connecting to server.";
  }
}

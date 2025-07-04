const firebaseConfig = {
  apiKey: "AIzaSyCHl3IJqNmdlqM7uSdl4Jg5vW_F78v-uwM",
  authDomain: "chat-app-f6746.firebaseapp.com",
  projectId: "chat-app-f6746",
  storageBucket: "chat-app-f6746.appspot.com",
  messagingSenderId: "558803570428",
  appId: "1:558803570428:web:ba1cc9b16bc615b7029179",
  databaseURL: "https://chat-app-f6746-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const name = document.getElementById("username").value.trim();
  const text = document.getElementById("message").value.trim();
  if (!name || !text) return;

  const msg = {
    name: name,
    message: text,
    timestamp: Date.now()
  };

  db.ref("messages").push(msg);
  document.getElementById("message").value = "";
}

db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  const messagesDiv = document.getElementById("messages");
  const el = document.createElement("div");
  el.className = "message";
  el.innerHTML = `<strong>${msg.name}</strong>: ${msg.message} <br><small>${new Date(msg.timestamp).toLocaleTimeString()}</small>`;
  messagesDiv.appendChild(el);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

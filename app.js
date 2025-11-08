const projecrUrl = "https://ufxrfqhqvabdpwtnwtkh.supabase.co"
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeHJmcWhxdmFiZHB3dG53dGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDgzOTksImV4cCI6MjA3MzE4NDM5OX0.EHbeCZmpyJ9Olz_-Ytmjs6g6oJhfAkTPFVDyBH67zNo"
const { createClient } = supabase;
const client = createClient(projecrUrl, projectKey)

console.log(createClient);
console.log(client);

// ==========SIGNN UP WORK======== 

const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const btn = document.getElementById("btn")



btn && btn.addEventListener("click", async () => {
    const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                username: username.value
            }
        }
    })

    if (data) {
        const { error } = await client
            .from('user_details')
            .insert({ name: data.user.user_metadata.username, email: data.user.user_metadata.email })
        console.log(error, "error in store user data");
    }

    if (!data) {
        console.log(error, "user error");
    } else {
        console.log(data, "user Data");
        window.location.href = "login.html"
    }

})


// =========login WORK==========


const loginemail = document.getElementById("loginemail")
const loginpassword = document.getElementById("loginpassword")
const loginbtn = document.getElementById("loginbtn")



loginbtn && loginbtn.addEventListener("click", async () => {
    const { data, error } = await client.auth.signInWithPassword({
        email: loginemail.value,
        password: loginpassword.value,

    })

    if (error) {
        console.log(error, "login error");
        alert(error.message)
    } else {
        console.log(data, "login Data");
        window.location.href = "chatApp.html"
    }

})

// ==========SHOW USERS IN CHAT LIST==========


async function fetchUsers() {
    const { data, error } = await client
        .from('user_details')
        .select('name, id')

    if (error) {
        console.log(error, "Error in fetching users", error.message);

    } else {
        console.log(data, "user Fetch Successfully!");
        showUsers(data)
    }
}


let receiverId;
function showUsers(users) {
    const showAllUsers = document.getElementById("showAllUsers");
    showAllUsers.innerHTML = "";

    users.forEach((list) => {
        console.log(list);
        const firstLetter = list.name ? list.name.charAt(0).toUpperCase() : "?";

        showAllUsers.innerHTML += `
            <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer" data-userid="${list.id}">
                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
                    ${firstLetter}
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center">
                        <p class="font-semibold">${list.name}</p>
                        
                        </div>
                        <p class="text-gray-400 text-sm"> Tap to chat...</p>
                        </div>
                        </div>
                        `;
    });

    let chatUserName = document.getElementById("chatUserName")
    let chatView = document.getElementById("chatView")
    let welcomeView = document.getElementById("welcomeView")

    showAllUsers.addEventListener("click", function (e) {
        const clickedUser = e.target.closest(".cursor-pointer");
        if (!clickedUser) return;
        const userName = clickedUser.querySelector(".font-semibold").innerText;
        receiverId = clickedUser.dataset.userid


        console.log(receiverId, "receiver ki id mil rhi hai");

        welcomeView.classList.add("hidden");
        chatView.classList.remove("hidden");
        chatUserName.innerText = userName;
        loadChat();
        initChat()
    });
}


fetchUsers()


// ==========GET LOGIN USER=============
let currentUserId;
async function getCurrentUser() {
    const { data, error } = await client.auth.getUser()
    if (error) {
        console.log(error, "getting user error");
    } else {
        console.log(data, "user get Successfully!");
        console.log(data.user.id, "currunt user ki id mil rhi hai ");
        currentUserId = data.user.id;

    }
}


getCurrentUser()

// ========start chating==========

const messages = document.getElementById("messages")
const messageInput = document.getElementById("messageInput")
const sendBtn = document.getElementById("sendBtn")

sendBtn.addEventListener("click", messageSend)

messageInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        messageSend()
    }
})




// ===========CURRENT MESSAGE===========

async function messageSend() {
    const msg = messageInput.value.trim();
    if (msg !== "" && currentUserId && receiverId) {
        console.log(receiverId, "id aarhai hai");
    }

    let msgDiv = document.createElement("div")
    msgDiv.className = "flex justify-end gap-0"

    msgDiv.innerHTML = `
         <div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">${msg}</div>
         `
    messages.appendChild(msgDiv)

    const startChatting = document.getElementById("startChatting")
    if (startChatting) startChatting.remove()
    messages.scrollTop = messages.scrollHeight;
    messageInput.value = "";

    const { error } = await client
        .from('Chatting')
        .insert({ message: msg, sender_id: currentUserId, receiver_id: receiverId, created_at: new Date().toISOString() })

    if (error) {
        console.log(error, "error in insert chatting table");
    } else {
        console.log("successfully insert data in chatting table");

    }

}


// ==========loadChat function=========
async function loadChat() {
  if (!receiverId || !currentUserId) return;

  const { data, error } = await client
    .from('Chatting')
    .select('*')
    .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`)
    .order('created_at', { ascending: true });

  if (error) {
    console.log(error);
    return;
  }

  messages.innerHTML = "";

  data.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
    msgDiv.innerHTML = `
      <div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">
        ${msg.message}
      </div>`;
    messages.appendChild(msgDiv);
  });

  messages.scrollTop = messages.scrollHeight;
}


// ==========receiverSIDE MESSAGE========let currentUserId;


// get current user first
async function initChat() {
  const { data, error } = await client.auth.getUser();
  if (error) return console.log("🚨 Error getting current user:", error.message);
  
  currentUserId = data.user.id;
  console.log("👤 Current User ID:", currentUserId);

  const chatChannel = client.channel("public:Chatting");

  chatChannel.on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "Chatting" },
    (payload) => {
      const msg = payload.new;
      console.log("📩 Realtime message received:", msg);

      // Check if related to current chat
      if (
        (msg.sender_id === currentUserId && msg.receiver_id === receiverId) ||
        (msg.sender_id === receiverId && msg.receiver_id === currentUserId)
      ) {
        const senderIsCurrentUser = msg.sender_id === currentUserId;
        console.log(
          senderIsCurrentUser
            ? "👀 Message belongs to me (sender)"
            : "📬 Message received from other user"
        );

        appendMessage(msg.message, senderIsCurrentUser);
      } else {
        console.log("⚠️ Message ignored (not for this chat).");
      }
    }
  );

  await chatChannel.subscribe();
  console.log("✅ Subscribed to realtime Chatting table");
}


// helper function to append messages
function appendMessage(msg, isSender) {
  console.log(`🧱 Appending message: "${msg}" | from: ${isSender ? "Me" : "Other"}`);
  const msgDiv = document.createElement("div");
  msgDiv.className = isSender ? "flex justify-end" : "flex justify-start";
  msgDiv.innerHTML = `
    <div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">
      ${msg}
    </div>`;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}


// call initChat to start everything
initChat();



// msg sending Time set krna hai bd me
// <p class="text-xs text-gray-400">${new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
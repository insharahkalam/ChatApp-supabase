  // const projecrUrl = "https://ufxrfqhqvabdpwtnwtkh.supabase.co"
  // const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeHJmcWhxdmFiZHB3dG53dGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDgzOTksImV4cCI6MjA3MzE4NDM5OX0.EHbeCZmpyJ9Olz_-Ytmjs6g6oJhfAkTPFVDyBH67zNo"
  // const { createClient } = supabase;
  // const client = createClient(projecrUrl, projectKey)

  // console.log(createClient);
  // console.log(client);


  // // ==========signup work=========

  // const username = document.getElementById("username")
  // const email = document.getElementById("email")
  // const password = document.getElementById("password")
  // const btn = document.getElementById("btn")

  // btn && btn.addEventListener("click", async () => {
  //   const { data, error } = await client.auth.signUp({
  //     email: email.value,
  //     password: password.value,
  //     options: {
  //       data: {
  //         username: username.value
  //       }
  //     }
  //   })
  //   if (data) {
  //     console.log(data, "signup successfully!");

  //     const { error } = await client
  //       .from('user_data')
  //       .insert({ username: data.user.user_metadata.username, email: data.user.user_metadata.email})

  //     if (error) {
  //       console.log(error, "inserting data error");
  //     } else {
  //       alert("data insert successfully!!")
  //       window.location.href = "login.html"
  //     }


  //   } else {
  //     console.log(error, "error in singup");

  //   }
  // })


  // // ==========login work=========


  // const loginemail = document.getElementById("loginemail")
  // const loginpassword = document.getElementById("loginpassword")
  // const loginbtn = document.getElementById("loginbtn")

  // loginbtn && loginbtn.addEventListener("click", async () => {

  //   const { data, error } = await client.auth.signInWithPassword({
  //     email: loginemail.value,
  //     password: loginpassword.value,
  //   })

  //   if (error) {
  //     console.log(error, "error in login");
  //   } else {
  //     console.log(data, "login successfully!");
  //     window.location.href = "chatApp.html"
  //   }
  // })

  // // ==========SHOW USERS IN CHAT LIST==========

  // async function fetchUsers() {
  //   const { data, error } = await client
  //     .from('user_data')
  //     .select('username, id')

  //   if (error) {
  //     console.log(error, "Error in fetching users", error.message);

  //   } else {
  //     console.log(data, "user Fetch Successfully!");
  //     showUsers(data)
  //   }
  // }

  // let receiverId;
  // function showUsers(users) {
  //   const showAllUsers = document.getElementById("showAllUsers");
  //   showAllUsers.innerHTML = "";

  //   users.forEach((list) => {
  //     console.log(list);
  //     const firstLetter = list.username ? list.username.charAt(0).toUpperCase() : "?";

  //     showAllUsers.innerHTML += `
  //             <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer" data-userid="${list.id}">
  //                 <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
  //                     ${firstLetter}
  //                 </div>
  //                 <div class="flex-1">
  //                     <div class="flex justify-between items-center">
  //                         <p class="font-semibold">${list.username}</p>

  //                         </div>
  //                         <p class="text-gray-400 text-sm"> Tap to chat...</p>
  //                         </div>
  //                         </div>
  //                         `;
  //   });

  //   let chatUserName = document.getElementById("chatUserName")
  //   let chatView = document.getElementById("chatView")
  //   let welcomeView = document.getElementById("welcomeView")

  //   showAllUsers.addEventListener("click", function (e) {
  //     const clickedUser = e.target.closest(".cursor-pointer");
  //     if (!clickedUser) return;
  //     const userName = clickedUser.querySelector(".font-semibold").innerText;
  //     receiverId = clickedUser.dataset.userid

  //     console.log(receiverId, "receiver ki id mil rhi hai");

  //     welcomeView.classList.add("hidden");
  //     chatView.classList.remove("hidden");
  //     chatUserName.innerText = userName;
  //     loadChat();
  //     // initChat()
  //   });
  // }

  // fetchUsers()

  // // ==========GET LOGIN USER=============
  // let currentUserId;
  // async function getCurrentUser() {
  //   const { data, error } = await client.auth.getUser();
  //   if (error) {
  //     console.log(error, "getting user error");
  //   } else {
  //     currentUserId = data.user.id;
  //     console.log(currentUserId, "current user ID");

  //     // ===== Initialize real-time subscription AFTER we know currentUserId =====
  //     const chatChannel = client
  //       .channel('user-chats')
  //       .on(
  //         'postgres_changes',
  //         {
  //           event: 'INSERT',
  //           schema: 'public',
  //           table: 'user_chats',
  //           filter: `receiver_id=eq.${currentUserId}` // messages sent to me
  //         },
  //         (payload) => {
  //           const msg = payload.new;

  //           // Only show in the currently open chat
  //           if (msg.sender_id === receiverId) {
  //             const msgDiv = document.createElement("div");
  //             msgDiv.className = "flex justify-start";
  //             msgDiv.innerHTML = `
  //               <div class="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs break-words">
  //                 ${msg.message}
  //               </div>`;
  //             messages.appendChild(msgDiv);
  //             messages.scrollTop = messages.scrollHeight;
  //           }
  //         }
  //       )
  //       .subscribe();
  //   }
  // }


  // // ========start chating==========

  // const messages = document.getElementById("messages")
  // const messageInput = document.getElementById("messageInput")
  // const sendBtn = document.getElementById("sendBtn")

  // sendBtn && sendBtn.addEventListener("click", messageSend)

  // messageInput && messageInput.addEventListener("keypress", (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     messageSend()
  //   }
  // })

  // // ===========CURRENT MESSAGE===========

  // async function messageSend() {
  //   let msg = messageInput.value.trim();
  //   if (msg === "") return;

  //   if (!currentUserId || !receiverId) {
  //     console.log("❌ Missing IDs: currentUserId or receiverId not set");
  //     return;
  //   }


  //   // Send message to Supabase
  //   const { data, error } = await client
  //     .from("user_chats")
  //     .insert({
  //       message: msg,
  //       sender_id: currentUserId,
  //       receiver_id: receiverId,
  //       created_at: new Date().toISOString(),
  //     })
  //   console.log(msg);
  //   console.log(receiverId);



  //   if (error) {
  //     console.log("🚨 Error inserting message:", error.message);
  //   } else {
  //     console.log("✅ Message stored in Supabase:", data);
  //   }

  //   // Show immediately on sender screen
  //   let msgDiv = document.createElement("div");
  //   msgDiv.className = "flex justify-end";
  //   msgDiv.innerHTML = `
  //     <div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">
  //       ${msg}
  //     </div>`;
  //   messages.appendChild(msgDiv);
  //   messages.scrollTop = messages.scrollHeight;
  //   messageInput.value = "";
  // }


  // // =========loadchat=========

  // async function loadChat() {
  //   if (!currentUserId || !receiverId) return;

  //   const { data, error } = await client
  //     .from("user_chats")
  //     .select("*")
  //     .or(
  //       `and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`
  //     )
  //     .order("created_at", { ascending: true });

  //   if (error) {
  //     console.log(error, "Error fetching chat");
  //     return;
  //   }

  //   messages.innerHTML = ""; // Clear previous messages
  //   data.forEach((msg) => {
  //     const msgDiv = document.createElement("div");
  //     msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
  //     msgDiv.innerHTML = `
  //       <div class="${msg.sender_id === currentUserId ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-white'} px-4 py-2 rounded-lg max-w-xs break-words">
  //         ${msg.message}
  //       </div>`;
  //     messages.appendChild(msgDiv);
  //   });

  //   messages.scrollTop = messages.scrollHeight;
  // }



  // const projecrUrl = "https://ufxrfqhqvabdpwtnwtkh.supabase.co"
  // const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeHJmcWhxdmFiZHB3dG53dGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDgzOTksImV4cCI6MjA3MzE4NDM5OX0.EHbeCZmpyJ9Olz_-Ytmjs6g6oJhfAkTPFVDyBH67zNo"
  // const { createClient } = supabase;
  // const client = createClient(projecrUrl, projectKey)

  // console.log(createClient);
  // console.log(client);

  // // ========signup work========

  // const username = document.getElementById("username")
  // const email = document.getElementById("email")
  // const password = document.getElementById("password")
  // const btn = document.getElementById("btn")

  // btn && btn.addEventListener("click", async () => {
  //   const { data, error } = await client.auth.signUp({
  //     email: email.value,
  //     password: password.value,
  //     options: {
  //       data: { username: username.value }
  //     }
  //   })
  //   if (data) {
  //     console.log(data, "signup successfully!");
  //     const { error } = await client
  //       .from('user_data')
  //       .insert({ username: data.user.user_metadata.username, email: data.user.email })
  //     if (error) {
  //       console.log(error, "inserting data error");
  //     } else {
  //       alert("data insert successfully!!")
  //       window.location.href = "login.html"
  //     }
  //   } else {
  //     console.log(error, "error in singup");
  //   }
  // })

  // // ========login work========

  // const loginemail = document.getElementById("loginemail")
  // const loginpassword = document.getElementById("loginpassword")
  // const loginbtn = document.getElementById("loginbtn")

  // loginbtn && loginbtn.addEventListener("click", async () => {
  //   const { data, error } = await client.auth.signInWithPassword({
  //     email: loginemail.value,
  //     password: loginpassword.value,
  //   })
  //   if (error) {
  //     console.log(error, "error in login");
  //   } else {
  //     console.log(data, "login successfully!");
  //     window.location.href = "chatApp.html"
  //   }
  // })

  // // ========show users========

  // async function fetchUsers() {
  //   const { data, error } = await client.from('user_data').select('username, id')
  //   if (error) {
  //     console.log(error, "Error in fetching users", error.message);
  //   } else {
  //     console.log(data, "user Fetch Successfully!");
  //     showUsers(data)
  //   }
  // }

  // let receiverId;
  // function showUsers(users) {
  //   const showAllUsers = document.getElementById("showAllUsers");
  //   showAllUsers.innerHTML = "";

  //   users.forEach((list) => {
  //     const firstLetter = list.username ? list.username.charAt(0).toUpperCase() : "?";
  //     showAllUsers.innerHTML += `
  //       <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer" data-userid="${list.id}">
  //         <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
  //           ${firstLetter}
  //         </div>
  //         <div class="flex-1">
  //           <div class="flex justify-between items-center">
  //             <p class="font-semibold">${list.username}</p>
  //           </div>
  //           <p class="text-gray-400 text-sm"> Tap to chat...</p>
  //         </div>
  //       </div>`;
  //   });

  //   let chatUserName = document.getElementById("chatUserName")
  //   let chatView = document.getElementById("chatView")
  //   let welcomeView = document.getElementById("welcomeView")

  //   showAllUsers.addEventListener("click", function (e) {
  //     const clickedUser = e.target.closest(".cursor-pointer");
  //     if (!clickedUser) return;
  //     receiverId = clickedUser.dataset.userid
  //     chatUserName.innerText = clickedUser.querySelector(".font-semibold").innerText

  //     welcomeView.classList.add("hidden")
  //     chatView.classList.remove("hidden")
  //     loadChat()
  //     messageInput.disabled = false
  //     sendBtn.disabled = false
  //   });
  // }



  // // ========get current user========

  // let currentUserId;
  // async function getCurrentUser() {
  //   const { data, error } = await client.auth.getUser();
  //   if (error) {
  //     console.log(error, "getting user error");
  //   } else {
  //     currentUserId = data.user.id;
  //     console.log(currentUserId, "current user ID");

  //     // ===== Initialize real-time subscription after currentUserId is ready =====
  // client
  //   .channel('user-chats')
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: 'INSERT',
  //       schema: 'public',
  //       table: 'user_chats'
  //       // no filter, subscribe to all inserts
  //     },
  //     (payload) => {
  //       const msg = payload.new;

  //       // show message only if current chat is open with this sender
  //       if (
  //         (msg.sender_id === receiverId && msg.receiver_id === currentUserId) ||
  //         (msg.sender_id === currentUserId && msg.receiver_id === receiverId)
  //       ) {
  //         const msgDiv = document.createElement("div");
  //         msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
  //         msgDiv.innerHTML = `
  //           <div class="${msg.sender_id === currentUserId ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-white'} px-4 py-2 rounded-lg max-w-xs break-words">
  //             ${msg.message}
  //           </div>`;
  //         messages.appendChild(msgDiv);
  //         messages.scrollTop = messages.scrollHeight;
  //       }
  //     }
  //   )
  //   .subscribe();
  //   fetchUsers()

  //   }
  // }
  // getCurrentUser()

  // // ========chat setup========

  // const messages = document.getElementById("messages")
  // const messageInput = document.getElementById("messageInput")
  // const sendBtn = document.getElementById("sendBtn")

  // // disable chat input until currentUserId and receiverId are ready
  // messageInput.disabled = true
  // sendBtn.disabled = true

  // sendBtn && sendBtn.addEventListener("click", messageSend)
  // messageInput && messageInput.addEventListener("keypress", (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault()
  //     messageSend()
  //   }
  // })

  // async function messageSend() {
  //   let msg = messageInput.value.trim();
  //   if (msg === "") return;

  //   if (!currentUserId || !receiverId) {
  //     console.log("❌ Missing IDs: currentUserId or receiverId not set");
  //     return;
  //   }

  //   const { data, error } = await client
  //     .from("user_chats")
  //     .insert({
  //       message: msg,
  //       sender_id: currentUserId,
  //       receiver_id: receiverId,
  //       created_at: new Date().toISOString(),
  //     });

  //   if (error) {
  //     console.log("🚨 Error inserting message:", error.message);
  //   } else {
  //     console.log("✅ Message stored in Supabase:", data);
  //   }

  //   // show immediately for sender
  //   const msgDiv = document.createElement("div");
  //   msgDiv.className = "flex justify-end";
  //   msgDiv.innerHTML = `
  //     <div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">
  //       ${msg}
  //     </div>`;
  //   messages.appendChild(msgDiv);
  //   messages.scrollTop = messages.scrollHeight;
  //   messageInput.value = "";
  // }

  // // ========load chat history========

  // async function loadChat() {
  //   if (!currentUserId || !receiverId) return;

  //   const { data, error } = await client
  //     .from("user_chats")
  //     .select("*")
  //     .or(
  //       `and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`
  //     )
  //     .order("created_at", { ascending: true });

  //   if (error) {
  //     console.log(error, "Error fetching chat");
  //     return;
  //   }

  //   messages.innerHTML = "";
  //   data.forEach(msg => {
  //     const msgDiv = document.createElement("div");
  //     msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
  //     msgDiv.innerHTML = `
  //       <div class="${msg.sender_id === currentUserId ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-white'} px-4 py-2 rounded-lg max-w-xs break-words">
  //         ${msg.message}
  //       </div>`;
  //     messages.appendChild(msgDiv);
  //   });

  //   messages.scrollTop = messages.scrollHeight;
  // }


  const projectUrl = "https://ufxrfqhqvabdpwtnwtkh.supabase.co";
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeHJmcWhxdmFiZHB3dG53dGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDgzOTksImV4cCI6MjA3MzE4NDM5OX0.EHbeCZmpyJ9Olz_-Ytmjs6g6oJhfAkTPFVDyBH67zNo";
const { createClient } = supabase;
const client = createClient(projectUrl, projectKey);


  // ========signup work========

  const username = document.getElementById("username")
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const btn = document.getElementById("btn")

  btn && btn.addEventListener("click", async () => {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { username: username.value }
      }
    })
    if (data) {
      console.log(data, "signup successfully!");
      const { error } = await client
        .from('user_data')
        .insert({ username: data.user.user_metadata.username, email: data.user.email })
      if (error) {
        console.log(error, "inserting data error");
      } else {
        alert("data insert successfully!!")
        window.location.href = "login.html"
      }
    } else {
      console.log(error, "error in singup");
    }
  })

  // ========login work========

  const loginemail = document.getElementById("loginemail")
  const loginpassword = document.getElementById("loginpassword")
  const loginbtn = document.getElementById("loginbtn")

  loginbtn && loginbtn.addEventListener("click", async () => {
    const { data, error } = await client.auth.signInWithPassword({
      email: loginemail.value,
      password: loginpassword.value,
    })
    if (error) {
      console.log(error, "error in login");
    } else {
      console.log(data, "login successfully!");
      window.location.href = "chatApp.html"
    }
  })

  // ========show users========

  async function fetchUsers() {
    const { data, error } = await client.from('user_data').select('username, id')
    if (error) {
      console.log(error, "Error in fetching users", error.message);
    } else {
      console.log(data, "user Fetch Successfully!");
      showUsers(data)
    }
  }
  
  function showUsers(users) {
    const showAllUsers = document.getElementById("showAllUsers");
    showAllUsers.innerHTML = "";

    users.forEach((list) => {
      const firstLetter = list.username ? list.username.charAt(0).toUpperCase() : "?";
      showAllUsers.innerHTML += `
        <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer" data-userid="${list.id}">
          <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
            ${firstLetter}
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-center">
              <p class="font-semibold">${list.username}</p>
            </div>
            <p class="text-gray-400 text-sm"> Tap to chat...</p>
          </div>
        </div>`;
    });

    let chatUserName = document.getElementById("chatUserName")
    let chatView = document.getElementById("chatView")
    let welcomeView = document.getElementById("welcomeView")

    showAllUsers.addEventListener("click", function (e) {
      const clickedUser = e.target.closest(".cursor-pointer");
      if (!clickedUser) return;
      receiverId = clickedUser.dataset.userid
      chatUserName.innerText = clickedUser.querySelector(".font-semibold").innerText

      welcomeView.classList.add("hidden")
      chatView.classList.remove("hidden")
      loadChat()
      messageInput.disabled = false
      sendBtn.disabled = false
    });
  }



// DOM Elements
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
let currentUserId;
let receiverId;

// Disable input until chat is ready
messageInput.disabled = true;
sendBtn.disabled = true;

// ===== Get current user =====
async function getCurrentUser() {
  const { data, error } = await client.auth.getUser();
  if (error) return console.log(error, "getting user error");

  currentUserId = data.user.id;
  console.log(currentUserId, "current user ID");

  fetchUsers();
  initRealtime();
}
getCurrentUser();

// ===== Fetch Users =====
async function fetchUsers() {
  const { data, error } = await client.from("user_data").select("username, id");
  if (error) return console.log(error, "Error fetching users");

  showUsers(data);
}

function showUsers(users) {
  const showAllUsers = document.getElementById("showAllUsers");
  showAllUsers.innerHTML = "";

  users.forEach(user => {
    const firstLetter = user.username ? user.username[0].toUpperCase() : "?";
    showAllUsers.innerHTML += `
      <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer" data-userid="${user.id}">
        <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
          ${firstLetter}
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-center">
            <p class="font-semibold">${user.username}</p>
          </div>
          <p class="text-gray-400 text-sm"> Tap to chat...</p>
        </div>
      </div>`;
  });

  // User click
  showAllUsers.addEventListener("click", e => {
    const clickedUser = e.target.closest(".cursor-pointer");
    if (!clickedUser) return;

    receiverId = clickedUser.dataset.userid;
    document.getElementById("chatUserName").innerText =
      clickedUser.querySelector(".font-semibold").innerText;

    document.getElementById("welcomeView").classList.add("hidden");
    document.getElementById("chatView").classList.remove("hidden");

    messageInput.disabled = false;
    sendBtn.disabled = false;

    loadChat();
  });
}

// ===== Send message =====
sendBtn.addEventListener("click", messageSend);
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    messageSend();
  }
});

async function messageSend() {
  const msg = messageInput.value.trim();
  if (!msg || !currentUserId || !receiverId) return;

  const { error } = await client.from("user_chats").insert({
    message: msg,
    sender_id: currentUserId,
    receiver_id: receiverId,
    created_at: new Date().toISOString(),
  });

  if (error) return console.log(error, "Error sending message");

  // Show immediately
  const msgDiv = document.createElement("div");
  msgDiv.className = "flex justify-end";
  msgDiv.innerHTML = `<div class="bg-emerald-600 text-white px-4 py-2 rounded-lg max-w-xs break-words">${msg}</div>`;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
  messageInput.value = "";
}

// ===== Load chat history =====
async function loadChat() {
  if (!currentUserId || !receiverId) return;

  const { data, error } = await client
    .from("user_chats")
    .select("*")
    .or(
      `and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`
    )
    .order("created_at", { ascending: true });

  if (error) return console.log(error, "Error loading chat");

  messages.innerHTML = "";
  data.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
    msgDiv.innerHTML = `<div class="${msg.sender_id === currentUserId ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-white'} px-4 py-2 rounded-lg max-w-xs break-words">${msg.message}</div>`;
    messages.appendChild(msgDiv);
  });
  messages.scrollTop = messages.scrollHeight;
}

// ===== Realtime subscription =====
function initRealtime() {
  client
    .channel("user-chats")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "user_chats" },
      payload => {
        const msg = payload.new;

        // Only show in open chat
        if (
          (msg.sender_id === receiverId && msg.receiver_id === currentUserId) ||
          (msg.sender_id === currentUserId && msg.receiver_id === receiverId)
        ) {
          const msgDiv = document.createElement("div");
          msgDiv.className = msg.sender_id === currentUserId ? "flex justify-end" : "flex justify-start";
          msgDiv.innerHTML = `<div class="${msg.sender_id === currentUserId ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-white'} px-4 py-2 rounded-lg max-w-xs break-words">${msg.message}</div>`;
          messages.appendChild(msgDiv);
          messages.scrollTop = messages.scrollHeight;
        }
      }
    )
    .subscribe();
}

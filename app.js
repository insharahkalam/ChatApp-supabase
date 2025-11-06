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


function showUsers(users) {
    const showAllUsers = document.getElementById("showAllUsers");
    showAllUsers.innerHTML = "";

    users.forEach((list) => {
        console.log(list);
        const firstLetter = list.name ? list.name.charAt(0).toUpperCase() : "?";

        // Use += to append, not =
        showAllUsers.innerHTML += `
            <div class="flex items-center gap-3 p-3 border-t-2 border-b-2 border-gray-900 hover:bg-[#ffffff05] rounded cursor-pointer">
                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 to-purple-500 font-bold">
                    ${firstLetter}
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center">
                        <p class="font-semibold">${list.name}</p>
                        
                        </div>
                        <p class="text-gray-400 text-sm"> Tap to chat</p>
                        </div>
                        </div>
                        `;
    });
}


fetchUsers()


// ==========GET LOGIN USER=============

async function getCurrentUser() {
    const { data, error } = await client.auth.getUser()
    if (error) {
        console.log(error, "getting user error");
    } else {
        console.log(data, "user get Successfully!");
        console.log(data.user.id);
        
    }
}


getCurrentUser()





// showAllUsers.addEventListener("click",()=>{
//     const rightChatApp = 
// })











// msg sending Time set krna hai bd me
// <p class="text-xs text-gray-400">${new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}</p>
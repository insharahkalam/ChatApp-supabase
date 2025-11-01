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

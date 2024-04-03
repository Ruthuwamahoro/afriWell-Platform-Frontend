const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const errorMessage = document.getElementById('errorProvidedMessage')
const loginButton = document.getElementById('login-button');

// const url = 'https://afriwell-platform-backend.onrender.com/api/auth/login'
const url = 'http://localhost:8000/api/auth/login'
loginButton.addEventListener(('click'), async(e) => {
    e.preventDefault();
    const headers = new Headers()
    headers.append( "Content-Type", "application/json")
    headers.append( "Accept" , "application/json");
    const  userData = {
        email: emailInput.value,
        password: passwordInput.value
    }
    const customization = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userData),
    }

    const res = await fetch(url,customization);
    const data = await res.json()
    console.log(data)
    const token = data.data
    console.log(token)
    if(token){
        localStorage.setItem('Token', token)
        setTimeout(function() {
            document.getElementById("loader").style.display = "block";
            setTimeout(function() {
                document.getElementById("loader").style.display = "none"
                emailInput.value= ""
                passwordInput.value = ""
                window.location.replace("../homePage/home.html")
            }, 3000);
            
        }, 100)
    } else {
        errorMessage.textContent = data.error
        errorMessage.style.color = 'red',
        errorMessage.style.textAlign = 'center'
    }
})
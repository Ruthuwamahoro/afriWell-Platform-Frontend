const firstNameINput = document.getElementById('fname1')
const lastNameInput = document.getElementById('lname')
const telephoneInput = document.getElementById('tel')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const submitButton = document.getElementById('submitButton')
const errorMessage = document.getElementById('errorProvidedMessage') 
const notif = document.getElementById('notification')


const url = "https://afriwell-platform-backend.onrender.com/api/contact/contact"

submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    async function fetchingData(){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const firstName = firstNameINput.value
        const lastName = lastNameInput.value
        const telephone = telephoneInput.value
        const email = emailInput.value
        const message = messageInput.value
        const wholeData = {
            FirstName: firstName,
            LastName: lastName,
            phone:telephone,
            Email: email,
            Request: message
        }
        const defineHeaders = {
            method: 'POST',
            headers:headers,
            body: JSON.stringify(wholeData)
        }
        try{
            const response = await fetch(url, defineHeaders)
            const data = await response.json();
            console.log(data.error)
            const erro = data.error
            if(!data.error){
                setTimeout(function() {
                    document.getElementById("loader").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("loader").style.display = "none"
                        firstNameINput.value = ""
                        lastNameInput.value = ""
                        telephoneInput.value = ""
                        emailInput.value= ""
                        messageInput.value = ""
                        notif.classList.add("show");
                        setTimeout(function() {
                            notif.classList.remove("show");
                            window.location.href = '../loginPage/login.html'
                        }, 3000);
                
                    }, 3000);
                
                }, 100);
                errorMessage.textContent = ' ';
                
            } else {
                errorMessage.textContent = data.error.split(',');
                errorMessage.style.color = 'red';
                errorMessage.style.paddingLeft = '30px';
            }
            
        } catch(err){
            console.log(err)
        }
    }
    fetchingData()
    
});




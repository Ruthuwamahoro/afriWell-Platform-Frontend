const fullNameInput = document.getElementById('fname1')
const lastNameINput = document.getElementById('lname')
const emailInput = document.getElementById('email')
const telephoneInput = document.getElementById('phone')
const therapistsName = document.getElementById('therapists')
const dateInput = document.getElementById('date')
const timeInput = document.getElementById('time')
const submitButton = document.getElementById('submit')
const notif = document.getElementById('notification')
const errorMessage = document.getElementById('errorProvidedMessage')

// const url = "http://localhost:8000/api/user/booking"

const url = "https://afriwell-platform-backend.onrender.com/api/user/booking"



document.addEventListener('DOMContentLoaded', () => {
    
    submitButton.addEventListener(('click'), async(e) => {
        e.preventDefault()
        const fullName = fullNameInput.value
        const lastName = lastNameINput.value
        const email = emailInput.value
        const phone = telephoneInput.value
        const therapists = therapistsName.value
        const date = dateInput.value
        const time = timeInput.value
        const token = localStorage.getItem("Token");
        const headers = new Headers()
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append(`Authorization`, `Bearer ${token}`)
        const wholeData = {
            firstName: fullName,
            lastName: lastName,
            phone: phone,
            therapists: therapists,
            email: email,
            date: date,
            time: time
        }   

        const customization = {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(wholeData)
    
        }
        try{
            const res = await fetch(url, customization)
            const data = await res.json()
            console.log(data);
            if(!data.error){
                setTimeout(function() {
                    document.getElementById("loader").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("loader").style.display = "none"
                        fullNameInput.value= ""
                        lastNameINput.value= ""
                        emailInput.value= ""
                        telephoneInput.value= ""
                        therapistsName.value= ""
                        dateInput.value= ""
                        timeInput.value= ""
                        notif.classList.add("show");
                        setTimeout(function() {
                            notif.classList.remove("show");
                            window.location.href='../userDashboard/dashboard.html'
                        }, 3000);
                        
                    }, 3000);
                    
                }, 100);
                
            } else {
                errorMessage.textContent =  data.error
                errorMessage.style.color = 'red',
                errorMessage.style.textAlign = 'center'
            }
        } catch(err){
            console.log(err)
        }
    })
})

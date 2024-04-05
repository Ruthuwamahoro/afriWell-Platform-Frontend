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
        const therapists = therapistsName.value
        const date = dateInput.value
        const time = timeInput.value
        const token = localStorage.getItem("Token");
        const headers = new Headers()
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append(`Authorization`, `Bearer ${token}`)
        const wholeData = {
            
            therapists: therapists,
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
            console.log(data.bookingInfo._id)
            const userId = data.bookingInfo._id
            localStorage.setItem('userId', userId)
            if(!data.error){
                setTimeout(function() {
                    document.getElementById("loader").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("loader").style.display = "none"
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


//being redirected to the dashboard

// const getSingDash = 'https://afriwell-platform-backend.onrender.com/api/user/booking'

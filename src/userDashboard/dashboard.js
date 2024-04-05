const getToken = localStorage.getItem('Token')
if(!getToken){
    window.location.replace('../loginPage/login.html')
} 



const notif = document.getElementById('notification')
const getId = localStorage.getItem('userId')
console.log(getId)

const url = 'https://afriwell-platform-backend.onrender.com/api/user/booking'
document.addEventListener('DOMContentLoaded', async(e) => {
    e.preventDefault()
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const customization = {
        method: 'GET',
        headers: headers,
    }
    const res = await fetch(`${url}/${getId}`, customization)
    const data = await res.json()
    const getInfo = data.data
    console.log(getInfo)
    function displayAppoint(){
        const realDate = new Date(getInfo.date)

        
        const displaymonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const index = realDate.getMonth();
        const monthName = displaymonths[index]; 
        const day = ('0' + realDate.getDate()).slice(-2);
        const year = realDate.getFullYear();

        const formattedDate = `${monthName},${day} ${year}`;
        const appContainer = document.getElementById('appointmentsContainer')
        appContainer.classList.add('appointment-card');
        const dropDownContent = document.querySelector('.dropdown-content-container');
        
        
        let elem = "";
        elem += `
            <div class="appointment-info">
            <p>Therapists Name: ${getInfo.therapists}</p>
            <p>Date: ${formattedDate}</p>
            <p>Time: ${getInfo.time}</p>
            <p id="define-status"><p>
            </div>
            <div class="appointment-actions">
            <button class="btn-reschedule" onclick=changeApp('${getInfo._id}')>Reschedule</button>
            <button class="btn-cancel" onclick=deleteApp('${getInfo._id}')>Cancel</button>
            </div>
        `;
        let userProfile = "";
        userProfile +=`

            <div class="dropdown-cont">
                <div class="dropdown-content">
                    <a href="#">Names:<br>${getInfo.firstName +" " + getInfo.lastName}</a>

                    <a href="#">Email: ${getInfo.email}<br/></a>
                </div>
            </div>
        `
        appContainer.innerHTML = elem
        dropDownContent.innerHTML = userProfile

        //display status on the time
        const status = document.getElementById('define-status')
        status.innerHTML = ''

        //container to display the message

        const msgContainer = document.getElementById('status-session')
        msgContainer.innerHTML = ""
        //send notification before five minutes

        const currentTime = new Date();
        const [hrs, minutes] = getInfo.time.split(':').map(num => parseInt(num)); // Parse hours and minutes to integers
        const getSetTime = new Date();
        getSetTime.setHours(hrs, minutes, 0, 0);
        const timeDifference = getSetTime - currentTime;
        const findTimeRemaining = timeDifference/1000
        const findMin = Math.floor(findTimeRemaining/60)
        const findsec = Math.floor(findTimeRemaining % 60)
        console.log(timeDifference)
        if (timeDifference > 0 ) { // Check if timeDifference is positive
            setTimeout(() => {
                msgContainer.innerHTML = `${findMin} minutes and ${findsec} second remaining!`
                status.innerHTML = `Status: approved: use google meet:  <a href="https://meet.google.com/xiq-tqyx-xrd" id="google-meet">Google Meet link<h1>`
            });
        } else {
            msgContainer.innerHTML = 'Your session is expired'
            msgContainer.style.backgroundColor = 'rgb(190, 100, 100)';
            status.innerHTML = 'Status: Expired: Reschedule the meeting'
            setTimeout(() => {
                msgContainer.innerHTML='';
                msgContainer.style.backgroundColor = ''

            }, 30000)
        }
        

    }
    displayAppoint()
    therapistsFeedBack()
})

const changeApp = (id) => {
    document.getElementById('updateApp').style.display = 'block'
    changeMe()
    
    
}


const changeMe=()=>{
    
    document.querySelector('.submit-button').addEventListener( "click", async(e)=> {
        e.preventDefault()
        const therapistsName = document.getElementById('newTherapists').value
        const newDateInput = document.getElementById('newDate').value
        const newTimeInput = document.getElementById('newTime').value
        const token = localStorage.getItem('Token')
        const headers = new Headers()
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append(`Authorization`, `Bearer ${token}`)

        const getNewUpdatedDate = {
            therapists: therapistsName,
            date: newDateInput,
            time: newTimeInput
        }

        const customization = {
            method: 'PATCH',
            headers: headers,
            body:JSON.stringify(getNewUpdatedDate )
    
        }

        const res = await fetch(`${url}/${getId}`, customization)
        const data = await res.json()
        if(data.data){
            setTimeout(function() {
                therapistsName.value= ""
                newDateInput.value= ""
                newTimeInput.value= ""
                notif.classList.add("show");
                setTimeout(function() {
                    notif.classList.remove("show");
                    window.location.reload();
                }, 3000);
                
            }, 50);
        }
        
    })
}

const deleteApp = async(getId) => {
    const token = localStorage.getItem('Token')
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append(`Authorization`, `Bearer ${token}`)
    console.log(token)
    const customization = {
        method: 'DELETE',
        headers: headers,
        
    }
    const res = await fetch(`${url}/${getId}`, customization)
    const data = await res.json()
    localStorage.removeItem("userId")
    window.onload = ()=>{document.location.reload()}
    const deleteContainer = document.querySelector('#appointments')
   document.querySelector('#no-app').style.display = 'block'
    deleteContainer.style.display="none";

}

const therapistsFeedBack = () => {
    const appointMents = document.getElementById('feedbackContainer')
    let feedBack = "";
    feedBack = `
    <div class='feedback'>
        <p class="direct-feedback">If you want to provide feedback on the session,  please fill out this form.</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeWOEEuuJNApnBoH3sg1JIuAAQ_fQmQ1CS558qoK_GLRd6D8Q/viewform" id="google-form">Google form</a>
      
    </div>`; 
    appointMents.innerHTML += feedBack;
    
    
}
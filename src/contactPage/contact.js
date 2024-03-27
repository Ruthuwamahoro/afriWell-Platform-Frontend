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
            console.log(data)
            const erro = data.error
            if(data){
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
                        }, 3000);
                
                    }, 3000);
                
                }, 100);
                
            }
            
        } catch(err){
            console.log(err)
        }
    }
    fetchingData()
    
});



























// // Get references to the input fields
    // var firstNameInput = document.getElementById("fname1"); // Corrected ID
    // var lastNameInput = document.getElementById("lname");
    // var phoneNumberInput = document.getElementById("tel");
    // var emailInput = document.getElementById("email");
    // var messageInput = document.getElementById("message");

    // // Get reference to the submit button
    // var submitButton = document.getElementById("submitButton");

    // // Add an event listener to the submit button
    // submitButton.addEventListener("click", function(event) {
    //     event.preventDefault(); // Prevent the default form submission
        
    //     // Retrieve values from input fields
    //     var firstName = firstNameInput.value;
    //     var lastName = lastNameInput.value;
    //     var phoneNumber = phoneNumberInput.value;
    //     var email = emailInput.value;
    //     // var message = messageInput.value;

    //     // Do something with the values, for example, log them to the console
    //     console.log("First Name:", firstName);
    //     console.log("Last Name:", lastName);
    //     console.log("Phone Number:", phoneNumber);
    //     console.log("Email:", email);
    //     // console.log("Message:", message);

    //     // You can also perform validation or further processing here
    // });




document.addEventListener('DOMContentLoaded', function() {
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    const feedbackContainer = document.getElementById('feedbackContainer');
  
    // Simulated existing appointments and therapist feedback
    const existingAppointments = [
      { id: 1, name: "Therapy Session", date: "2024-04-01", time: "10:00 AM" },
      { id: 2, name: "Counseling Session", date: "2024-04-05", time: "02:00 PM" }
    ];
  
    const therapistFeedback = [
      { id: 1, therapist: "Dr. Smith", feedback: "Great session, made significant progress." },
      { id: 2, therapist: "Dr. Johnson", feedback: "Very insightful, looking forward to next session." }
    ];
  
    // Function to display existing appointments
    function displayAppointments() {
      appointmentsContainer.innerHTML = '';
      existingAppointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('appointment-card');
        appointmentCard.innerHTML = `
          <div class="appointment-info">
            <h2>${appointment.name}</h2>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
          </div>
          <div class="appointment-actions">
            <button class="btn-reschedule" data-id="${appointment.id}">Reschedule</button>
            <button class="btn-cancel" data-id="${appointment.id}">Cancel</button>
          </div>
        `;
        appointmentsContainer.appendChild(appointmentCard);
      });
    }
  
    // Function to display therapist feedback
    function displayFeedback() {
      feedbackContainer.innerHTML = '';
      therapistFeedback.forEach(feedback => {
        const feedbackCard = document.createElement('div');
        feedbackCard.classList.add('feedback-card');
        feedbackCard.innerHTML = `
          <h3>${feedback.therapist}</h3>
          <p>${feedback.feedback}</p>
        `;
        feedbackContainer.appendChild(feedbackCard);
      });
    }
  
    // Initial display of appointments and feedback
    displayAppointments();
    displayFeedback();
  
    // Event delegation to handle reschedule and cancel buttons
    appointmentsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('btn-reschedule')) {
        const appointmentId = parseInt(event.target.getAttribute('data-id'));
        // Implement reschedule functionality
        console.log("Reschedule appointment with ID:", appointmentId);
      } else if (event.target.classList.contains('btn-cancel')) {
        const appointmentId = parseInt(event.target.getAttribute('data-id'));
        // Implement cancel functionality
        console.log("Cancel appointment with ID:", appointmentId);
      }
    });
  });
  
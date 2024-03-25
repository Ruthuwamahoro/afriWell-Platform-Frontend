document.addEventListener('DOMContentLoaded', function() {
    const notification = document.getElementById('notification');
  
    // Function to show notification
    function showNotification() {
      notification.classList.add('show');
      setTimeout(function() {
        notification.classList.remove('show');
      }, 3000); // 3 seconds
    }
  
    // Call showNotification function when page is loaded
    showNotification();
  });
  
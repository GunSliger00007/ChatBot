var outputArea = $("#chat-output");

$("#user-input-form").keypress(function (e) {
  if (e.which == 13) {  
    e.preventDefault();

    // Get message from input field
    var message = $("#user-input").val();

    // Add inputted message in chat
    outputArea.append(`
      <div class='user-message'>
        <div class='message'>
          ${message}
        </div>
      </div>
    `);
    scrollToBottom();

    // Clear input field
    $("#user-input").val("");

    // Set delay for typing indicator to start
    setTimeout(function() {
      // Add typing indicator to chat
      outputArea.append(`
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `);
      scrollToBottom();

      // Set delay for removing typing indicator and adding bot response
      setTimeout(function() {
        $(".typing-indicator").remove();

        // Perform AJAX request to fetch bot response
        $.ajax({
          type: "POST",
          url: getResponseUrl,
        
          data: {
            'message': message,  // Use the correct variable here
            'csrfmiddlewaretoken': csrfToken
          },
          success: function(response) {
            // Append bot response to chat
            outputArea.append(`
              <div class='bot-message'>
                <img src="https://www.pngfind.com/pngs/m/123-1234348_twittericon-twitter-round-logo-png-transparent-background-png.png" alt="Stephanie" width="45" height="45"/> 
                <div class='message'>
                  ${response.message}
                </div>
              </div>
            `);
            scrollToBottom();
          }
        });

        // Handle special case for "Easter"
        if (message === 'Easter') {
          setTimeout(function() {
            outputArea.append(`
              <div class='bot-message'>
                <img src="https://www.pngfind.com/pngs/m/123-1234348_twittericon-twitter-round-logo-png-transparent-background-png.png" alt="Stephanie" width="45" height="45"/> 
                <div class='message'>
                  Here's a special message for Easter!
                </div>
              </div>
            `);
            scrollToBottom();
          }, 200);
        }

      }, 1000);

    }, 500);
  }
});

// Autoscroll to bottom function
function scrollToBottom() {
  $(".chat-output").scrollTop($(".chat-output").prop("scrollHeight"));
}

/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.contact = {
    attach: function (context, settings) {

        const form = document.querySelector('form');
        const submitResponse = document.querySelector('#response');
        const url = 'https://mo8kcs56d1.execute-api.eu-west-2.amazonaws.com/email';
  
        form.onsubmit = e => {
          e.preventDefault();
  
          // Capture the form data.
          let data = {};
          Array.from(form).map(input => (data[input.id] = input.value));
          const info = JSON.stringify(data);
          submitResponse.innerHTML = 'Sending...'
  
          // Create the AJAX request
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
          xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
          // Send the collected data as JSON.
          xhr.send(info);
  
          xhr.onloadend = response => {
            if (response.target.status === 200) {
              form.reset();
              submitResponse.innerHTML = 'Received. Thank you!';
            } else {
              submitResponse.innerHTML = 'Error! Please try again.';
              console.error('RESPONSE: ' + response.toString());
            }
          };    
        };

      



    }
  };

})(jQuery, Drupal);

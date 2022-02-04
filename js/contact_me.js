$(function () {

  $('input,textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $('input#name').val();
      var email = $('input#email').val();
      var message = $('textarea#message').val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $.ajax({
        method: 'POST',
        url: 'https://formsubmit.co/ajax/contact@qualitxinc.com',
        dataType: 'json',
        accepts: 'application/json',
        data: {
          name: name,
          email: email,
          message: message
        },
        cache: false,
        success: function (response) {
          // Success message
          if (response && response.success === 'true') {
            $('#success > .alert-success').show();
          } else {
            $('#success > .alert-danger').show();
          }
        },
        error: function () {
          // Fail message
          $('#success > .alert-danger').show();
        },
      });
    },
    filter: function () {
      return $(this).is(':visible');
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function () {
    $('#success>*').hide();
  });
});

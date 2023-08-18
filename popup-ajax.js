  $(document).ready(function () {
        $('head').append('<meta name="csrf-token" content="{{ csrf_token() }}">');

        $('#popupContactForm').submit(function (e) {
            e.preventDefault();

            $('#popupContactForm button[type="submit"]').attr('disabled', true).html('Submitting...');

            var formData = new FormData(this);
            formData.append('page_url', window.location.href); // Add the page URL to the form data

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: '{{ route('popup.send') }}', // Update the URL according to your routes
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    // Display success message
                    $('#popupSubmissionStatus').removeClass('text-danger').addClass('text-success').html(response.message);
                    $('#successMessage').fadeIn();
                },
                error: function (error) {
                    // Display error message
                    $('#popupSubmissionStatus').removeClass('text-success').addClass('text-danger').html('An error occurred');
                },
                complete: function () {
                    // Re-enable submit button and hide loading
                    $('#popupContactForm button[type="submit"]').attr('disabled', false).html('Submit');
                }
            });
        });
    });

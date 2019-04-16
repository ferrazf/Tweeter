/*
 * Client-side Character Counter - Tweet form
 * jQuery is already loaded
 * Counts down character limit and enables/disables submit button
 */

$(document).ready(function () {
    let maxTweetLength = 140;
    $("#text").on("keyup", function () {
        $("#counter").html(maxTweetLength - $(this).val().length);
        if (maxTweetLength - $(this).val().length < 0) {
            $("#counter").addClass("invalidLength");
            $("#submit-tweet").attr("disabled", true);
        } else {
            $("#counter").removeClass("invalidLength");
            $("#submit-tweet").attr("disabled", false);
        }
    });
});

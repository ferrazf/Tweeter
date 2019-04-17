/*
 * Client-side Character Counter - Tweet form
 * jQuery is already loaded
 * Counts down character limit and enables/disables submit button
 */

$(document).ready(function () {
  let maxTweetLength = 140;
  $("#text").on("keyup", function () {
    $("#counter").html(maxTweetLength - $(this).val().length);
    if (!$(this).val()) {
      //$("#submit-tweet").attr("disabled", true);
      //alert("Your tweet text cannot be empty!");
    }
    else if (maxTweetLength - $(this).val().length < 0) {
      $("#counter").addClass("invalidLength");
      //$("#submit-tweet").attr("disabled", true);
      //alert("Your text cannot exceed 140 characters!");
    } else {
      $("#counter").removeClass("invalidLength");
      $("#submit-tweet").attr("disabled", false);
    }
  });
});

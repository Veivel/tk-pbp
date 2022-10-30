// TODO: setup
function setup() {
  $.ajaxSetup({
    // set up CSRF token for all HTTP requests
    headers: { "X-CSRFToken": $("[name=csrfmiddlewaretoken]").val() },
  });
  updateLeaderboard();
  updateComments();
}

// updating leaderboard table using ajax get
function updateLeaderboard() {
  $(`#leaderboard-table`).empty(); // empty table before appending html
  $.getJSON("json/", (data) => {
    // retrieve user's data
    const len = data.length;
    // append row of achiever for top 10 achievers
    for (var i = 0; i < len && i < 10; i++) {
      $("#leaderboard-table").append(
        `<tr>
            <td>${i + 1}</td>
            <td>${data[i].fields.name}</td>
            <td>${data[i].fields.points}</td>
          </tr>`
      );
    }
  });
}

// updating comments table using ajax get
// this shows the 10 most recent comments
function updateComments() {
  $(`#comment-section`).empty(); // empty comment section before appending html
  $.getJSON("json/comments/", (data) => {
    const len = data.length;
    for (var i = 0; i < 10; i++) {
      $("#comment-section").append(
        `<div class="card m-3 rounded-1 p-2" >
            <strong mb-2 fs-6>user ${data[i].fields.user} - ${data[i].fields.date_added}</strong>
            <p>${data[i].fields.comment}</p>
          </div>`
      );
    }
  });
}

// ajax post request when comment form is submitted
function submitComment(form) {
  $.post(
    `submit/`, $(form).serialize(), () => {
      updateComments();
      $("#messageForm").trigger("reset"); // reset form fields
      $(".modal-toggle").hide(); // hide modal (the hide not working dk why)
    }
  )
}


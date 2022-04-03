/* global $ */

function transformNotes(notes) {
  return notes.slice().sort(function (a, b) {
    return b.timestamp - a.timestamp;
  });
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toUTCString();
}

function formatTitle(body) {
  var maxLength = 20;
  if (body.length > maxLength) {
    return body.substring(0, maxLength - 3) + "...";
  } else if (body.length === 0) {
    return "New note";
  } else {
    return body;
  }
}

function selectNote(domNote) {
  $(".note-selector").removeClass("active");
  var $note = $(domNote);
  $note.addClass("active");

  $(".note-editor-input").val($note.data().body);
  $(".note-editor-info").html(formatTimestamp($note.data().timestamp));
}

function updateNote() {
  var body = $(this).val();
  var timestamp = Date.now();

  var $note = $(".note-selector.active");
  $note.data({ body: body, timestamp: timestamp });

  $(".note-editor-info").html(formatTimestamp(timestamp));
  $(".note-selector.active .note-selector-title").html(formatTitle(body));
  $(".note-selector.active .note-selector-timestamp").html(formatTimestamp(timestamp));

  $note.detach();
  $(".note-selectors").prepend($note);
}

var notes = [
  { id: 1, body: "This is a first test", timestamp: Date.now() - 300000000 },
  { id: 2, body: "This is a second test this is a very long note", timestamp: Date.now() - 200000000 },
  { id: 3, body: "", timestamp: Date.now() - 100000000 },
  { id: 4, body: "This is a fourth test", timestamp: Date.now() },
];

transformNotes(notes).forEach(function (note) {
  var $noteSelector = $(`
    <div class="note-selector" onclick="selectNote(this)">
      <p class="note-selector-title">${formatTitle(note.body)}</p>
      <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
    </div>
  `);
  $noteSelector.data(note);
  $(".note-selectors").append($noteSelector);
});

$(".note-editor-input").on("input", updateNote);

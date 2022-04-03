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

function selectNote($note) {
  var $activeNote = document.querySelector(".note-selector.active");
  if ($activeNote) {
    $activeNote.classList.remove("active");
  }
  $note.classList.add("active");

  document.querySelector(".note-editor-input").value = $note.dataset.body;
  document.querySelector(".note-editor-info").innerHTML = formatTimestamp(parseInt($note.dataset.timestamp));
}

function updateNote() {
  var body = this.value;
  var timestamp = Date.now();

  var $note = document.querySelector(".note-selector.active");
  $note.dataset.body = body;
  $note.dataset.timestamp = timestamp;

  document.querySelector(".note-editor-info").innerHTML = formatTimestamp(timestamp);
  document.querySelector(".note-selector.active .note-selector-title").innerHTML = formatTitle(body);
  document.querySelector(".note-selector.active .note-selector-timestamp").innerHTML = formatTimestamp(timestamp);

  document.querySelector(".note-selectors").removeChild($note);
  document.querySelector(".note-selectors").prepend($note);
}

function createNote() {
  document.querySelector(".note-editor").style.display = "";

  var note = { id: Date.now(), body: "", timestamp: Date.now() };
  var htmlString = `
    <div
      class="note-selector"
      onclick="selectNote(this)"
      data-body="${note.body}"
      data-timestamp="${note.timestamp}"
    >
      <p class="note-selector-title">${formatTitle(note.body)}</p>
      <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
    </div>
  `;
  document.querySelector(".note-selectors").insertAdjacentHTML("afterbegin", htmlString);
  document.querySelector(".note-selector").click();
}

function deleteNote() {
  var $note = document.querySelector(".note-selector.active");
  if ($note) {
    var $parent = document.querySelector(".note-selectors");
    $parent.removeChild($note);
    var $newNote = document.querySelector(".note-selector").click();
    if ($newNote) {
      $newNote.click();
    } else {
      document.querySelector(".note-editor").style.display = "none";
    }
  }
}

function searchNotes() {
  var searchText = this.value.toLowerCase();
  document.querySelectorAll(".note-selector").forEach(function ($note) {
    var noteText = $note.dataset.body.toLowerCase();
    if (noteText.indexOf(searchText) === -1) {
      $note.style.display = "none";
      $note.classList.remove("active");
    } else {
      $note.style.display = "";
    }
  });

  if (!document.querySelector(".note-selector.active")) {
    var $firstVisibleNote = document.querySelector(".note-selector:not([style*='display: none'])");
    if ($firstVisibleNote) {
      $firstVisibleNote.click();
      document.querySelector(".note-editor").style.display = "";
    } else {
      document.querySelector(".note-editor").style.display = "none";
    }
  }
}

var notes = [
  { id: 1, body: "This is a first test", timestamp: Date.now() - 300000000 },
  { id: 2, body: "This is a second test this is a very long note", timestamp: Date.now() - 200000000 },
  { id: 3, body: "", timestamp: Date.now() - 100000000 },
  { id: 4, body: "This is a fourth test", timestamp: Date.now() },
];
var htmlString = "";
transformNotes(notes).forEach(function (note) {
  htmlString += `
    <div
      class="note-selector"
      onclick="selectNote(this)"
      data-body="${note.body}"
      data-timestamp="${note.timestamp}"
    >
      <p class="note-selector-title">${formatTitle(note.body)}</p>
      <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
    </div>
  `;
});
// html must be ready on the page prior to using this. Add defer in html file where js script lives
document.querySelector(".note-selectors").innerHTML = htmlString;

document.querySelector(".note-editor-input").addEventListener("input", updateNote);
document.querySelector(".toolbar-button-new").addEventListener("click", createNote);
document.querySelector(".toolbar-button-delete").addEventListener("click", deleteNote);
document.querySelector(".toolbar-search").addEventListener("input", searchNotes);

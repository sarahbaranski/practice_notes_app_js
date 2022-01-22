var notes = [
  { id: 1, body: "This is a first test", timestamp: Date.now() },
  { id: 2, body: "This is a second test", timestamp: Date.now() },
  { id: 3, body: "This is a third test", timestamp: Date.now() },
  { id: 4, body: "This is a fourth test", timestamp: Date.now() },
];

var htmlString = "";
notes.forEach(function (note) {
  htmlString += `
    <div class="note-selector">
    <p class="note-selector-title">${note.body}</p>
    <p class="note-selector-timestamp">${note.timestamp}</p>
    </div>
  `;
});
// html must be ready on the page prior to using this. Add defer in html file where js script lives
document.querySelector(".note-selectors").innerHTML = htmlString;

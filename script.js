let headlines = [];
let notes = [];
let trashHeadlines = [];
let trashNotes = [];
let doneHeadlines = [];
let doneNotes = [];
load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h2>My Notes</h2>`;

    for (let i = 0; i < headlines.length; i++) {
        const headline = headlines[i];
        const note = notes[i];

        content.innerHTML += `
        <div class="new_note">
            <div class="title"><h2><b>${headline}</b></h2></div>
            <div class="note_content">${note}</div>
            <div class="note_footer">
                <div onclick="deleteNote(${i})" class="note_footer_items"><img src="img/trash.png" alt="">Delete</div>
                <div onclick="done(${i})" class="note_footer_items"><img src="img/check.png" alt="">Archive</div>
            </div>
        </div>
        `;
    }
}

function renderTrash() {
    let trashContent = document.getElementById('trashContent');
    trashContent.innerHTML = '';
    trashContent.innerHTML += `<h2>My recycle bin</h2>`;

    if (trashHeadlines && trashNotes) {
        for (let i = 0; i < trashHeadlines.length; i++) {
            const headline = trashHeadlines[i];
            const note = trashNotes[i];

            trashContent.innerHTML += `
        <div class="new_note">
            <div class="title"><h2><b>${headline}</b></h2></div>
            <div class="note_content">${note}</div>
            <div class="note_footer">
                <div onclick="deleteTrash(${i})" class="note_footer_items"><img src="img/trash.png" alt="">Delete</div>
                <div onclick="doneTrash(${i})" class="note_footer_items"><img src="img/check.png" alt="">Archive</div>
            </div>
        </div>
        `;
        }
    }
}

function renderArchive() {
    let doneContent = document.getElementById('doneContent');
    doneContent.innerHTML = '';
    doneContent.innerHTML += `<h2>My Archive</h2>`;

    if (doneHeadlines && doneNotes) {
        for (let i = 0; i < doneHeadlines.length; i++) {
            const headline = doneHeadlines[i];
            const note = doneNotes[i];

            doneContent.innerHTML += `
        <div class="new_note">
            <div class="title"><h2><b>${headline}</b></h2></div>
            <div class="note_content">${note}</div>
            <div class="note_footer">
                <div onclick="deleteArchive(${i})" class="note_footer_items"><img src="img/trash.png" alt="">Delete</div>
                <div onclick="toNotes(${i})" class="note_footer_items"><img src="img/notes.png" alt="">To Notes</div>
            </div>
        </div>
        `;
        }
    }
}

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function addNote() {
    let noteTitle = document.getElementById('noteTitle');
    let noteContent = document.getElementById('noteContent');

    if (noteTitle.value == '' || noteContent.value == '') {
        alert('Please write a headline AND a note text.');
    } else {
        headlines.push(noteTitle.value);
        notes.push(noteContent.value);

        noteTitle.value = '';
        noteContent.value = '';

        render();
        save();
    }
}

function deleteNote(i) {
    const headline = headlines[i];
    const note = notes[i];

    trashHeadlines.push(headline);
    trashNotes.push(note);
    headlines.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();
}

function deleteArchive(i) {
    const headline = doneHeadlines[i];
    const note = doneNotes[i];

    trashHeadlines.push(headline);
    trashNotes.push(note);
    doneHeadlines.splice(i, 1);
    doneNotes.splice(i, 1);


    renderArchive();
    save();
}

function toNotes(i) {
    const headline = doneHeadlines[i];
    const note = doneNotes[i];

    headlines.push(headline);
    notes.push(note);
    doneHeadlines.splice(i, 1);
    doneNotes.splice(i, 1);


    renderArchive();
    save();
}

function deleteTrash(i) {
    const headline = trashHeadlines[i];
    const note = trashNotes[i];

    trashHeadlines.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();
}

function doneTrash(i) {
    const headline = trashHeadlines[i];
    const note = trashNotes[i];

    doneHeadlines.push(headline);
    doneNotes.push(note);
    trashHeadlines.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
    save();
}

function done(i) {
    const headline = headlines[i];
    const note = notes[i];

    doneHeadlines.push(headline);
    doneNotes.push(note);
    headlines.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();
}

function save() {
    let headlinesAsText = JSON.stringify(headlines);
    let notesAsText = JSON.stringify(notes);
    let trashHeadlinesAsText = JSON.stringify(trashHeadlines);
    let trashNotesAsText = JSON.stringify(trashNotes);
    let doneHeadlinesAsText = JSON.stringify(doneHeadlines);
    let doneNotesAsText = JSON.stringify(doneNotes);
    localStorage.setItem('headlines', headlinesAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('trashHeadlines', trashHeadlinesAsText);
    localStorage.setItem('trashNotes', trashNotesAsText);
    localStorage.setItem('doneHeadlines', doneHeadlinesAsText);
    localStorage.setItem('donehNotes', doneNotesAsText);
}

function load() {
    let headlinesAsText = localStorage.getItem('headlines');
    let notesAsText = localStorage.getItem('notes');
    let trashHeadlinesAsText = localStorage.getItem('trashHeadlines');
    let trashNotesAsText = localStorage.getItem('trashNotes');
    let doneHeadlinesAsText = localStorage.getItem('doneHeadlines');
    let doneNotesAsText = localStorage.getItem('donehNotes');
    if (headlinesAsText && notesAsText) {
        headlines = JSON.parse(headlinesAsText);
        notes = JSON.parse(notesAsText);
    }
    if (trashHeadlinesAsText && trashNotesAsText) {
        trashHeadlines = JSON.parse(trashHeadlinesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
    if (doneHeadlinesAsText && doneNotesAsText) {
        doneHeadlines = JSON.parse(doneHeadlinesAsText);
        doneNotes = JSON.parse(doneNotesAsText);
    }
}
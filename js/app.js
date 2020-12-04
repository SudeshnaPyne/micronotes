console.log("Welcome to Micro Notes. This is app.js");
showNotes();

//If the user adds a note, add it to the local storage.

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});

// Function to Show Elements from Local Storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `

            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-info">Delete Note</button>
                </div>
            </div>
        
                `

    });

    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    } else {
        notesEle.innerHTML = `You haven't add any notes yet. Please use "Add a Note" section to add a note.`;
    }

}

// Function to Delete a Note

function deleteNote(index) {
    // console.log("I am deleting.", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log("You are writing something", inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }

        // console.log(cardTxt);

    });

});


/*Futher Features:

1. Add Title.
2. Mark a Note as Important.
3. Separate a Note by User.
4. Sync and Host to a Web Server.

*/
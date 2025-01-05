// Select dom elements for the modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalCloseButton = document.querySelector(".modal-close");
const modalContent = document.querySelector(".modal-content");
// Select the dom elements for the note section //
const addButton = document.querySelector(".button-add");
const noteInput = document.querySelector(".text");
const notesTable = document.querySelector(".notes-table tbody");

// Function to open the modal and display note content
function openModal(content) {
  modalContent.textContent = content; // set the note content inside the modal
  modal.style.display = "block"; // show the modal
  overlay.style.display = "block"; // show the overlay
  modal.setAttribute("aria-hidden", "false"); // update the aria-hidden attribute
  overlay.setAttribute("aria-hidden", "false"); // update the aria-hidden attribute
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none"; // hide the modal
  overlay.style.display = "none"; // hide the overlay
  modal.setAttribute("aria-hidden", "true"); // update the aria-hidden attribute
  overlay.setAttribute("aria-hidden", "true"); // update the aria-hidden attribute
}

// Event listener to close the modal when clicking on the close button
modalCloseButton.addEventListener("click", closeModal);

// Close modal when clicking on overlay
overlay.addEventListener("click", closeModal);

// Event listener for the add button
addButton.addEventListener("click", () => {
  const noteContent = noteInput.value.trim();

  if (noteContent !== "") {
    // Remove placeholder if it exists
    const noNotesRow = document.querySelector(".no-notes-row");
    if (noNotesRow) {
      noNotesRow.remove();
    }

    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    newCell.textContent = noteContent;
    newRow.appendChild(newCell);

    // Create a cell for the view button to trigger the modal
    const viewCell = document.createElement("td");
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.className = "view-btn";
    viewButton.dataset.noteContent = noteContent; // Store the note content in the button's data attribute
    viewCell.appendChild(viewButton);
    newRow.appendChild(viewCell);

    // Create a cell for the delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);

    // Add the new row to the table
    notesTable.appendChild(newRow);

    // Reset the note input field
    noteInput.value = "";

    // Add event listener for the delete button
    deleteButton.addEventListener("click", () => {
      newRow.remove(); // Removes row when delete button is clicked
    });

    // Event listener to open the modal when the view button is clicked
    viewButton.addEventListener("click", () => {
      openModal(noteContent);
    });
  } else {
    alert("Please enter a note!");
  }
});

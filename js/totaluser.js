function setupSearch(inputId, listId) {
    document.getElementById(inputId).addEventListener("keyup", function() {
        let filter = this.value.toLowerCase();
        let items = document.getElementById(listId).getElementsByTagName("li");

        // 🔥 Reset toggle state when searching
        isOpen = false;
        currentItem = null;
        document.getElementById("userDetails").style.display = "none";

        for (let i = 0; i < items.length; i++) {
            let text = items[i].textContent.toLowerCase();
            items[i].style.display = text.includes(filter) ? "" : "none";
        }
    });
}

setupSearch("workerSearch", "workerList");
setupSearch("customerSearch", "customerList");

let isOpen = false;
let currentItem = null;

function toggleUser(event, clickedItem) {
    event.stopPropagation(); // prevents triggering document click

    let items = document.getElementById("workerList").getElementsByTagName("li");

    // If clicking the same user again → reset
    if (isOpen && currentItem === clickedItem) {
        resetView();
        return;
    }

    // Hide others
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== clickedItem) {
            items[i].style.display = "none";
        }
    }

    // Show details
    document.getElementById("userDetails").style.display = "block";

    isOpen = true;
    currentItem = clickedItem;
}

// Reset everything
function resetView() {
    let items = document.getElementById("workerList").getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "";
    }

    document.getElementById("userDetails").style.display = "none";

    isOpen = false;
    currentItem = null;
}

// Click anywhere outside → reset
document.addEventListener("click", function() {
    if (isOpen) {
        resetView();
    }
});
document.querySelector("h1").innerText = "Welcome to My Dynamic Page!";

document.getElementById("changeTextButton").addEventListener("click", function() {
    document.querySelector("h1").innerText = "You clicked the button!";
});

document.getElementById("darkModeButton").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("submitComment").addEventListener("click", function () {
    let commentInput = document.getElementById("userComment")
    let commentText = commentInput.value.trim();

    if(commentText === "") {
        showMessage("⚠️ Please enter a comment!", "error");
        return;
    }

    if (commentText.length > 200) {
        showMessage("⚠️ Comment is too long! Max 200 characters.", "error");
        return;
    }
    
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(commentText);
        localStorage.setItem("comments", JSON.stringify(comments));

        displayComments();
        showMessage("✅ Comment added successfully!", "success");
        commentInput.value = "";
});

function displayComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let commentsection = document.getElementById("commentSection");
    commentsection.innerHTML = "";

    comments.forEach((commentText, index) => {
        let commentContainer = document.createElement("div");
        commentContainer.classList.add("comment-container")

        let newComment = document.createElement("p");
        newComment.innerText = commentText;

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", function() {
            editComment(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteComment(index);
        });

        commentContainer.appendChild(newComment);
        commentContainer.appendChild(editButton);
        commentContainer.appendChild(deleteButton);
        commentsection.appendChild(commentContainer);

        commentContainer.style.opacity = "0";
        setTimeout(() => {
            commentContainer.style.transition = "opacity 0.5s";
            commentContainer.style.opacity = "1";
        }, 100);
    });
}

document.addEventListener("DOMContentLoaded", displayComments);

function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments();
}

function editComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let newComment = prompt("Edit your comment:", comments[index]);

    if (newComment !== null) {
        comments[index] = newComment;
        localStorage.setItem("comments", JSON.stringify(comments));

        displayComments();
    }
}

function showMessage (message, type) {
    let messageBox = document.getElementById("messageBox");
    messageBox.innerText = message;
    messageBox.className = type;

    messageBox.style.opacity = "1";
    setTimeout(() => {
        messageBox.style.opacity = "0";
    }, 2000);
}

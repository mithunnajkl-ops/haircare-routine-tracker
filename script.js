// ==========================================
// HAIRCARE TRACKER
// ==========================================


// ---------- DATE ----------

const today = new Date();

const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric"
};

document.getElementById("fullDate").textContent =
    today.toLocaleDateString("en-US", dateOptions);

document.getElementById("todayDate").textContent =
    today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });


// ---------- ROUTINE STORAGE ----------

const tasks = document.querySelectorAll(".routine-task");

function loadTasks() {

    tasks.forEach((task, index) => {

        const saved =
            localStorage.getItem(`haircare-task-${index}`);

        if (saved === "true") {
            task.checked = true;
        }

    });

    updateProgress();
}


// ---------- TASK CHANGE ----------

tasks.forEach((task, index) => {

    task.addEventListener("change", () => {

        localStorage.setItem(
            `haircare-task-${index}`,
            task.checked
        );

        updateProgress();

    });

});


// ---------- UPDATE PROGRESS ----------

function updateProgress() {

    const total = tasks.length;

    const completed =
        [...tasks].filter(task => task.checked).length;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    // Hero percentage

    document.getElementById("heroProgress").textContent =
        percentage + "%";

    document.getElementById("heroProgressBar").style.width =
        percentage + "%";


    // Completed count

    document.getElementById("completedCount").textContent =
        completed;


    // Morning

    const morningTasks =
        document.querySelectorAll(".morning");

    const morningCompleted =
        [...morningTasks].filter(task => task.checked).length;

    document.getElementById("morningCount").textContent =
        morningCompleted;


    // Evening

    const eveningTasks =
        document.querySelectorAll(".evening");

    const eveningCompleted =
        [...eveningTasks].filter(task => task.checked).length;

    document.getElementById("eveningCount").textContent =
        eveningCompleted;


    // Weekly progress

    document.getElementById("weeklyPercent").textContent =
        percentage + "%";


    document.querySelector(".progress-circle").style.background =
        `conic-gradient(
            var(--pink) ${percentage}%,
            #eee4de ${percentage}%
        )`;


    // Today's chart bar

    const barHeight =
        Math.max(percentage, 3);

    document.getElementById("todayBar").style.height =
        barHeight + "%";
}


// ---------- WASH TRACKER ----------

let washedToday =
    localStorage.getItem("hair-washed-today") === "true";

function updateWashButton() {

    const button =
        document.getElementById("washButton");

    if (washedToday) {

        button.textContent =
            "✓ Hair Washed Today";

        button.classList.add("washed");

    } else {

        button.textContent =
            "💧 Mark Hair Washed";

        button.classList.remove("washed");

    }
}


function toggleWash() {

    washedToday = !washedToday;

    localStorage.setItem(
        "hair-washed-today",
        washedToday
    );

    updateWashButton();

    updateWashCount();
}


function updateWashCount() {

    const count =
        washedToday ? 1 : 0;

    document.getElementById("washCount").textContent =
        count;
}


// ---------- NOTES ----------

const notesInput =
    document.getElementById("notesInput");

const savedNotes =
    localStorage.getItem("haircare-notes");

if (savedNotes) {
    notesInput.value = savedNotes;
}


function saveNotes() {

    localStorage.setItem(
        "haircare-notes",
        notesInput.value
    );

    const status =
        document.getElementById("saveStatus");

    status.textContent =
        "✓ Notes saved successfully!";

    setTimeout(() => {

        status.textContent =
            "Your notes are saved automatically.";

    }, 2000);
}


// Auto-save notes while typing

notesInput.addEventListener("input", () => {

    localStorage.setItem(
        "haircare-notes",
        notesInput.value
    );

});


// ---------- SCROLL ----------

function scrollToRoutine() {

    document
        .getElementById("routine")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ---------- INITIALIZE ----------

loadTasks();
updateWashButton();
updateWashCount();

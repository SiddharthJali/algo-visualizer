const backendUrl = "http://127.0.0.1:8000";
let selectedAlgorithm = "";

// Fetch available algorithms from the backend
async function fetchAlgorithms() {
    const response = await fetch(`${backendUrl}/algorithms/`);
    const data = await response.json();

    const algoContainer = document.getElementById("algorithms");
    algoContainer.innerHTML = "";

    data.algorithms.forEach(algo => {
        const button = document.createElement("button");
        button.textContent = algo.replace("_", " ");
        button.onclick = () => selectAlgorithm(algo);
        button.classList.add("algo-btn");
        algoContainer.appendChild(button);
    });
}

// Handle algorithm selection
function selectAlgorithm(algo) {
    selectedAlgorithm = algo;
    document.querySelectorAll(".algo-btn").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");
}

// Run the selected algorithm
async function runAlgorithm() {
    if (!selectedAlgorithm) {
        alert("Please select an algorithm first!");
        return;
    }

    const numbersInput = document.getElementById("numbers").value;
    const targetInput = document.getElementById("target").value;
    const resultDiv = document.getElementById("result");
    const visualizationDiv = document.getElementById("visualization");

    resultDiv.innerHTML = "";
    visualizationDiv.innerHTML = "";

    const numbersArray = numbersInput.split(",").map(num => parseInt(num.trim()));
    const target = parseInt(targetInput);

    const response = await fetch(`${backendUrl}/run/${selectedAlgorithm}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ array: numbersArray, target: target }),
    });

    const data = await response.json();
    visualizeSteps(data.steps, data.found, data.index);
}

// Visualization
function visualizeSteps(steps, found, index) {
    steps.forEach((step, i) => {
        setTimeout(() => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.textContent = step.value;

            if (step.is_match) {
                box.classList.add("found");
            }

            document.getElementById("visualization").appendChild(box);

            if (i === steps.length - 1) {
                document.getElementById("result").innerHTML = found 
                    ? `<h2 style="color:green">Element found at index ${index}</h2>`
                    : `<h2 style="color:red">Element not found</h2>`;
            }
        }, i * 500);
    });
}

// Event listener
document.getElementById("run-btn").addEventListener("click", runAlgorithm);

// Load algorithms on page load
fetchAlgorithms();

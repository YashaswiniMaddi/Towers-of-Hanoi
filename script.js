let numDisks, steps = [], currentStep = 0, totalSteps = 0;

function startGame() {
    const tower1 = document.getElementById("tower1");
    const tower2 = document.getElementById("tower2");
    const tower3 = document.getElementById("tower3");
    numDisks = parseInt(document.getElementById("numDisks").value);
    tower1.innerHTML = '';
    tower2.innerHTML = '';
    tower3.innerHTML = '';
    steps = [];
    currentStep = 0;
    totalSteps = 0;
    document.getElementById("stepsInfo").textContent = `Total Steps: 0`;
    document.getElementById("completedMessage").textContent = '';
    
    // Create disks in Tower 1
    for (let i = numDisks; i > 0; i--) {
        const disk = document.createElement("div");
        disk.className = "disk";
        disk.style.width = `${20 + i * 20}px`;
        disk.textContent = i;
        disk.style.bottom = `${(numDisks - i) * 20}px`;
        tower1.appendChild(disk);
    }
    
    // Generate steps and start the process
    hanoi(numDisks, "tower1", "tower3", "tower2");
}

function hanoi(n, from, to, aux) {
    if (n > 0) {
        hanoi(n - 1, from, aux, to);
        steps.push({ disk: n, from, to });
        hanoi(n - 1, aux, to, from);
    }
}

function nextStep() {
    if (currentStep < steps.length) {
        const { disk, from, to } = steps[currentStep];
        moveDisk(disk, from, to);
        currentStep++;
        totalSteps++;
        document.getElementById("stepsInfo").textContent = `Total Steps: ${totalSteps}`;
    } else {
        document.getElementById("completedMessage").textContent = 'Completed!';
    }
}

function moveDisk(diskNum, from, to) {
    const fromTower = document.getElementById(from);
    const toTower = document.getElementById(to);
    const disk = Array.from(fromTower.children).find(d => d.textContent == diskNum);
    
    if (disk) {
        fromTower.removeChild(disk);
        const newHeight = toTower.children.length * 20;
        disk.style.bottom = `${newHeight}px`;
        toTower.appendChild(disk);
    }
}

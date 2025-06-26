let currentStep = 0;
let steps = [];
let timerInterval;

function toggleSection(id) {
  const section = document.getElementById(id);
  section.classList.toggle("hidden");
}

function startCooking() {
  steps = document.querySelectorAll("#steps li");
  currentStep = 0;
  highlightStep();
  document.getElementById("timer").classList.remove("hidden");
  startTimer(45 * 60);
}

function highlightStep() {
  steps.forEach((step, index) => {
    step.style.background = index === currentStep ? "#ffeaa7" : "";
  });

  const progress = document.getElementById("progress");
  progress.style.width = ((currentStep + 1) / steps.length) * 100 + "%";
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    highlightStep();
  }
}

function startTimer(seconds) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timerInterval);
      document.getElementById("time").textContent = "Done!";
      return;
    }
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    document.getElementById("time").textContent =
      `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    seconds--;
  }, 1000);
}

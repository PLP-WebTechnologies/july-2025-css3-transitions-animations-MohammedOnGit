/********************************************
 * PART 2: JavaScript Functions            *
 * - Scope, Parameters & Return Values     *
 *******************************************/

// Calculator function demonstrating parameters and return values
function calculate(operation) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  let result;
  
  if (isNaN(num1) || isNaN(num2)) {
      document.getElementById('result').textContent = "Please enter valid numbers";
      return; // Early return if inputs are invalid
  }
  
  // Perform calculation based on operation parameter
  switch(operation) {
      case 'add':
          result = addNumbers(num1, num2);
          break;
      case 'multiply':
          result = multiplyNumbers(num1, num2);
          break;
      default:
          result = "Invalid operation";
  }
  
  document.getElementById('result').textContent = `Result: ${result}`;
}

// Helper function with return value
function addNumbers(a, b) {
  return a + b;
}

// Helper function with return value
function multiplyNumbers(a, b) {
  return a * b;
}

// Function demonstrating variable scope
function testScope() {
  // Global variable (if declared without var/let/const)
  globalVar = "I'm global";
  
  // Local variable
  let localVar = "I'm local";
  
  // Block-scoped variable
  if (true) {
      let blockVar = "I'm block-scoped";
      var functionScopedVar = "I'm function-scoped";
  }
  
  let output = `Global: ${globalVar}\n`;
  output += `Local: ${localVar}\n`;
  
  try {
      output += `Block: ${blockVar}\n`; // This will throw an error
  } catch (e) {
      output += "Block variable not accessible here\n";
  }
  
  output += `Function-scoped: ${functionScopedVar}`;
  
  document.getElementById('scope-output').textContent = output;
}

/********************************************
* PART 3: Combining CSS & JavaScript      *
*******************************************/

// Function to start different animations
function startAnimation(elementId, animationType) {
  const element = document.getElementById(elementId);
  
  // First reset any existing animations
  resetAnimation(elementId);
  
  // Force reflow to ensure reset is applied before adding new class
  void element.offsetWidth;
  
  // Add the appropriate animation class based on parameter
  switch(animationType) {
      case 'slide':
          element.classList.add('slide-animation');
          break;
      case 'rotate':
          element.classList.add('rotate-animation');
          break;
  }
  
  // Enable pause button when animation starts
  const pauseBtn = document.querySelector(`[data-target="${elementId}"]`);
  if (pauseBtn) {
      pauseBtn.disabled = false;
      pauseBtn.textContent = 'Pause Animation';
  }
}

// Function to reset animations
function resetAnimation(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove('slide-animation', 'rotate-animation');
  element.style.animationPlayState = 'running';
}

// Modal control function
function toggleModal() {
  const modal = document.getElementById('modal');
  if (modal.style.display === 'block') {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
          modal.style.display = 'none';
      }, 300);
  } else {
      modal.style.display = 'block';
  }
}

// Animation pause/resume function
function toggleAnimationPause(elementId, event) {
  const element = document.getElementById(elementId);
  const button = event.target;
  
  if (element.style.animationPlayState === 'paused') {
      element.style.animationPlayState = 'running';
      button.textContent = 'Pause Animation';
  } else {
      element.style.animationPlayState = 'paused';
      button.textContent = 'Resume Animation';
  }
}

// Initialize animations and buttons
document.addEventListener('DOMContentLoaded', function() {
  // Add fadeOut animation dynamically
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
      }
      .paused {
          animation-play-state: paused;
          opacity: 0.7;
      }
  `;
  document.head.appendChild(style);
  
  // Add pause buttons for all animatable elements
  const animatableElements = document.querySelectorAll('.animatable-box, .spin-continuous');
  animatableElements.forEach(element => {
      const button = document.createElement('button');
      button.className = 'btn';
      button.textContent = 'Pause Animation';
      button.dataset.target = element.id;
      button.onclick = (e) => toggleAnimationPause(element.id, e);
      button.disabled = true; // Disabled until animation starts
      element.parentNode.insertBefore(button, element.nextSibling);
  });
});
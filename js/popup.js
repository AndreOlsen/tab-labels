const panels = {
    'overview-panel': document.getElementById('overview-panel'),
    'new-label-panel': document.getElementById('new-label-panel')
};

let currentPanelId = 'overview-panel'; // Set the initial panel ID
let previousPanelId;

document.addEventListener('click', (event) => {
    const transitionElement = event.target.closest('.panel-transition');
    const goBackElement = event.target.closest('.go-back');

    if (transitionElement) {
        const nextPanelId = transitionElement.dataset.goto;
        if (nextPanelId) {
            switchPanel(nextPanelId);
        }
    } else if (goBackElement) {
        if (previousPanelId) {
            switchPanel(previousPanelId);
        }
    }
});

function switchPanel(nextPanelId) {
    // Store the current panel ID for "go back" functionality
    previousPanelId = currentPanelId;

    Object.values(panels).forEach(panel => {
        panel.classList.add('hidden');
    });

    panels[nextPanelId].classList.remove('hidden');

    // Update the current panel ID
    currentPanelId = nextPanelId;

    // Now you can use previousPanelId for "go back" if needed
    console.log('Current Panel:', currentPanelId);
    console.log('Previous Panel:', previousPanelId);
}

const patternsContainer = document.getElementById('patterns-container');
const addPatternButton = document.getElementById('add-pattern');
const patternForm = document.getElementById('pattern-form');

// Load existing patterns from storage
chrome.storage.sync.get('patterns', (data) => {
    const patterns = data.patterns || [];
    patterns.forEach(addPatternFields);
});

// Add a new pattern input set
addPatternButton.addEventListener('click', () => {
    addPatternFields();
});

// Save patterns to storage
patternForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const patterns = [];
    const patternElements = document.querySelectorAll('.pattern');

    patternElements.forEach((el) => {
        const pattern = el.querySelector('.pattern-input').value;
        const label = el.querySelector('.label-input').value;
        const color = el.querySelector('.color-input').value;

        if (pattern && label) {
            patterns.push({ pattern, label, color });
        }
    });

    chrome.storage.sync.set({ patterns }, () => {
        alert('Patterns saved!');
    });
});

// Function to add input fields for a pattern
function addPatternFields(data = {}) {
    const div = document.createElement('div');

    div.className = 'pattern';
    div.innerHTML = `
        <input type="text" class="pattern-input" placeholder="URL pattern" value="${data.pattern || ''}" required>
        <input type="text" class="label-input" placeholder="Label" value="${data.label || ''}" required>
        <input type="color" class="color-input" value="${data.color || '#000000'}">
        <button type="button" class="remove-pattern">&times;</button>
    `;
    
    // Remove pattern fields
    div.querySelector('.remove-pattern').addEventListener('click', () => {
        div.remove();
    });

    patternsContainer.appendChild(div);
}
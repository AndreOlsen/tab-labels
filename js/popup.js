const panels = {
    labelPanel: document.querySelector("#labelPanel"),
    newLabelPanel: document.querySelector("#newLabelPanel")
};

let currentPanelId = 'labelPanel'; // Set the initial panel ID
let previousPanelId;

document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('panel-transition')) {
        const nextPanelId = clickedElement.dataset.goto;

        if (nextPanelId) {
            switchPanel(nextPanelId);
        }
    }

    if (clickedElement.classList.contains('go-back')) {
        switchPanel(previousPanelId);
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

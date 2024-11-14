class PanelManager {
    /**
     * Creates an instance of PanelManager.
     * 
     * @param {Object} panels - An object mapping panel IDs to their DOM elements.
     * @param {string} initialPanelId - The ID of the panel to display initially.
     */
    constructor({ panels, initialPanelId }) {
        this.panels = panels;
        this.currentPanelId = initialPanelId;
        this.previousPanelId = null;
        this.historyStack = []; // Optional: For multiple history entries

        this.init();
    }

    /**
     * Initializes the panel manager by showing the initial panel and setting up event listeners.
     */
    init() {
        // Show the initial panel
        this.showPanel(this.currentPanelId, false);

        // Set up event listeners
        document.addEventListener('click', (event) => this.handleClick(event));
    }

    /**
     * Handles click events to manage panel transitions.
     * 
     * @param {Event} event - The click event.
     */
    handleClick(event) {
        const transitionElement = event.target.closest('.panel-transition');
        const goBackElement = event.target.closest('.back');

        if (transitionElement) {
            const nextPanelId = transitionElement.dataset.goto;

            if (nextPanelId && this.panels[nextPanelId]) {
                this.switchPanel(nextPanelId);
            } else {
                console.warn(`Panel with ID "${nextPanelId}" does not exist.`);
            }
        } else if (goBackElement) {
            this.goBack();
        }
    }

    /**
     * Switches to the specified panel.
     * 
     * @param {string} nextPanelId - The ID of the panel to switch to.
     */
    switchPanel(nextPanelId) {
        if (nextPanelId === this.currentPanelId) {
            // Already on the desired panel
            return;
        }

        // Update history stack
        this.historyStack.push(this.currentPanelId);

        // Hide current panel
        this.hidePanel(this.currentPanelId);

        // Show next panel
        this.showPanel(nextPanelId, true);

        // Update current panel ID
        this.currentPanelId = nextPanelId;
    }

    /**
     * Navigates back to the previous panel.
     */
    goBack() {
        if (this.historyStack.length === 0) {
            console.warn('No previous panel to go back to.');
            return;
        }

        const previousPanelId = this.historyStack.pop();

        if (previousPanelId && this.panels[previousPanelId]) {
            // Hide current panel
            this.hidePanel(this.currentPanelId);

            // Show previous panel
            this.showPanel(previousPanelId, true);

            // Update current panel ID
            this.currentPanelId = previousPanelId;
        } else {
            console.warn(`Panel with ID "${previousPanelId}" does not exist.`);
        }
    }

    /**
     * Shows the specified panel.
     * 
     * @param {string} panelId - The ID of the panel to show.
     * @param {boolean} addToHistory - Whether to add the panel to history.
     */
    showPanel(panelId, addToHistory = true) {
        const panel = this.panels[panelId];

        if (panel) {
            panel.classList.remove('hidden');
            console.log(`Panel "${panelId}" is now visible.`);
        } else {
            console.error(`Panel with ID "${panelId}" not found.`);
        }
    }

    /**
     * Hides the specified panel.
     * 
     * @param {string} panelId - The ID of the panel to hide.
     */
    hidePanel(panelId) {
        const panel = this.panels[panelId];

        if (panel) {
            panel.classList.add('hidden');
            console.log(`Panel "${panelId}" is now hidden.`);
        } else {
            console.error(`Panel with ID "${panelId}" not found.`);
        }
    }
}

// Make available globally
window.PanelManager = PanelManager;
document.addEventListener('DOMContentLoaded', () => {
    if (window.Utils) {
        Utils.applyTheme();
    }

    // Instantiate the PanelManager
    new PanelManager({
        panels: {
            'overview-panel': document.getElementById('overview-panel'),
            'new-label-panel': document.getElementById('new-label-panel')
        },
        initialPanelId: 'overview-panel'
    });
});
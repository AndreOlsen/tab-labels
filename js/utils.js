export default class Utils {
    /**
     * Determines the theme to apply.
     * 
     * Checks if a theme is set in storage. If not, it uses the user's
     * `prefers-color-scheme` media query preference.
     * 
     * @param {string} currentTheme - The current theme from storage.
     * @returns {string} The theme to apply ('dark' or 'light').
     */
    static getTheme(currentTheme) {
        if (currentTheme && currentTheme !== "auto") {
            return currentTheme;
        }
    
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        
        return "light";
    }

    /**
     * Applies the theme to the document.
     * 
     * Retrieves the theme from storage and sets the `data-theme` attribute
     * on the `<html>` element.
     */
    static async applyTheme() {
        try {
            const { currentTheme } = await browser.storage.local.get("currentTheme");
            const theme = Utils.getTheme(currentTheme);
    
            document.documentElement.setAttribute("data-theme", theme);
        } catch (error) {
            console.error("Error applying theme:", error);
        }
    }    
}
/** Creates HTML Strings. */
export class Template {

    /**
     * Creates a disabled button.
     * @returns {string} - HTML-Template.
     */
    static dButton() {
        return /*html*/`
            <button id="start-btn" class="menu-ctrl" disabled >Loading</button>
        `
    }

    /**
     * Creates a control button.
     * @param {string} id - Id of button.
     * @param {string} name - Description of Button.
     * @returns {string} - HTML-Template.
     */
    static ctrlButton(id, name) {
        return/*html*/`
            <button id="${id}" class="menu-ctrl">${name}</button>
        `
    }

    /**
     * Creates a Sound-Button.
     * @param {string} id - Id of button.
     * @param {string} path - Path to image
     * @returns {string} - HTML-Template.
     */
    static soundButton(id, path) {
        return /*html*/`
            <button id="${id}" class="snd-ctrl"><img src="${path}"></button>
        `
    }
}
/** Sumrice alle Templates for HTML */
export class Template{
    /**
     * Creates a disabled button.
     * @param {string} id - ID of button.
     * @param {string} name - Name of button.
     * @returns {string} HTML-Button
     */
    static disBtn(id ,name) {
        return /*html*/`
            <button id="${id}" class="menu-ctrl" disabled >${name}</button>
        `
    }
}
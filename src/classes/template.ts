import { ControlItem } from "../interfaces/control-item.js";

export class Template {
    private constructor() {};

    static overlay(name:string, content: string, closeBtn: boolean = true) {
        const button = closeBtn ? `<button id="btn-close-${name}" class="btn-close">X</button>` : '';
        return `
            <header class="w-full flex"> 
                ${button}
            </header>
            <div class="overlay-body w-full flex" id="overlay-${name}-body">${content}</div>
        `
    }

    static controlKey(key: string): string {
        return `
            <div class="control-key">${key}</div>
        `
    }

    static controlContainer(items: string): string {
        return `
            <div id="control-container" class="w-full flex">${items}</div>
        `
    }

    static controlItem(item: ControlItem, keys: string): string {
        return `
            <div class="control-item flex">
                <div class="control-img-wrapper w-full flex">
                    <img class="w-full" src="${item.path}">
                </div>
                <h2 class="font-cowboy">${item.action}</h2>
                <div class="key-wrapper w-full flex">${keys}</div>
            </div>
            `
    }

    static impressum(): string {
        return `
            <div class="impressum-container"
                <p>Marco Elste</p>
                <p>Karl-Marx-Ring 5</p>
                <p>06317 Seegebiet Mansfelder Land</p>
                <h2>Contact</h2>
                <p>Tel.: 0151 22281638</p>
                <p>E-Mail: <a href="mailto:marco.elste@web.de">marco.elste@web.de</a></p>
            </div>
        `
    }
}
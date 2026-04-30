import { ControlItem } from "../interfaces/control-item.js";

export class Template {
    private constructor() {};

    static overlay(name:string) {
        return `
            <header> 
                <button id="btn-close-${name}" class="btn-close">X</button>
            </header>
            <div class="overlay-body" id="overlay-${name}-body"></div>
        `
    }

    static controlContainer(): string {
        return `<div id="control-container"></div>`;
    }

    static controlKey(key: string): string {
        return `
            <span class="control-key">${key}</span>
        `
    }

    static controlItem(item: ControlItem, keys: string): string {
        return `
            <div class="control-item">
                <div class="control-img-wrapper">
                    <img class="control-img" src="${item.path}">
                </div>
                <h2 class="font-cowboy">${item.action}</h2>
                <div class="key-wrapper">${keys}</div>
            </div>
            `
    }
}
import { ControlItem } from "../interfaces/control-item.js";

export class Template {
    private constructor() {};

    static overlay(name:string) {
        return `
            <header class="w-full flex"> 
                <button id="btn-close-${name}" class="btn-close">X</button>
            </header>
            <div class="overlay-body w-full flex" id="overlay-${name}-body"></div>
        `
    }

    static controlContainer(): string {
        return `<div id="control-container" class="w-full flex"></div>`;
    }

    static controlKey(key: string): string {
        return `
            <div class="control-key">${key}</div>
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
}
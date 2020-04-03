export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    template: HTMLTemplateElement | null = null;
    placeHolder: U | null = null;
    element: T | null = null;

    constructor(templateId: string, placeHolderId: string, elementId: string, protected position: InsertPosition) {
        this.template = document.getElementById(templateId)! as HTMLTemplateElement;
        this.placeHolder = document.getElementById(placeHolderId)! as U;
        this.element = document.importNode(this.template.content, true).firstElementChild as T;
        this.element.id = elementId;

        if (this.element) {
            this.placeHolder?.insertAdjacentElement(position, this.element);
        }
    }

    abstract configure(): void;
    abstract renderContent(): void;
}
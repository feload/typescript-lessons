import { Component } from './component';
import { Constants } from '../enums/constants';
import { autobind } from '../decorators/autobind';
import { InputData } from '../types/input-data';
import { isValid } from '../utils/validation';
import { state } from '../state/project-state';

export class Form extends Component<HTMLFormElement, HTMLDivElement>{

    titleInput: HTMLInputElement | null = null;
    descriptionInput: HTMLInputElement | null = null;
    peopleInput: HTMLInputElement | null = null;

    constructor() {
        super('project-input', 'app', 'user-input', Constants.AfterBegin);
        this.configure();
    }

    @autobind
    private gatherInputData(): InputData | null {

        let data: InputData | null = null;
        const title = (this.titleInput?.value as string).trim();
        const description = (this.descriptionInput?.value as string).trim();
        const people = (this.peopleInput?.value as string).trim();

        if (
            isValid({ value: title, required: true, min: 3, max: 5 }) &&
            isValid({ value: description, required: true, min: 3 }) &&
            isValid({ value: people, required: true, min: 1 })
        ) {
            data = { title, description, people: +people };
        }

        return data;
    }

    @autobind
    private submit(evt: Event) {
        evt.preventDefault();
        const data = this.gatherInputData();

        if (data == null) {
            alert('Missing data.')
        } else {
            state.addProject(data);
            this.clearForm();
        }
    }


    private clearForm() {
        this.element?.reset();
    }

    configure() {
        // Input fields.
        this.titleInput = this.element?.querySelector('#title')! as HTMLInputElement;
        this.descriptionInput = this.element?.querySelector('#description')! as HTMLInputElement;
        this.peopleInput = this.element?.querySelector('#people')! as HTMLInputElement;

        this.element?.addEventListener('submit', this.submit);
    }

    renderContent() { }
}
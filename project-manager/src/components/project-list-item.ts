import { Component } from './component';
import { Constants } from '../enums/constants';
import { autobind } from '../decorators/autobind';
import { Draggable } from '../models/drag-drop-interfaces';
import { Project } from '../models/project';

export class ProjectListItem extends Component<HTMLLIElement, HTMLUListElement>
    implements Draggable {
    private project: Project;

    get asignee() {
        const numPpl = this.project.people;
        return `${numPpl} ${(numPpl == 1) ? 'person' : 'people'}`;
    }

    constructor(placeHolderId: string, project: Project) {
        super('single-project', placeHolderId, project.id.toString(), Constants.AfterBegin);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(evt: DragEvent) {
        evt.dataTransfer!.setData('text/plain', this.project.id);
        evt.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(_: DragEvent) { }

    configure() {
        this.element?.addEventListener('dragstart', this.dragStartHandler);
        this.element?.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element?.querySelector('h2')!.textContent = this.project.title;
        this.element?.querySelector('h3')!.textContent = this.project.description;
        this.element?.querySelector('p')!.textContent = this.asignee;
    }
}
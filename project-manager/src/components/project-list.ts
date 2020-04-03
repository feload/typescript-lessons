import { Component } from './component';
import { Constants } from '../enums/constants';
import { autobind } from '../decorators/autobind';
import { DragTarget } from '../models/drag-drop-interfaces';
import { Project } from '../models/project';
import { ProjectListItem } from './project-list-item';
import { state, stateBus } from '../state/project-state';

export class ProjectList extends Component<HTMLElement, HTMLDivElement>
    implements DragTarget {

    constructor(private listType: Constants) {
        super('project-list', 'app', `${listType}-projects`, Constants.BeforeEnd);
        this.configure();
        this.renderContent();
    }

    @autobind
    private renderProjects(projects: Project[]) {
        this.element?.querySelector('ul')!.innerHTML = '';
        for (let project of projects.filter(p => p.status == this.listType)) {
            new ProjectListItem(`${this.listType}-projects-list`, project);
        }
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const el = this.element?.querySelector('ul');
            el?.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        state.moveProject(projectId, this.listType);
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const el = this.element?.querySelector('ul');
        el?.classList.remove('droppable');
    }

    configure() {
        stateBus.subscribe(this.renderProjects);
        this.element?.addEventListener('dragover', this.dragOverHandler);
        this.element?.addEventListener('drop', this.dropHandler);
        this.element?.addEventListener('dragleave', this.dragLeaveHandler);
    }

    renderContent() {
        const listId = `${this.listType}-projects-list`;
        this.element?.querySelector('ul')!.id = listId;
        this.element?.querySelector('h2')!.textContent = `${this.listType} projects`.toUpperCase();
    }
}
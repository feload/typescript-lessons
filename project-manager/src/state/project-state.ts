import { Project } from '../models/project';
import { Constants } from '../enums/constants';

type Listener<T> = (listeners: T[]) => void;

class StateBus<T> {
    private listeners: Listener<T>[] = [];
    public subscribe(fn: Listener<T>) {
        this.listeners.push(fn);
    }
    public broadcast(items: T[]) {
        for (let listener of this.listeners) {
            listener(items);
        }
    }
}

export class ProjectState {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() { }

    public static getInstance(): ProjectState {
        this.instance = this.instance || new ProjectState();
        return this.instance;
    }

    public addProject(project: any) {
        const newProject = new Project(
            Math.random().toString(),
            project.title,
            project.description,
            project.people,
            Constants.Active);

        this.projects.push(newProject);
        this.broadcastState();
    }

    public moveProject(projectId: string, newState: Constants) {
        const project = this.projects.find(({ id }) => id == projectId);
        project?.setStatus(newState);
        this.broadcastState();
    }

    public broadcastState() {
        stateBus.broadcast(this.projects.slice());
    }

}

export const stateBus: StateBus<Project> = new StateBus<Project>();
export const state = ProjectState.getInstance();
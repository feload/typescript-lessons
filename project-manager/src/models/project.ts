import { Constants } from '../enums/constants';

export class Project {
    constructor (
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: Constants
    ) {}

    public setStatus (newStatus: Constants) {
        this.status = newStatus;
    }
}
import { Constants } from './enums/constants';
import { Form } from './components/form';
import { ProjectList } from './components/project-list';

// Drag and drop.
// State management.

new Form();
new ProjectList(Constants.Active);
new ProjectList(Constants.Finished);
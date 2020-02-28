import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DeveloperController extends Controller {
  @service store;

  @action
  async save() {
    await this.model.developer.save();
    this.transitionToRoute('index');
  }

  @action
  onKeypress(event) {
    if (event.keyCode == 13 && event.target.tagName !== 'BUTTON') {
      event.preventDefault();
      return false;
    }
  }

  @action
  async createRole(name) {
    if (
      this.model.roles
        .map(role => role.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      return;
    }

    const role = this.store.createRecord('role', { name });
    await role.save();

    this.model.developer.set('role', role);
  }

  @action
  async createFramework(name) {
    if (
      this.model.frameworks
        .map(framework => framework.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      return;
    }

    const framework = this.store.createRecord('framework', { name });
    await framework.save();

    const developerFrameworks = this.model.developer.get('frameworks');
    this.model.developer.set(
      'frameworks',
      developerFrameworks.addObject(framework)
    );
  }

  @action
  async fire() {
    await this.model.developer.destroyRecord();
    this.transitionToRoute('index');
  }
}

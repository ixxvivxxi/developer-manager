import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DeveloperController extends Controller {
  @service store;
  @tracked errors = {};

  @action
  async save() {
    if (!this.model.developer.firstName) {
      return this.set('errors.firstName', true);
    }
    await this.model.developer.save();
    this.transitionToRoute('index');
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

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
    const role = this.store.createRecord('role', { name });
    await role.save();
  }

  @action
  async createFramework(name) {
    const framework = this.store.createRecord('framework', { name });
    await framework.save();
  }

  @action
  async fire() {
    await this.model.developer.destroyRecord();
    this.transitionToRoute('index');
  }
}

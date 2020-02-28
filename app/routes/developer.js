import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { hash } from 'rsvp';
import emoji from 'developer-manager/utils/emoji';

export default class DeveloperRoute extends Route {
  @service store;

  async model({ developer_id }) {
    let developer;
    if (developer_id == 0) {
      developer = this.store.createRecord('developer', { emoji: emoji() });
    } else {
      developer = this.store.findRecord('developer', developer_id);
    }

    return await hash({
      developer,
      frameworks: this.store.findAll('framework'),
      roles: this.store.findAll('role'),
    });
  }

  @action
  willTransition() {
    const model = this.controller.model;
    if (model.developer.isNew) {
      return model.developer.destroyRecord();
    }

    if (model.developer.hasDirtyAttributes) {
      return model.developer.rollbackAttributes();
    }
  }
}

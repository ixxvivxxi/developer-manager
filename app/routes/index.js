import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    return await hash({
      developers: this.store.findAll('developer'),
      roles: this.store.findAll('role'),
      frameworks: this.store.findAll('framework'),
    });
  }
}

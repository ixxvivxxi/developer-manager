import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  role = null;

  @tracked
  frameworks = [];

  get developers() {
    let developers = this.model.developers;

    if (this.role) {
      developers = developers.filterBy('role.id', this.role.id);
    }

    if (this.frameworks.length > 0) {
      developers = developers.filter(developer =>
        this.frameworks.mapBy('id').some(id =>
          developer.get('frameworks')
            .mapBy('id')
            .includes(id)
        )
      );
    }

    return developers;
  }

  @action
  fire(developer) {
    developer.destroyRecord();
  }
}

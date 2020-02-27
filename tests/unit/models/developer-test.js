import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | developer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('developer', {});
    assert.ok(model);
  });

  test('should own a profile', function(assert) {
    const Developer = this.owner.lookup('service:store').modelFor('developer');
    const relationship = get(Developer, 'relationshipsByName').get('role');

    assert.equal(relationship.key, 'role', 'has relationship with role');
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should own a frameworks', function(assert) {
    const Developer = this.owner.lookup('service:store').modelFor('developer');
    const relationship = get(Developer, 'relationshipsByName').get(
      'frameworks'
    );

    assert.equal(
      relationship.key,
      'frameworks',
      'has relationship with frameworks'
    );
    assert.equal(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });

  test('fullName contains first and last names', function(assert) {
    const developer = run(() =>
      this.owner.lookup('service:store').createRecord('developer')
    );
    run(() => (developer.firstName = 'Nick'));
    assert.equal(developer.fullName, 'Nick');

    run(() => (developer.lastName = 'Smet'));
    assert.equal(developer.fullName, 'Nick Smet');
  });
});

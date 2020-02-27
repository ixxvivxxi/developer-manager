import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const fillAndSaveForm = async function() {
  await visit('/0');
  await fillIn('form .form-group:nth-child(1) input', 'Nick');
  await fillIn('form .form-group:nth-child(2) input', 'Smet');
  await click('.btn-save-developer');
};

module('Acceptance | developer manager', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2').hasText('👨‍💻 Developers Hire');

    assert.dom('h2 a').hasText('Hire');

    await click('h2 a');
    assert.equal(currentURL(), '/0');
  });

  test('visiting new developer', async function(assert) {
    await visit('/0');
    assert.equal(currentURL(), '/0');

    assert.dom('h2').hasTextContaining('Hire');
    assert.dom('a').hasText('Back to developers');

    assert.dom('.btn-save-developer').hasText('Hire');
    await click('.btn-save-developer');
    assert.dom('form .form-group:nth-child(1) input').hasClass('is-invalid');

    await click('a');
    assert.equal(currentURL(), '/');
  });

  test('add developer', async function(assert) {
    await fillAndSaveForm();
    assert.equal(currentURL(), '/');
    assert.dom('tbody tr:first-child .developer-first-name').hasText('Nick');
  });

  test('visit developer', async function(assert) {
    await fillAndSaveForm();
    assert.equal(currentURL(), '/');
    await click('tbody tr:first-child .btn-edit-developer');
    assert.dom('h2').hasTextContaining('Nick Smet');
  });

  test('fire developer from table', async function(assert) {
    await fillAndSaveForm();
    await click('tbody tr:first-child .btn-fire-developer');
    assert.dom('tbody').doesNotHaveTagName('tr');
  });

  test('fire developer from form', async function(assert) {
    await fillAndSaveForm();
    await click('tbody tr:first-child .btn-edit-developer');
    await click('.btn-fire-developer');
    assert.equal(currentURL(), '/');
    assert.dom('tbody').doesNotHaveTagName('tr');
  });
});

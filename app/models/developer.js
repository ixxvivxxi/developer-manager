import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class DeveloperModel extends Model {
  @attr('string') emoji;
  @attr('string', { defaultValue: '' }) firstName;
  @attr('string', { defaultValue: '' }) lastName;

  @belongsTo('role') role;
  @hasMany('framework') frameworks;

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

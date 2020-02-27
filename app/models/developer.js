import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class DeveloperModel extends Model {
  @attr emoji;
  @attr firstName;
  @attr lastName;

  @belongsTo('role') role;
  @hasMany('framework') frameworks;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

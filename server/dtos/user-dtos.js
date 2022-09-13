module.exports = class UserDto {
 email;
 id;
 isActivated;
 role;
 firstName;
 secondName;
 avatar;
 constructor(model, firstName, secondName, avatar) {
  this.id = model.id;
  this.email = model.email;
  this.isActivated = model.isActivated;
  this.role = model.role;
  this.firstName = firstName;
  this.secondName = secondName;
  this.avatar = avatar;
 }
}
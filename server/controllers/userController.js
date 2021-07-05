class UserController {
 async regestration(req, res) {

 }
 async login(req, res) {

 }
 async check(req, res) {
  const {id} = req.query;
  res.json({ message: id });
 }
}

module.exports = new UserController();
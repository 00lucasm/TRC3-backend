class UserController{
	test(req, res){
		return res.json({ok: "online!"})
	}
}

export default new UserController();
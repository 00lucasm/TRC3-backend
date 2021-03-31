import User from "../models/User";

// CRUD
class UserController{
	// CREATE with POST method
	async store(req, res){
		const { name, email } = req.body;

		if(!(name && email)){
			return res.status(400).json({message: "Nome e email são obrigatórios"})
		}

		try{
			const user = await User.create(req.body)

			return res.status(201).json(user)

		} catch (error){
			return res.status(500).json({message: `Erro interno: ${error}`})
		}
	}

	//READ with GET method
	async index(req, res){
		try{
			const users = await User.find()

			return res.status(200).json(users);
		}catch(error){
			return res.status(500).json({message: `Erro interno: ${error}`})
		}
	}

	//UPDATE with PUT/PATCH method
	async update(req, res){
		try{
			const { id } = req.params;
			const user = await User.findOne({ id })
			if(!user){
				return res.status(400).json({message: "user not found!"})
			}

			const { name, email } = req.body
			const user_updated = { name, email }
			await User.update(user_updated)
			return res.status(201).json(user_updated)
		}catch(error){
			return res.status(500).json({message: `Erro interno: ${error}`})
		}
		
	}
}
 
export default new UserController();
import User from "../models/User";

//CRUD
class UserController{
	//CREATE with POST method
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

	//UPDATE with PUT method
	async update(req, res){
		const { id } = req.params;

		if(!id){
			return res.status(400).json({message: "id é obrigatório!"})
		}

		const user = await User.findOne({id: id})
		console.log(id)

		if(!user){
			return res.status(404).json({message: "User not found!"})
		}

		/*
		const { name, email, age } = req.body
		const user_updated = { name, email, age }
		*/

		try{
			await User.updateOne(req.body).where({id: id})

			return res.status(201).json({message: "Usuário atualizado com sucesso!"})
		}catch (error){
			return res.status(500).json({message: `Erro interno ${error}`})
		}	
	}

	//DELETE with DELETE method
	async delete(req, res){
		try{
			const userToDelete = await User.findOne({ id: req.params.id })

			if(!userToDelete){
				return res.status(404).json({message: `Usuário ${req.params.id} não foi encontrado.`})
			}

			await User.deleteOne({ id: req.params.id })

			return res.json({message: "Usuário removido."})
		}catch(error){
			return res.status(500).json({message: `Erro interno ${error}`})
		}
	}
}
 
export default new UserController();
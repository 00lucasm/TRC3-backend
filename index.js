import express from 'express'

const server = express()

server.use(express.json())

// Middleware global (log)
server.use((req, res, next) => {
	console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
	return next()
})

// Middleware local
function checkId(req, res, next){
	// falsy: null, undefined
	if(!req.body.name){
		return res.status(422).json({message: "O nome é obrigatório"})
	}

	return next()
}

const users = ["André", "Ayrton", "Flávio"]

// CREATE
server.post("/users", checkId, (req, res) => {
	const { name } = req.body

	users.push(name)

	return res.json(users)
})

// READ
server.get("/users", (req, res) => {
	return res.json(users)
})

// UPDATE
server.put("/users/:id", (req, res) => {
	const { id } = req.params
	const { name } = req.body

	users[id] = name

	return res.json(users[id])
})

// DELETE
server.delete("/users/:id", (req, res) => {
	const { id } = req.params

	users.splice(id, 1)

	return res.json({message: "usuário excluído!"})
})

//http://localhost:3000
server.listen(3000)
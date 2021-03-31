import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	age: {
		type: Number,
		required: false,
	}
},
{
	versionKey: false,
	timestamps: true
});

UserSchema.plugin(autoIncrement.plugin, {
	model: "User",
	field: "id",
	startAt: 1,
	incrementBy: 1
})

export default mongoose.model("User", UserSchema)
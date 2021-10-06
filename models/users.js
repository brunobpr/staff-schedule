var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");

var UserSchema=mongoose.Schema({
username: String,
Password: String,
Section: String,
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User", UserSchema);
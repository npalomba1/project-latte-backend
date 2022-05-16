const { Schema, model} = require("mongoose"); 

const userSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true //means that no two users can have the same username
    }, 
    password: {
        type: String,
        required: true
    }, 
    profileImage: {
        type: String,
    }


},
{
    timeseries: true,
    timestamps: true,

}
); 

const User = model('User', userSchema); 

module.exports = User; 
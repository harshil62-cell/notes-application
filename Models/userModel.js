const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the username"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email already in use"]
    },
    password:{
        type:String,
        required:[true,"Please add password"],
        minLength:6,
        select:false
    },
},{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema);
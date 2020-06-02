const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({

    email: {
        type:String,
        required:true,
        unique: true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
        minlength:6
    },
    name: {
        type:String,
        required:true,
        maxlength:100
    },
    lastname: {
        type:String,
        maxlength:100

    },
    role: {
        type:Number,
        default: 0
    },
    token: {
        type:String,
    }

});


//  hashing passwords
userSchema.pre('save', function(next) {
    let document = this;

    if(document.inNew || document.isModified('password')) {
        
        bcrypt.hash(document.password,SALT_I,(err,hash) => {
            if(err) next(err);
            document.password = hash;
            next();
            
        });

    }

    next();
});



userSchema.methods.isCorrectPass = function(password,cb) {

    bcrypt.compare(password, this.password,(err,same) => {
        if(err) cb(err);

        cb(null,same);
    });

}

userSchema.methods.generateToken = function(cb) {

    let user = this;
    let email = user.email;
    let token = jwt.sign({email},config.SECRET,{expiresIn:'1h'});

    user.token = token;
    user.save((err,doc)=> {
        cb(err,token);
    
    });

}


userSchema.methods.deleteToken = function(cb) {
    let user = this;

    user.update({$unset:{token:1}},(err,res) => {
        if(err) cb(err);
        cb(null,{sucess:true});
    });


}


userSchema.statics.findByToken = function(token,cb) {

    this.findOne({token:token},(err,doc) => {
        if(err) cb(err);
        cb(null,doc);
        // console.log(doc);
    })


}


const User = mongoose.model('User',userSchema);

module.exports = { User }
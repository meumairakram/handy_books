
const express = require('express');

const apiRoutes = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env);

const mongoose = require('../models/database');
const { User } = require('../models/user');
const { Book } = require('../models/book');
const auth = require('../middlewares/auth');


// User Routes

apiRoutes.post('/user', (req,res) => {

    const user = new User(req.body);

    user.save((err,doc) => {
        if(err) res.status(400).send(err);

        res.status(200).json({
            post:true,
            user_id:doc._id
        });
    })

});


apiRoutes.get('/auth',auth,(req,res) => {
    
    // return res.status(200).json({isAuth:false,error:'Invalid user'})
    if(req.user) {
        return res.status(200).json({
            isAuth:true,
            email:req.user.email,
            name:req.user.name + ' ' + req.user.lastname,
            user_id:req.user._id           
  
        });
    } else {
        return res.status(200).json({isAuth:false,error:'Invalid user'})

    }
        
});


apiRoutes.post('/login',(req,res) => {

    const {email,password} = req.body;


    User.findOne({email:email},(err,doc) => {
        if(err) res.status(400).json(err);

        if(!doc) {             
            res.status(200).json({error:"User not found"});       
        } else {
            doc.isCorrectPass(password,(err,same) => {
                if(err) res.status(400).send(err)

                if(same) {
                    
                    doc.generateToken((err,token) => {
                        if(err) res.status(400).json({error:"There is an error"});
                        console.log(doc);
                        res.cookie('token',token,{httpOnly:true}).status(200).json({
                            isAuth:true,
                            email:doc.email,
                            name:doc.name + doc.lastname
                        });
                    });


                } else {
                    res.status(200).json({error:"Password Donot match"});
                }

               


            });
        }    

    });
});



apiRoutes.get('/getReviewer',(req,res) => {

    const userToSearch = req.query.user;

    User.findOne({_id:userToSearch}).exec((err,doc) => {
        if(err) res.status(404).send(err);
        res.status(200).json(doc);
    });

});



apiRoutes.get('/logout',auth,(req,res) => {
    // console.log(req.cookies.token)
    User.findOne({token:req.cookies.token},(err,doc) => {
        if(err) res.status(404).send(err);
        console.log(doc);
        doc.deleteToken((err,success) => {
            if(err) res.status(404).send(err);

            res.status(200).send(success);
        });
    });

});

// books functions


// Books CRUD
// Create book
apiRoutes.post('/book',(req,res) => {
    const book = new Book(req.body);

    book.save((err,doc) => {
        if(err) res.status(400).send('ERROR');

        res.status(200).json({
            post:true,
            bookId: doc._id
        });
    })
});

// Get Book
apiRoutes.get('/getBook',(req,res) => {

    let bookID = req.query.id;

    Book.findById(bookID,(err,doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send(doc);
    });

});


// Get All Books
apiRoutes.get('/getAllBooks',(req,res) => {
    // res.json({name:"Umair"});
    // console.log(req.query);
    Book.find().limit(parseInt(req.query.limit)).skip(parseInt(req.query.offset)).exec((err,doc) => {
        
        if(err) return res.status(400).send(err);
        return res.status(200).send(doc);
    })

});


apiRoutes.post('/getBooksByOwner', (req,res) => {

    console.log(req.body);

    if(req.body.ownerid == null) {
        return res.status(400).json({status:'Not Found'});
    }
    const {ownerid} = req.body;

    Book.find({ownerId:ownerid}).exec((err,doc) => {
        if(err) return res.status(404).send(err);

        return res.status(200).send(doc)


    });


});


apiRoutes.post('/updateBook', (req,res) => {
    let book_id = req.body.book_id;

    let updates = {
        name:req.body.name,
        author:req.body.author,
        price:req.body.price,
        review:req.body.review,
        pages:req.body.pages,
    };

    Book.findOneAndUpdate({_id:book_id},updates,{new:true},(err,doc) => {
        if(err) res.status(400).send(err);
        res.status(200).json(doc);
    });

})


module.exports = apiRoutes;
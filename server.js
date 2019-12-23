/*
    token dari mongodb
    mongodb+srv://admin:<password>@dbpertama-echjr.mongodb.net/test?retryWrites=true&w=majority
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
// koneksi ke mongodb
mongoose.connect('mongodb+srv://admin:1234@dbpertama-echjr.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser:true
},function(err){
    if(err){
        console.log(err)
    }else{
        console.log('sudah konek ke database')
    }
})

/** 
 * untuk membuat create user menggunkan post harus menginstall 
 * npm i body-parser --save
 * setelah itu membuat middleware
*/
// middleware
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true })); //menerima semua karakter yg ada pada keyboard


//halaman root
app.get('/', function(req,res,next){
    res.json('halaman beranda')
})
// halaman baru
// app.get('/:name', function(req,res,next){
//     res.json(req.params.name);
// })

// membuat user collection/schema -------------
// schema
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
// collection/model
var User = mongoose.model('User', UserSchema) //membuat model -> mengaitkan collection dan schema
// ---------------------------------------------

// membuat user baru dengan get
// app.get('/create-user', function(req,res,next){
//     var user = new User();
//     user.name = "Brandon";
//     user.age = 17;
//     // res.json(user); //hanya menampilkan di browser
//     // user.save() //menyimpan ke database mongodb
//     // untuk cek error
//     user.save(function(err){
//         if(err){
//             next(err);
//         }else{
//             res.json(user);
//         }
//     })
// })

// membuat user dengan post
app.post('/create-user', function(req,res,next){
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    })
})


// koneksi
app.listen(3000, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("connected")
    }
})
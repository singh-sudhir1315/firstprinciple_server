const db = require("../models");
const config = require("../config/auth.config");
require("dotenv").config();//npm install dotenv

const fs = require('fs');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





exports.testimonails = (req, res) => {
  // Save User to Database
  User.findOne({
    
  }).then(user => {
     
    User.create({
          //type: req.file.mimetype,
          //name: req.file.originalname,
    
          photo:  fs.readFileSync(__basedir + '/assets/uploads/' + req.file.filename,{encoding: 'base64'}),
          name: req.body.name,
          post: req.body.post,
          description: req.body.description,
          active:1
        })
          .then(user => {
            res.send({ message: "Todo List Added Successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
    
  });
};



exports.testimonailsList = (req, res) => {
  User.findAll({
    where: {
      active: 1
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "No Todo Found" });
      }
      const data = user.map((user)=>{
        
        return {
          id: user.id,
          photo: user.photo,
          name: user.name,
          post: user.post,
          description: user.description,
          createdAt: user.createdAt
        }
      })
        res.status(200).send({data});
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};

exports.deleteTestiomonals = (req, res) => {
  let updatedTest = {}
  updatedTest.active = 0

  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then(record => {
      
    if (!record) {
      throw new Error('No record found')
    }
  
    console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 
    
    let values = {
      registered : true,
      active: 0
    }
    
    record.update(values).then( updatedRecord => {
      return res.status(200).send({ message: "Testiomonals Deleted Successfully" });
      //console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
      // login into your DB and confirm update
    })
  
  })
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};


exports.editTestiomonals = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "No Testimonials Found" });
      }
      res.status(200).send({
        id: user.id,
          photo: user.photo,
          name: user.name,
          post: user.post,
          description: user.description
      });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};


exports.updateTestiomonals = (req, res) => {
  console.log("=========>",req.body);
  User.findOne({
    where: {
      id: req.body.id
    }
  })
  .then(record => {
      
    if (!record) {
      throw new Error('No record found')
    }
  
    console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 
    
    let values = {
      registered : true,
      name: req.body.name,
          post: req.body.post,
          description: req.body.description
    }
    
    record.update(values).then( updatedRecord => {
      return res.status(200).send({ message: "Testimonials Updated Successfully" });
      //console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
      // login into your DB and confirm update
    })
  
  })
  .catch((error) => {
    // do seomthing with the error
    throw new Error(error)
  })
    
};
const mysql = require('mysql');
const conDetails = require('../config/database');
const tableSchema = require('./tableSchema');
const bcrypt = require('bcryptjs');

// create database connection
const con = mysql.createConnection(conDetails.conDetails);

module.exports.connect = function(){

    con.connect(function(err){
    if(err){
        throw err;
    } 
    else{
        console.log('connected');   
    }
    });

    // check the availability of the user table
    con.query("CHECK TABLE userData",function(err,result){
        if(err){
            throw err;
        }
        else{
            if(result[0].Msg_type === 'Error'){
                // if userdata table not availble then create the table
                createTables(tableSchema.tables.userData.createUserTable);  
                createTables(tableSchema.tables.userData.createCompanyTable);
                createTables(tableSchema.tables.userData.createParticipants);
                createTables(tableSchema.tables.userData.createEventsTable);
            }
        }
    });

}


// function for create tables that not exits in datbase
function createTables(sql){
    con.query(sql,function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log(result);
        }  
    });
}


module.exports.addNewUser = function InsertUser(user,callback){
    console.log(user);
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user[1],salt,function( err,hash){
            if(err){
                throw err;
            }	
            user[1] = hash;
            con.query(tableSchema.tables.userData.insertIntoUserTable,[[user]],callback);
        })
    });
}

module.exports.addNewCompany = function InsertCompany(company,callback){
    //console.log(user);
    con.query(tableSchema.tables.userData.insertIntoCompanyTable,[[company]],callback);
}

module.exports.addNewParticipant = function InsertParticipant(participant,callback){
    //console.log(user);
    con.query(tableSchema.tables.userData.insertintoParticipantsTable,[[participant]],callback);
}

module.exports.addNewEvent = function InsertEvent(event,callback){
    //console.log(user);
    con.query(tableSchema.tables.userData.insertIntoEventTable,[[event]],callback);
}

module.exports.selectUser = function selectUser(usrname , callback){
    con.query(tableSchema.tables.userData.SelectUser + mysql.escape(usrname),callback);
}
//checking
module.exports.selectParticipants = function selectParticipants(callback){
    con.query(tableSchema.tables.userData.SelectParticipants,callback);
}

module.exports.selectCompany= function selectCompany( err,rows,fields){
    con.query(tableSchema.tables.userData.SelectCompany ,(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        console.log(isMatch);
        callback(null, isMatch);
    });
}
module.exports.cons = con ;

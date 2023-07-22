const express = require('express');
const mysql=require('mysql')
const dbConn={
    connectionLimit:5,
    host:'localhost',
    user:'root',
    password:'',
    database:'event'
}

const pool=mysql.createPool(dbConn)

const getConnectionAsync=()=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if (err){
                return reject(err);
            }
            resolve(connection)
        });
    });
};

const queryAsync=(conn,sqlQuery)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(sqlQuery,(queryErr,result)=>{
            if (queryErr){
                return reject(queryErr);
            }
            resolve(result)

        });
    });
};
const queryDataAsync=(conn,sqlQuery,data)=>{
    return new Promise ((resolve,reject)=>{
        conn.query(sqlQuery,data,(queryErr,result)=>{
            if (queryErr){
                return reject(queryErr);
            }
            resolve(result)

        });
    });
};

exports.client={
    async executeAsync(sqlQuery){
        const conn= await getConnectionAsync()
        const result = await queryAsync(conn,sqlQuery)
        conn.release()
        return result
    },
    async executeDataWithAsync(sqlQuery,data){
        const conn= await getConnectionAsync()
        const result = await queryDataAsync(conn,sqlQuery,data)
        conn.release()
        return result
    }
}
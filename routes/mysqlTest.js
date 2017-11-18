var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.get('/', function(req, res, next) {
    res.send("test page for mysql connection");
});

//데이터베이스와 연결
var client = mysql.createConnection({
    user:'userid',
    password:'password'
});

//데이터베이스 쿼리를 사용
client.query("USE test");

client.query("SELECT * from products", function (error, result, fields) {
    if(error) {
        console.log("쿼리 문장에 에러가 있습니다");
    } else {
        console.log(result);
    }
})


module.exports = router;

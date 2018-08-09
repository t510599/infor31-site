var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/course', function(req, res, next) {
    res.json(readCourse());
});

function readCourse() {
    var courses = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../course.json"),'utf-8'));
    return courses;
}

module.exports = router;
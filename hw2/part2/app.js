const express = require('express');
const app = express();
app.get('/student/:id',function (req,res){
    let id = req.query.id;
    if(id != null){
        let sinfo =data.lookupByStudentId(id);
        let courses = sinfo.course
        res.render('studentView', {
            student.id: id,
            student.name:sinfo.name,
            courses:courses
        })
    }

})
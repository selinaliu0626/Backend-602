const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {

    // Fill in the code
    await Employee.updateOne({_id: req.body.id},
        {firstName: req.body.fname, lastName: req.body.lname});
    res.redirect('/employees');
 };

const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {
 
    // Fill in the code
    let newEmployee = new Employee({
        firstName: req.body.fname,lastName:req.body.lname
    });

    await newEmployee.save();

    res.redirect('/employees');
  };

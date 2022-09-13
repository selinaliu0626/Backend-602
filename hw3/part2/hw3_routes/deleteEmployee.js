const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {
    
    // Fill in the code
  let employee = await Employee.findById(req.params.id);
  let result = {
    id: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName
  };
  res.render('deleteEmployeeView', {title:"Delete Employee?", data:result});
};

  
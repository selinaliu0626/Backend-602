const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports =  async (req , res , next) => {
    
    // Fill in the code
  await Employee.deleteOne({_id: req.body.id});
  res.redirect('/employees');
};

  
const Customer = require('../model/customer.model.js');

// Create and Save a new customer
exports.create = (req, res) => {
    // Validate request
    console.log("here name"+req.body.shopname)
    if(req.body.name=="") {
        return res.status(400).send({
            message: "customer name can not edef be empty"
        });
    }

    // Create a customer
    const customer= new Customer({
       // Id: req.body.Id || "there is no ID for this customer!", 
       

        // id:req.body.id,
        name:req.body.name,
        shopname:req.body.shopname,
        status:req.body.status
    });

    // Save customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the customer."
        });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

// Find a single customer with a customerId
exports.findOne = (req, res) => {
    Customer.find({id:req.params.id})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.id
        });
    });
};
// Update a Customer identified by the Customerid in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Customer name can not be empty"
        });
    }

    // Find customer and update it with the request body
    Customer.findOneAndUpdate({id:req.params.id}, {
        //Id: req.body.Id || "there is no ID for this order!", 
        id:req.body.id,
        name:req.body.name,
        shopname:req.body.shopname,
        status:req.body.status
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.id
        });
    });
};

/*{new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
*/

// Delete a customer with the specified customerid in the request
exports.delete = (req, res) => {
    Customer.findOneAndRemove({id:req.params.id})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });
        }
        res.send({message: "customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "customer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.id
        });
    });
};

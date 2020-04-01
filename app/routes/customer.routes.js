module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');

    // Create a new customers
    app.post('/customers', customers.create);

    // Retrieve all customers
    app.get('/customers', customers.findAll);

    // Retrieve a single customers with custId
    app.get('/customers/:custId', customers.findOne);

    // Update a customers with custId
    app.put('/customers/:custId', customers.update);

    // Delete a customers with custId
    app.delete('/customers/:custId', customers.delete);
}

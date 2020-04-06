//Dependencies
var express = require("express");
var router = express.Router();
var db = require('../models');

//Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
   
    db.Snack.findAll({include: [db.Customer ],order: [['snack_name', 'ASC']]}).then(function(snackResp){

      snackResp = snackResp.map(s => s.toJSON())
      
      db.Customer.findAll({order: [['customer_name', 'ASC']]}).then(function(customerResp){
        
        customerResp = customerResp.map(c => c.toJSON())
        console.log(customerResp)

        let scoobyCount = customerResp[0].items_eaten;
        let shaggyCount = customerResp[1].items_eaten;        
               
        res.render("index",{snacks: snackResp,customers:customerResp,scoobyCount: scoobyCount,shaggyCount: shaggyCount});

      })      
    })    
  });
  router.post("/api/snacks", function(req, res) {

    db.Snack.create({
      snack_name: req.body.snack_name
    }).then(function(data){

      res.status(200).end();
    })
      
  });
  router.put("/api/snacks/:id", function(req, res) {
    var id = req.params.id;

    db.Snack.update(
    {devoured: req.body.devoured,
      CustomerId: req.body.customer},{
      where: {id: id}
    }).then(function(response){      

      db.Customer.increment(
        {items_eaten:1}, {where: {id: req.body.customer}}
        ).then(function(response){
          res.json({ changed: response.changedRows })
        })
      })

  }) ;
  router.delete("/api/snacks/:id", function(req, res) {
    var id = req.params.id;
    
    db.Snack.destroy({
      where: {id: id
      }}).then(function(){
        res.status(200).end();
    })
  })  

// Export routes for server.js to use.
module.exports = router;
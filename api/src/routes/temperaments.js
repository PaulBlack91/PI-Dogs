const { Router } = require("express");
const router = Router()
const {tempApi} = require ('./controllers')


router.get("/temperaments", async (req, res) => {  
      
      try {
          res.status(200).send(tempApi);
       
      } catch (error) {
        console.log(error)
      }
    });





module.exports = router;
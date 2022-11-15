const { Router } = require("express");
const router = Router()
const {getApiTemperaments} = require ('./controllers')


router.get("/", async (req, res) => {  
  
  try {
        const temp = await getApiTemperaments()
          res.status(200).send(temp);
       
      } catch (error) {
        console.log(error)
      }
    });



module.exports = router;
const { Router } = require("express");
const router = Router()
const { ApiDb, getAll } = require('./controllers.js')
const { Temperament, Dog } = require('../db')


router.get("/", async (req, res) => {

  try {
    const allDog = await getAll();
    const { name } = req.query

    if (name) {
      let dogName = await allDog.filter((e) => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
      dogName ? res.status(200).send(dogName) : res.status(400).send('Name not found')
    }
    else {
      res.status(200).send(allDog)
    }


  } catch (error) {

    console.log(error);
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params
  let allDogs = await getAll()

  try {
    if (!id) return res.status(401).send('No se encontro el id')

    let dogsId = await allDogs.filter(e => e.id == id)

    if (dogsId.length) {
      res.status(200).send(dogsId[0])
    }

  } catch (error) {
    console.log(error);

  }

});

router.post("/", async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    image,
    temperament
  } = req.body;
  try {

    if (name) {
      const newDog = await Dog.create({  // aca creo el perro con esto
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,        
      });

      let createdDb = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });

      await newDog.addTemperament(createdDb);



      return res.status(200).send("Dog Created");
    } else {
      return res.status(404).send("Dog Not Created");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
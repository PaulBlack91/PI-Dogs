const { Router } = require("express");
const router = Router()
const { ApiDb, getAll } = require('./controllers.js')
const {Temperament, Dog} = require('../db')


// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados

router.get("/", async (req, res) => {

    try {
        const { name } = req.query
        const allDog = await getAll();

        if (!name) return res.send(allDog)
        else {
            let dogName = await allDog.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            res.status(200).send(dogName)
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
            res.status(200).send(dogsId)
        }

    } catch (error) {
        console.log(error);

    }

});

router.post("/", async (req, res) => {
    const {
      name,
      height,      
      weight,      
      breeds,
      life_span,
      image,
      createdInDb,
      temperament,
    } = req.body;
    try {
     
      if (name) {
        const newDog = await Dog.create({  // aca creo el perro con esto
          name,
          height,
          weight,          
          breeds,
          life_span,
          image,
          createdInDb,
        });

        // const createdDb = await Temperament.findAll({  // se lo paso aparte porque tengo que hacer la relacion aparte
        //   where: { name: temperament },   // lo tengo que buscar en el modelo que tiene todas los temperamentos
        // });        
        // newDog.addTemperament(createdDb);
        return res.status(200).send("Dog Created");
      } else {
        return res.status(404).send("Dog Not Created");
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router
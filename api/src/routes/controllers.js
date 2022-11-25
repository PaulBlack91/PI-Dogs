require("dotenv").config();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env

const ApiDb = async () => {

    try {
        const allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        const dogList = await allDogs.data.map((e) => {
            let height = e.height.metric.split("-")
            let weight = e.weight.metric.split("-")
            return {
                id: e.id,
                name: e.name,
                heightMin: parseInt(height[0]),
                heightMax: parseInt(height[1]),
                weightMin: parseInt(weight[0]),
                weightMax: parseInt(weight[1]),
                breeds: e.breed_group,
                life_span: e.life_span,
                temperament: e.temperament,
                image: e.image.url ? e.image.url : "not image Dog"                

            };
        });
        // console.log(dogList);
        return dogList;


    } catch (error) {
        console.log(error);

    }
}

const getDogsDb = async () => {
    // me traigo los daots de 'Dog' que estan en mi db y que me encuentre todos y que lo incluyan en temperament 
    try {
        const dogsDb = await Dog.findAll({
            include: [{
                model: Temperament, //me trae el perro con el temperamento, y le pido el nombre del temperamento
                attributes: ['name'], // del model temperamento saca el nombre 
                through: {
                    attributes: [] //  me los manda aca
                }
            }]
        });


        const newDb = dogsDb.map((e) => {
            // mapeo los nuevos datos que me traje de mi db
            return {
                id: e.id,
                image: e.image,
                name: e.name,
                heightMin: parseInt(e.heightMin),
                heightMax: parseInt(e.heightMax),          
                weightMin: parseInt(e.weightMin),
                weightMax: parseInt(e.weightMax),
                breeds: e.breeds,
                life_span: e.life_span + " years",
                temperament: e.temperaments.map((e) => e.name), // este cuando haga el temperamen me va hacer falta  para   el get de temperamentos
                createInDb: e.createInDb
            }
        })
        return newDb
    } catch (error) {
        console.log(error)
    }
}

const getAll = async () => {
    try {
        // aca guardo los datos de api y db  y concaternamos  
        const api = await ApiDb();
        const db = await getDogsDb();
        const all = api.concat(db);

        return all;
    } catch (error) {
        console.log(error);
    }
};

// Asi esta en el obj temperamente "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving" un solo string tengo que separalos en strings individuales 


const getApiTemperaments = async () => {

    // el  '?' es un opcional chaining  me permite encadenar cosas  porque JS se wachiturrea 
    const apiTemperaments = await ApiDb();
    const temperamentList = apiTemperaments.map((el) => el.temperament?.split(", ")).flat();
    // quita los 'sub arrays'
    const temperament = [...new Set(temperamentList)];
    // el set te devuelve uno solo si es que xisten elementos repetidos

    temperament.forEach(async element => {
        if (element) {
            Temperament.findOrCreate({
                where: { name: element }
            });
        }
    });

    let allTemp = await Temperament.findAll()
    return allTemp
}





module.exports = { ApiDb, getDogsDb, getAll, getApiTemperaments }
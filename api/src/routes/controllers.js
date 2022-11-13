require("dotenv").config();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env

const ApiDb = async () => {

    try {
        const allDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        const dogList = await allDogs.data.map((e) => {
            return {
                id: e.id,
                name: e.name,
                height: e.height.metric,
                weight: e.weight.metric,
                life_span: e.life_span,
                breeds: e.breed_group,
                temperament: e.temperament,                
                // image: e.image.url ? e.image.url : "not image Dog" despues en el front

            };
        });
        //console.log(dogList);
        return dogList;


    } catch (error) {
        console.log(error);

    }
}

const getDogsDb = async () => {
    // me traigo los daots de 'Dog' que estan en mi db y que me entcuentre todos y que lo incluyan en temperament 
    try {
        const dogsDb = await Dog.findAll({
            include: [{
                model: Temperament, //me trae el perro con el temperamento, y le pido el nombre del temperamento
                attributes: ['name'], // del model temperamento saca el nombre 
                through: {
                    attributes: [] // supuestamente me los manda aca
                }
            }]
        });

        const newDb = dogsDb.map((e) => {
            // mapeo los nuevos datos que me traje de mi db
            return {
                id: e.id,
                //image: e.image, despues para el front ahora pruebo 
                name: e.name,
                height: e.height,
                weight: e.weight,
                breeds: e.breeds,
                life_span: e.life_span,
                temperament: e.temperaments.map((e) => e.name), // este cuando haga el temperamen me va hacer falta  para   el get de temperamentos
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


const tempApi = async () => {
    try {
        await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        let tempMap = tempApi.data.map((e) => e.temperament).toString().split(', ').trim()

        tempMap.forEach(async (e) => {
            if (e) {
                await Temperament.findOrCreate({
                    where: {
                        name: e,
                    }
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
}






module.exports = { ApiDb, getDogsDb, getAll, tempApi }
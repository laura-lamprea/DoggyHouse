const axios = require("axios");
require('dotenv').config();
const { KEY } = process.env;
const { Dog, Temper } = require("../db");

const apiDogs = async (req, res) => {
  try {
    const dogsApi = await axios(`https://api.thedogapi.com/v1/breeds`);
    const DogsInfo = dogsApi.data.map(p => {
      return {
        id: p.id,
        name: p.name,
        life: p.life_span,
        image: p.image.url,
        weight: p.weight.metric,
        height: p.height.metric,
        tempers: p.temperament,
      };
    });
    //console.log(DogsInfo);
    return DogsInfo
    //return res.status(200).send(DogsInfo);
  } catch (error) {
    return error; //return res.status(404).send('Not found'); // console.error(error);
  }
};

const dbDogs = async () => {
  const dogsDb = await Dog.findAll({
    include: {
      model: Temper,
      attributes: ["name"],
      through: {
        attribute: [],
      },
    },
  });
  return dogsDb;
};

const getAllDogs = async (req, res) => {
  const { name } = req.query;
  const dataDb = await dbDogs();
  const dataApi = await apiDogs();
  const allDogs = [...dataDb, ...dataApi];
  if (name) {
    const dogByName = allDogs.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
    if (!dogByName.length) {
      return res.json({ err: 'NOT able to store data in database' })
    } else {
      return res.json(dogByName)
    }
  }
  return res.status(200).send(allDogs);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const dataDb = await dbDogs();
  const dataApi = await apiDogs();
  const allDogs = [...dataDb, ...dataApi]
  if (id) {
    const dogId = await allDogs.filter(p => p.id == id)
    if (dogId.length) {
      return res.json(dogId)
    } else {
      return res.status(404).send('ID does not exist')
    }
  }
};

const getAllTempers = async (req, res) => {
  const dataApi = await apiDogs();
//  const onlyTempers = dataApi.map(tem => tem.tempers).map(t => t && t.split(',')).flat();
  const onlyTempers = [...new Set(dataApi.map(tem => tem.tempers).map(t => t && t.split(', ')).flat())]  

 //const onlyTempers = dataApi.map(tem => tem.tempers).map(t => t && t.split(', '))
 console.log(onlyTempers.length)    

  //console.log(onlyTempers.length)  //164
 // return res.send(onlyTempers);  //friendly

  // const cad = ['Stubborn,  Playful' , 'Aloof, Clownish']
  // const divisiones = cad.map(t=>t.split(","));
  // console.log(divisiones)  //164  125
};




const createDog = async (req, res) => {
  const { name, life, image, weight, height, temperament } = req.body;
  const newDog = await Dog.create({ name, life, image, weight, height });
  const temperDb = await Temper.findAll({ where: { name: temperament } });
  //console.log('genderDb', genderDb)
  newDog.addTemper(temperDb);
  res.json({ data: newDog, msg: 'Successful create' });
};

/*
{
  "name":"perrito",
  "life": "10 - 12 years",
  "weight": "3 - 6",
  "height":  "23 - 29",
  "temperament": "Stubborn, Curious, Fun-loving"
}
*/

module.exports = {
  getAllDogs,
  getById,
  createDog,
  getAllTempers
};
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
    //const newWeigt = DogsInfo.map(w => w.weight.split(' - '))   //NaN   .replace('dog', 'monkey')
    //const newWeigt = DogsInfo.map(w =>parseInt(w.weight.replace('NaN', 0).split(' - ').join(''))) //NaN   .replace('dog', 'monkey')
    //console.log(newWeigt.sort((a, b) => (a > b ? 1 : a< b ? -1 : 0)));
    return DogsInfo
    //return res.status(200).send(DogsInfo);
  } catch (error) {
    return error;
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
    //console.log(dogId)
    if (dogId.length) {
      return res.json(dogId)
    } else {
      return res.status(404).send('ID does not exist')
    }
  }
};

const getAllTempers = async (req, res) => {
  const dataApi = await apiDogs();
  const tempersArr = [...new Set(dataApi.map(tem => tem.tempers).map(t => t && t.split(', ')).flat())].sort()
  tempersArr.pop()
  tempersArr.forEach(t => {Temper.findOrCreate({
      where: {
        name: t
      }
    })
  })
  const allTempers = await Temper.findAll();
  return res.send(allTempers);  
};




const createDog = async (req, res) => {
  const { name, life, image, weight, height, tempers } = req.body;
  const newDog = await Dog.create({ name, life, image, weight, height });
  const temperDb = await Temper.findAll({ where: { name: tempers } });
  newDog.addTemper(temperDb);
  res.json({ data: newDog, msg: 'Successful create' });
};

/*
{
  "name":"perrito",
  "life": "10 - 12 years",
  "weight": "3 - 6",
  "height":  "23 - 29",
  "tempers": ["Stubborn", "Curious", "Fun-loving"]
}
*/

module.exports = {
  getAllDogs,
  getById,
  createDog,
  getAllTempers
};
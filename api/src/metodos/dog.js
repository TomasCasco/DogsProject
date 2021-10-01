const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//POST

async function AddDog(req,res,next){
    const id = uuidv4();
    const dogBody ={ ...req.body, id };
    if(!dogBody) return res.status(404).send('data missing');
    try{
        if( dogBody.name && dogBody.height && dogBody.weight){

            
            if(!dogBody.image) dogBody.image ='https://i.imgur.com/tc5eTf9.jpg'
            if(!dogBody.years_life) dogBody.years_life = 'Life span is not set'
            if(!dogBody.temperaments) dogBody.temperaments ='Temperaments are not set'
            
            let temperaments = dogBody.temperaments            
            let temperamentsResult = await  Temperament.findOrCreate({
                        where: {  name: temperaments  }
                    })
            
            const createDog = await Dog.create(dogBody);
            await createDog.setTemperaments(temperamentsResult[0])
            return res.json(createDog);
        }
        res.status(400).send('data missing')
    }catch (error){
        next(error);
    }
}


async function dogBreeds(name){

    let breeds = await Dog.findAll({
        include: Temperament
      });
    const dogs = [];
    i =0;
    while(dogs.length <8 && i < breeds.length){
        if(breeds[i].name.toUpperCase().includes(name)) {
            dogs.push(breeds[i]);
        }
        i++

    }
    return  dogs
}



//GET random

async function dogsRamdon(){
    try{
        let result = [];
        let check =[];
        const getDogs = await Dog.findAll({
            include: Temperament
          });
        for(let i = 0; i<8; i++){
            let r = Math.floor(Math.random()*(getDogs.length))
            !check.includes(r) ? result.push(getDogs[r]) && check.push(r) : i--;
        }
        return result
    } catch(error){
        console.log('Error dogsRamdon: ', error)
    }    
}

//GET ordered

async function getAllDogsOrder(){
    try{
        const result =[]
        const getDogs = await Dog.findAll({ order: [['name', 'ASC']]});
        for(let i = 0; i<getDogs.length; i++){
            if(i === 0){
                result.push({ 
                    id: getDogs[i].id, 
                    name: getDogs[i].name, 
                    weight: getDogs[i].weight,
                    height:getDogs[i].height, 
                    image: getDogs[i].image,
                    next_id: getDogs[i+1].id,
                    previous_id: false,
                    })
                continue

            }  
            if(i === getDogs.length-1){
                result.push({ 
                    id: getDogs[i].id, 
                    name: getDogs[i].name,
                    height:getDogs[i].height, 
                    weight: getDogs[i].weight,
                    image: getDogs[i].image,
                    next_id: false,
                    previous_id: getDogs[i-1].id
                    })
                continue
            }//  ||
            result.push({ 
                id: getDogs[i].id, 
                name: getDogs[i].name, 
                height:getDogs[i].height, 
                weight: getDogs[i].weight,
                image: getDogs[i].image,
                next_id: getDogs[i+1].id,
                previous_id: getDogs[i-1].id
                })
        }
        return result
    } catch(error){
        console.log('Error getAllDogsOrder: ', error)
    }   
}

//GET dogs

async function getAllDogs(req, res, next){
    try{
        let {name,  todas} = req.query;
        if(name){
            let apiBreeds = await dogBreeds(name.toUpperCase())
            if(apiBreeds.length) return res.json(apiBreeds)
            return res.status(404).json('There is no breed with this name: '+ name)
        }
        if(todas){
            let dogsOrder = await getAllDogsOrder()
            if(dogsOrder) return res.json(dogsOrder)
        } 
        
        let dogRamdon = await dogsRamdon()
        return res.json(dogRamdon)
        
    } catch(error){
        next(error)
    }
}

//GET by id

async function getDog(req, res, next){
    try{
        
        if(req.params.id.toString().length === 36 ){
            const dogDb = await Dog.findByPk(req.params.id,{
                include: Temperament
              });
            if(dogDb){
                dogDb.temperaments= dogDb.temperaments[0].name;
                return res.json(dogDb)
            } 
            return res.status(404).send('Id not found')
        }
        res.status(400).send('Invalid Id ')
    } catch (error){
            next(error)
    }
}

module.exports = {
    AddDog,
    getAllDogs,
    getDog,
}


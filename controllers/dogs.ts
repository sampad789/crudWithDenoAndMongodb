import { IDog } from "../types.ts";

import { Dog } from "../helpers/db.ts";

//Test Data
let dogs: IDog[] = [
  { name: "Brad", age: "2", breed: "Labrador", price: 700 },
  { name: "trad", age: "6 months", breed: "Labrador", price: 200 },
  { name: "chad", age: "3", breed: "Labrador", price: 600 },
  { name: "maad", age: "1", breed: "Labrador", price: 400 },
];

//Get all DOGS
///api/v1/dogs

const getDogs = async ({ response }: { response: any }) => {
  const allDogs = await Dog.find();
  response.body = {
    success: true,
    data: allDogs,
  };
};

//Get single DOG
///api/v1/dogs/:id

const getDog = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  //wrapping in try catch to check the error in db
  try {
    //Get the id from the params(request.params.id wasn't working)
    let id = request.body;
    // Search the database for the dog with the matching id
    const data: any = await Dog.findOne(id);
    //Response if the dog is found
    if (data) {
      response.body = {
        success: true,
        data,
      };
      response.status = 200;
    }
    // Response if the dog doesn't exist with the given id
    else {
      const notFound = "DOG NOT FOUND";
      response.body = {
        success: true,
        notFound,
      };
      response.status = 204;
    }
  } catch (err) {
    // catch the error if there's some error connecting or retrrieving data from db
    response.body = {
      success: false,
      message: "Check your console",
    };
    response.status = 500;
    console.log(err);
  }
};

//Add a new Dog
// POSt /api/v1/dogs
const addDog = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    let body: any = await request.body();
    const { name, age, breed, price }: IDog = body.value;

    const newDog = await Dog.insertOne({
      name: name,
      age: age,
      breed: breed,
      price: price,
    });
    response.body = {
      sucess: true,
      newDog,
    };
    response.status = 201;
  } catch (e) {
    response.body = { message: "Check your console" };
    response.status = 500;
    console.log(e);
  }
};

//update a dog's Details
// Put api/v1/dogs/:id
const updateDog = ({ response }: { response: any }) => {};

//Delete a Dog
// Delete api/v1/dogs/:id
const deleteDog = ({ response }: { response: any }) => {};

export { getDogs, getDog, addDog, updateDog, deleteDog };

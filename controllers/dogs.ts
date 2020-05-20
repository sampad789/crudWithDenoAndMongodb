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
  const allDo = await Dog.find();
  response.body = {
    success: true,
    data: allDo,
  };
};

//Get single DOG
///api/v1/dogs/:id

const getDog = ({ response }: { response: any }) => {
  response.body = "Success";
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
    response.body = null;
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

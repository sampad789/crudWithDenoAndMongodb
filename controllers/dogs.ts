import { IDog } from "../types.ts";

import { Dog } from "../helpers/db.ts";

/*
//Test Data
let dogs: IDog[] = [
  { name: "Brad", age: "2", breed: "Labrador", price: 700 },
  { name: "trad", age: "6 months", breed: "Labrador", price: 200 },
  { name: "chad", age: "3", breed: "Labrador", price: 600 },
  { name: "maad", age: "1", breed: "Labrador", price: 400 },
];
**/

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
  params,
}: {
  request: any;
  response: any;
  params: any;
}) => {
  //wrapping in try catch to check the error in db
  try {
    //Get the id from the params
    let id = params.id;

    // Search the database for the dog with the matching id
    const data: any = await Dog.findOne({ _id: { $oid: id } });
    //Response if the dog is found
    if (data) {
      console.log(data);
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
  } catch (err) {
    response.body = { success: false, message: "Check your console" };
    response.status = 500;
    console.log(err);
  }
};

//update a dog's Details
// Put api/v1/dogs/:id
const updateDog = async ({
  request,
  response,
  params,
}: {
  request: any;
  response: any;
  params: any;
}) => {
  //wrapping in try catch to check the error in db
  try {
    //get the id from param
    const id: string = params.id;
    //get the body from requested id
    let body: any = await request.body();

    //create the data object wit the new updated values
    let data: {
      name?: string;
      age?: string;
      breed?: string;
      price?: number;
    } = {};
    if (body.value.name) {
      // if an updated name is sent
      data["name"] = body.value.name;
    }
    if (body.value.age) {
      // if an updated age  is sent
      data["age"] = body.value.age;
    }
    if (body.value.breed) {
      // if an updated breed is sent
      data["breed"] = body.value.breed;
    }
    if (body.value.price) {
      // if an updated price is sent
      data["price"] = body.value.price;
    }
    // Updating the database
    const result = await Dog.updateOne({ _id: { $oid: id } }, { $set: data });
    // sending the response
    response.body = { success: true, result };
    response.status = 200;
  } catch (err) {
    response.body = { message: "Check your console" };
    response.status = 500;
    console.log(err);
  }
};

//Delete a Dog
// Delete api/v1/dogs/:id
const deleteDog = async ({
  request,
  response,
  params,
}: {
  request: any;
  response: any;
  params: any;
}) => {
  //wrapping in try catch to check the error in db

  try {
    //Get the id from the params
    let id = params.id;
    // Delete the dog from the given id
    const result = await Dog.deleteOne({ _id: { $oid: id } });

    /*
     * result = 0 : data not found
     * result = 1 : data found and deleted
     */
    let msg = result
      ? "Dog Succesfully Deleted"
      : "Dog not Found in the database";

    //Send the response back
    response.body = {
      success: true,
      message: msg,
      result,
    };
    response.status = 200;
  } catch (err) {
    response.body = { message: "Check your console" };
    response.status = 500;
    console.log(err);
  }
};

export { getDogs, getDog, addDog, updateDog, deleteDog };

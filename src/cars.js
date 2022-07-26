import { dbConnect } from "./dbConnect.js";

export function getAllCars(req, res) {
  //connect to db (putting it inside the function makes sure to be connected cause it calls it everytime)
  const newCar = req.body;
  const db = dbConnect();
  //get all docs from cars collection
  db.collection("cars")
    .get()
    .then((collection) => {
      //reshape collection to array
      const cars = collection.docs.map((doc) => doc.data());
      //send array to response
      res.send(cars);
    })
    .catch((err) => res.status(500).send(err));
}

export function createCar(req, res) {
  // get a new car from request body
  const newCar = req.body;
  // connect to database
  const db = dbConnect();
  // add that car to car collection
  db.collection('cars').add(newCar)
    .then(doc => {
        res.status(201).send({
            success: true,
            id: doc.id
        })
    })
    .catch(err => res.status(500).send(err)) //could be change for handleError function
  // send back new doc id
}

// get function updateCar(req,res){
//     const {id} = req.params
//     //connect db
//     const 
// }

// function handleError (err,res) {
//     //console.
//     res.status(500).send(err);
// }

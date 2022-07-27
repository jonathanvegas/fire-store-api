import { dbConnect } from './dbConnect.js'

export function getAllCars(req, res) {
  //connect to db (putting it inside the function makes sure to be connected cause it calls it everytime)
  const db = dbConnect()
  //get all docs from cars collection
  db.collection('cars')
    .get()
    .then((collection) => {
      //reshape collection to array
      const cars = collection.docs.map((doc) => doc.data())
      //send array to response
      res.send(cars)
    })
    .catch((err) => res.status(500).send(err)) //this is a very typical error catcher
}

export function createCar(req, res) {
  //get a new car from request body
  const newCar = req.body
  //connect to db
  const db = dbConnect()
  //add that car to cars collection
  db.collection('cars')
    .add(newCar)
    .then((doc) => {
      res.status(201).send({
        success: true,
        id: doc.id,
      })
    })
    .catch((err) => handleError(err, res)) //this error is handled by a function that is another way to handle them
  //send back new doc id
}

export function updateCar (req, res) {
    const { id } = req.params
    let carToUpdate = req.body
    //connect db
    const db = dbConnect()
    //update doc(id) in cars collection using req.body
    db.collection('cars')
        .doc(id)
        .update(carToUpdate)
        .then((doc) => {
        res.status(201).send({
            success: true,
            id: doc.id,
        })
    })
    .catch((err) => handleError(err, res))
}

//this is another way to catch errors
function handleError(err, res) {
  res.status(500).send(err)
}



const express = require('express');
const router = express.Router();

const Person = require('./../Models/Person');

router.post('/', async (req, res) => {
    try {
        const data = req.body //Assuming that the request body contains the data

        const newPerson = new Person(data); // Creating a new person document using the mongoose model

        const response = await newPerson.save(); // Saving the new person data to the database
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/', async (req, res) => {
    try {
        const PersonData = await Person.find();
        console.log('data fetched');
        res.status(200).json(PersonData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/:WorkType', async (req, res) => {
    try {
        const WorkType = req.params.WorkType;
        if (WorkType == 'chef' || WorkType == 'owner' || WorkType == 'manager' || WorkType == 'waiter') {
            const response = await Person.find({ work: WorkType })
            console.log("Response Fetched");
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: "Invalid WorkType" })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//-----------------------------------------------------Update--------------------------------------------------

router.put('/:id', async (req, res) => {
    try {
        const PersonID = req.params.id; //This will Extract the Id from the URL params(Parameter) or we can say it will extract the id from url parameter on which the update is to be done.
        const ToUpdaterPersonData = req.body; //reads the data in the body which is to update in the person data 

        const response = await Person.findByIdAndUpdate(PersonID, ToUpdaterPersonData, {
            new: true,  // returns the updated data.
            runValidators: true  // Runs the Mongoose validator
        })

        if (!response) {
            return res.status(404).json({ erroe: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response)
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//-----------------------------------------------------------Delete----------------------------------------------------------

router.delete('/:id', async (req, res) => {
    try {
        const GetPersonId = req.params.id;
        const response = await Person.findByIdAndDelete(GetPersonId);
        if (!response) {
            return res.status(404).json({ erroe: 'Person not found' });
        }

        console.log("Data deleted");
        res.status(200).json({ message: "Person deleted successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
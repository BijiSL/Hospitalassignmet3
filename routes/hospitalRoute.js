const express=require('express');
const router=express.Router();

// For file handling fs module
const fs=require('fs');

// utility functions for reading from json file
const loadHospital=()=>{
    try{
        const dataBuffer=fs.readFileSync('hospital.json');
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON)

    }catch(error)
    {
        console.log(error);
        return[];
    }
}
// utility functionn for writing into JSON file
const saveHospital=(hospital)=>{
    try{
const dataJSON=JSON.stringify(hospital,null,2);
    fs.writeFileSync('hospital.json',dataJSON);
    }catch(error){
        console.log(error);
    }
    

}
// Loads all hospital
// localhost:3000/hospital/
router.get('/',(req,res)=>{
const hospital=loadHospital();
res.send(hospital);
})
// add a new hospital
router.post('/',(req,res)=>{
    // fetch existing hospital
    try{
    const hospital=loadHospital();
    const newHospital={
        id:hospital.length+1,
        name:req.body.name,
        patientCount:req.body.patientCount,
        hospitalLocation:req.body.hospitalLocation||[]

    }
    hospital.push(newHospital)
    saveHospital(hospital)
    res.status(201).send(newHospital)
    }catch(error){
        res.status(400).send({error})
    }
})
// update by id
router.patch('/:id',(req,res)=>{
    try{
        const hospital=loadHospital()
        const hosp=hospital.find(i=>i.id===parseInt(req.params.id))
        if(!hosp){
            return res.status(404).send({error:'Hospital data not found'})
        }
        hosp.name = req.body.name || hosp.name;
        hosp.patientCount = req.body.patientCount || hosp.patientCount;
        hosp.hospitalLocation = req.body.hospitalLocation || hosp.hospitalLocation;

        saveHospital(hospital);
        res.status(200).send(hosp);
    } catch (error) {
        res.status(400).send(error);
    }
})
// delete by id
router.delete('/:id',(req,res)=>{
    try{
        let hospital=loadHospital();
        const index = hospital.findIndex(i => (i.id === parseInt(req.params.id)));

        if(index === -1) {
            req.status(404).send({error: "Hospital not found"});
        }

        hospital.splice(index, 1);
        saveHospital(hospital);
        res.send({message: 'Hospital deleted'})

    }catch(error){
        res.status(400).send(error);
    }
})
module.exports=router;
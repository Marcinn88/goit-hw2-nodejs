const express = require('express')

const router = express.Router()

// const contacts = require("../../models/contacts");
// const { string } = require('joi');

const contactsController = require('../../controllers/contacts.controller')

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//     console.log(`Get Działa prawidołowo.`)
//   } catch (error) {
//     console.log(`Get nie działa prawidołowo.`)
//   }
// })

// router.get('/:contactId', async (req, res, next) => {
// try{
//   const { contactId } = req.params
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     console.log(`Get by ID działa prawidołowo. Nie odnaleziono ID: ${contactId}.`)
//     return res.status(404).json({message: "Not found"})
//   }
//   res.json(result)
//   console.log(`Get by ID działa prawidołowo. Odnaleziono wpis o id: ${result.id}.`)
// }
// catch(error){
//   console.log(`Get by ID nie działa prawidołowo.`)
// }
// })



// router.post('/', async (req, res, next) => {
//   try {
//     const result = await contacts.addContact(req.body)
//     res.status(201).json(result)
//     console.log(`POST Działa prawidłowo. Do bazy dodano wpis o id: ${result.id} i nazwie: ${result.name}.`)
//   } catch (error) {
//     console.log(`Post nie działa prawidłowo.`)
//   }
// })



// router.delete('/:contactId', async (req, res, next) => {
//   try{
//     const { contactId } = req.params
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       console.log(`DELETE by ID działa prawidołowo. Nie odnaleziono ID: ${contactId}.`)
//       return res.status(404).json({message: "Not found"})
//     }
//     res.json({ message: "contact deleted" });
//     console.log(`DELETE by ID działa prawidołowo. Usunięto wpis o id: ${result.id} i nazwie: ${result.name}.`)
//   }
//   catch(error){
//     console.log(`DELETE by ID nie działa prawidołowo.`)
//   }
// })



// router.put('/:contactId', async (req, res, next) => {
// try {
//   const {contactId} = req.params
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result){
//     console.log(`PUT by ID działa prawidołowo. Nie odnaleziono ID: ${contactId}.`)
//     return res.status(404).json({message: "Not found."})
//   }
//   res.json(result)
//   console.log(`PUT by ID działa prawidołowo. Zaktualizowano wpis o id: ${result.id} i nazwie: ${result.name}.`)
// } catch (error) {
  
// }
// })

router.get('/contacts', contactsController.get);
router.get('/contacts/:id', contactsController.getById);
router.post('/contacts', contactsController.create);
router.put('/contacts/:id', contactsController.update);
router.patch('/contacts/:id/favorite', contactsController.updateStatus);
router.delete('/contacts/:id', contactsController.remove);

module.exports = router

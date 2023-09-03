const contactsServices = require('../services/contacts.service')

const get = async (req, res, next) =>{
    try {
        const results = await contactsServices.getAll();
        res.json({
            status: "succes",
            code: 200,
            data: {
                contacts:results,
            }
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await contactsServices.getOne(id);
        res.json({
            status: "succes",
            code: 200,
            data: {
                contact:results,
            }
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
};

const create = async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);
        const results = await contactsServices.create(body);
        res.json({
            status: "succes",
            code: 200,
            data: {
                contact: results,
            },
        });
    } catch (e) {
        console.error(e)
        next(e)
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const results = await contactsServices.update(id, body);
        res.json({
            status: "succes",
            code: 200,
            data: {
                contact:results,
            }
        })
}   catch (e) {
        console.error(e)
        next(e)
}};

const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const results = await contactsServices.updateStatus(id, favorite);
        res.json({
            status: "succes",
            code: 200,
            data: {
                contact:results,
            }
        })
}   catch (e) {
console.error(e)
next(e)
}};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await contactsServices.remove(id);
        res.json({
            status: "succes",
            code: 200,
            data: {
                id,
                data:{
                contact:results,
            }
        },
        })
}   catch (e) {
console.error(e)
next(e)
}};

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
};
const contactsServices = require('../services/contacts.service')

const get = async (req, res, next) =>{
    try {
    const {query, user} = req;
    const results = await contactsServices.getAll({ ...query, owner: user._id });
    res.json({
        status: "succes",
        code: 200,
        data: {
            contacts: results,
        }
    })
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const {user, params} = req;
        const { id } = params;
        const results = await contactsServices.getOne(id, user._id);
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
        const { body, user } = req;
        const results = await contactsServices.create({ ...body, owner: user._id });
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
        const { body, user } = req;
        const results = await contactsServices.update(id, user._id, body);
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
        const { body, params, user } = req
        const { id } = params;
        const { favorite } = body;
        const results = await contactsServices.updateStatus(id, user._id, favorite);
        if (!favorite) {
            return res.status(400).json({message: "missing field favorite"})
          }
        if (!results) {
            return res.status(404).json({message: "Not found"})
          }
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
        const { user } = req;
        const results = await contactsServices.remove(id, user._id);
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
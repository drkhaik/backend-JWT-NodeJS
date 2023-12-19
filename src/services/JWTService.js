import db from '../models/index'

const getRole = async (user) => {
    let role = null;
    role = await db.Role.findOne({
        where: { id: user.roleID },
        attributes: ["id", "name", "description"]
        // include: [{ model: db.Role }]
    })
    return role;
}

module.exports = {
    getRole
}
import Role from '../models/Role'

const getRole = async (user) => {
    let role = null;
    // role = await db.Role.findOne({
    //     where: { id: user.roleID },
    //     attributes: ["id", "name", "description"]
    //     // include: [{ model: db.Role }]
    // })

    role = await Role.findById(user.roleID).select({ _id: 0, description: 0 });
    return role;
}

module.exports = {
    getRole
}
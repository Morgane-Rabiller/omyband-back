import User from "./userModel.js";
import Role from "./roleModel.js";

// Assiociation User -> Role
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

export { User, Role };
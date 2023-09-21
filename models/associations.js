import User from "./userModel";
import Role from "./roleModel";

// Assiociation User -> Role
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });
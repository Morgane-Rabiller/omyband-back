import User from "./userModel.js";
import Role from "./roleModel.js";
import Announcement from "./announcementModel.js";

// Assiociation User -> Role
User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

// Associations Annoucement -> User
User.hasMany(Announcement, { foreignKey: 'user_id' });
Announcement.belongsTo(User,{foreignKey:'user_id'})


export { User, Role, Announcement };
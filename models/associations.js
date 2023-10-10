import User from "./userModel.js";
import Role from "./roleModel.js";
import Announcement from "./announcementModel.js";
import Type from "./typeModel.js";
import Instruments from "./instrumentModel.js"
import Style from './styleModel.js'

// Assiociation User -> Role
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as:'role'
});
Role.hasMany(User, {
    foreignKey: 'role_id',
    as:'role'
});

//Associations  Users-> Instruments
User.belongsToMany(Instruments, {
    as : "instrument",
    through: 'users_instruments',
    foreignKey: 'user_id',
    otherKey : 'instrument_id',
    timestamps: false
});
Instruments.belongsToMany(User, {
    as: "user",
    through: 'users_instruments',
    foreignKey: 'instrument_id',
    otherKey: 'user_id',
    timestamps:false
});

// Associations Annoucement -> User
User.hasMany(Announcement, {
    foreignKey: 'user_id',
});
Announcement.belongsTo(User, {
    foreignKey: 'user_id'
})

//Associations Annoucement -> Types
Announcement.belongsTo(Type, {
    foreignKey: 'user_type',
    targetKey: 'type_id',
});
Type.hasMany(Announcement, {
    foreignKey: 'user_type',
    targetKey: 'type_id'
});

//Associations Annoucement -> Instrument
Announcement.belongsToMany(Instruments, {
    as : "instruments",
    through: 'instruments_announcements',
    foreignKey: 'announcement_id',
    otherKey : 'instrument_id',
    timestamps: false
});
Instruments.belongsToMany(Announcement, {
    as: "announcement",
    through: 'instruments_announcements',
    foreignKey: 'instrument_id',
    otherKey: 'announcement_id',
    timestamps:false
});

//Associations Annoucement -> Styles
Announcement.belongsToMany(Style, {
    as : "styles",
    through: 'styles_announcements',
    foreignKey: 'announcement_id',
    otherKey : 'style_id',
    timestamps: false
});
Style.belongsToMany(Announcement, {
    as: "announcement",
    through: 'styles_announcements',
    foreignKey: 'style_id',
    otherKey: 'announcement_id',
    timestamps:false
});


export { User, Role, Announcement, Instruments, Style };
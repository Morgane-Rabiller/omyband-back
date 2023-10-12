
const User =require( "./userModel.js");
const Role =require( "./roleModel.js");
const Announcement =require( "./announcementModel.js");
const Type =require( "./typeModel.js");
const Instruments = require("./instrumentModel.js");
const Style = require('./styleModel.js');

// Assiociation User -> Role
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as:'role'
});
Role.hasMany(User, {
    foreignKey: 'role_id',
    as:'user'
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
    as:'announcements'
});
Announcement.belongsTo(User, {
    foreignKey: 'user_id',
    as:'user'
})

//Associations Annoucement -> Types
Announcement.belongsTo(Type, {
    foreignKey: 'user_type',
    targetKey: 'type_id',
    as: 'type'
});
Type.hasMany(Announcement, {
    foreignKey: 'user_type',
    targetKey: 'type_id',
    as: 'announcements'
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


module.exports = {
    User, 
    Role, 
    Announcement, 
    Type, 
    Instruments, 
    Style
};
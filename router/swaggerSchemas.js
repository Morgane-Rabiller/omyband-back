/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: "Authorization: Bearer + ' ' + accessToken"
 *  
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: yourpassword
 *   
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         role_id:
 *           type: integer
 *           description: The auto-incremented ID of the role.
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the role.
 *       example:
 *         role_id: 1
 *         name: Administrator
 *   
 *     CreateUser:
 *       type: object
 *       required:
 *         - pseudo
 *         - password
 *         - email
 *         - location
 *       properties:
 *         role_id:
 *           type: integer
 *           description: The role ID associated with the user (default is 2).
 *         pseudo:
 *           type: string
 *           description: The nickname of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *           uniqueItems: true
 *         location:
 *           type: string
 *           description: The location of the user.
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user.
 *           nullable: true
 *         description:
 *           type: string
 *           description: Additional description about the user.
 *           nullable: true
 *           maxLength: 1000
 *  
 *     User:
 *       type: object
 *       required:
 *         - pseudo
 *         - password
 *         - email
 *         - location
 *       properties:
 *         user_id:
 *           type: integer
 *           description: auto-incremented user Id.
 *           readOnly: true
 *         role_id:
 *           type: integer
 *           description: The role ID associated with the user.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         pseudo:
 *           type: string
 *           description: The nickname of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *           uniqueItems: true
 *         location:
 *           type: string
 *           description: The location of the user.
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user.
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *           nullable: true
 *         description:
 *           type: string
 *           description: Additional description about the user.
 *           nullable: true
 *           maxLength: 1000
 *         instruments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Instrument'
 *         announcements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Announcement' 
 *   
 *     Users:
 *       type: object
 *       required:
 *         - pseudo
 *         - password
 *         - email
 *         - location
 *       properties:
 *         user_id:
 *           type: integer
 *           description: auto-incremented user Id.
 *           readOnly: true
 *         role_id:
 *           type: integer
 *           description: The role ID associated with the user.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         pseudo:
 *           type: string
 *           description: The nickname of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *           uniqueItems: true
 *         location:
 *           type: string
 *           description: The location of the user.
 *         avatar:
 *           type: string
 *           description: The avatar URL of the user.
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *           nullable: true
 *         description:
 *           type: string
 *           description: Additional description about the user.
 *           nullable: true
 *           maxLength: 1000
 *         instruments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Instrument'
 *  
 *     Announcement:
 *       type: object
 *       properties:
 *         announcement_id:
 *           type: integer
 *           readOnly: true
 *         user_id:
 *           type: integer
 *         user_type:
 *           type: integer
 *         research_type:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         user:
 *           $ref: '#/components/schemas/Users'
 *         instruments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Instrument'
 *         styles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Style'
 *         type:
 *           $ref: '#/components/schemas/Type'
 *  
 *     CreateAnnouncement:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - user_type
 *         - research_type
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the announcement.
 *         description:
 *           type: string
 *           description: The description of the announcement.
 *         user_type:
 *           type: integer
 *           description: The ID representing the type of the user who made the announcement.
 *         research_type:
 *           type: integer
 *           description: The ID representing the type of research associated with the announcement.
 *         instruments_ids:
 *           type: array
 *           items:
 *             type: integer
 *           description: An array of instrument IDs associated with the announcement.
 *         styles_ids:
 *           type: array
 *           items:
 *             type: integer
 *           description: An array of style IDs associated with the announcement.
 *         type_ids:
 *           type: array
 *           items:
 *             type: integer
 *           description: An array of type IDs associated with the announcement.
 *  
 *     Instrument:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         instrument_id:
 *           type: integer
 *           description: The auto-incremented ID of the instrument.
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the instrument.
 *       example:
 *         instrument_id: 1
 *         name: Guitar
 *  
 *     Style:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         style_id:
 *           type: integer
 *           description: The auto-incremented ID of the style.
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the style.
 *         image:
 *           type: string
 *           description: The image URL associated with the style.
 *       example:
 *         style_id: 1
 *         name: Jazz
 *         image: https://example.com/images/jazz.jpg
 *  
 *     Type:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         type_id:
 *           type: integer
 *           description: The auto-incremented ID of the type.
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the type.
 *       example:
 *         type_id: 1
 *         name: Groupe
 *  
 */

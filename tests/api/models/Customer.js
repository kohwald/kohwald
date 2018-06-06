/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 't_customer',
    
    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
	    autoincrement: true,
	    unique: true
        },

        name: {
            type: 'string'
        },

        address: {
            type: 'string'
        },
        
        post: {
            type: 'string'
        },
        
        phone: {
            type: 'string'
        },
        
        province: {
            type: 'string'
        },
        
        city: {
            type: 'string'
        },
        
        region: {
            type: 'string'
        },

    }
};

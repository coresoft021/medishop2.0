import {  sequelize , Sequelize } from '../routes/dbcon';

  const Den_clients = sequelize.define('den_clients', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CUSTOMER_NAME: {
      type: Sequelize.STRING(25),
      allowNull: false
    },
    STREET: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
     CITY: {
      type: Sequelize.STRING(25),
      allowNull: true
    },
    
      
     PHONE_NUMBER: {
      type: Sequelize.INTEGER(13),
      allowNull: true
    },
    
       E_MAIL: {
      type: Sequelize.STRING(35),
      allowNull: true
    },
  
  }, {
    tableName: 'den_clients',
     timestamps: false
  });


export {Den_clients};

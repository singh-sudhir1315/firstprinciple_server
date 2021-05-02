module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("testimonial", {
      
        photo: {
        type: Sequelize.BLOB('long')
        },
      name: {
        type: Sequelize.STRING
      },
      post: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.STRING
      }
      
    });
  
    return User;
  };
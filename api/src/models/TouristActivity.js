const { DataTypes,  } = require('sequelize');

module.exports = (sequelize) => {

 sequelize.define("tourist_activity", {
     ID: {
       type: DataTypes.INTEGER,
       primaryKey: true,
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     difficulty: {
       type: DataTypes.INTEGER,
       validate: {
         min: 1,
         max: 5,
       },
       allowNull: false
     },
     duration: {
       type: DataTypes.INTEGER,
       allowNull: false,
       get(){
        const durationTime = this.getDataValue('durationTime');
        const duration = this.getDataValue("duration")
        return duration ? `${duration} ${durationTime}` : null;
       }
     },
     durationTime: {
       type: DataTypes.STRING,
       validate:{
        isIn: [["minutes", "hours"]]
       }
     },
     season: {
       type: DataTypes.STRING,
       validate: {
         isIn: [["summer", "autumn", "winter", "spring"]]
       },
       allowNull: false
     }
 }, {timestamps: false});
}
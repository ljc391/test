var sequelize = require("sequelize");
var db = new sequelize('postgres://localhost:5432/trip',{logging: false})

var User = db.define('user',{
    name:{
        type: sequelize.STRING
    }
},
{
    classMethods:{
        findByName: function(name){
            return User.findOne({
                where:{
                    name: name
                }
            });
        }
    }
});

var Post = db.define('post',{
    title:{
        type: sequelize.STRING,
        allowNull: false
    },
    titleUrl:{
        type: sequelize.STRING,
        allowNull: false
    },
    content:{
        type: sequelize.TEXT,
        allowNull: false
    }
},{
    hooks: {
        beforeValidate: function(post, options){
          if (post.title){
            post.titleUrl = post.title.replace(/\s+/g, '_').replace(/\W/g, '');
          } else {
            post.titleUrl = Math.random().toString(36).substring(2, 7);
          }
        }
    },
    getterMethods:{

    },
    classMethods:{


    },
    instanceMethods:{
        findSameUser: function(){
            return Post.findAll({
                where:{
                    ownerId:{
                        $eq: this.ownerId
                    }
                }
        });

        }

    }
})
Post.belongsTo(User, {as : 'owner'});
module.exports = {User: User, Post: Post};
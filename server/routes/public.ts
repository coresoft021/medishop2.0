import { Request, Response, Router } from "express";
import { Tas_users } from '../models/tas_users';
import { Sequelize, sequelize } from './dbcon';
const publicRouter: Router = Router();

publicRouter.get("/simple", (request: Request, response: Response) => {
  response.json({
    text: "Hello Angular 2",
    title: "Greetings.",
  });
});

publicRouter.get('/list', (request: Request, response: Response) => {
 

// force: true will drop the table if it already exists
  
  Tas_users.findAll({
  attributes: ['ID','NAME','PASSWORD','CODE','MARK']
}).
then(users => {
  response.json({
  users
  });
 
});
});





 publicRouter.get('/create_user_table', (request: Request, response: Response) => {
 Tas_users.sync({force: true}).then(() => {
  //Table created
  return Tas_users.create({
    NAME: 'Prems021',
    CODE: 11,
    MARK: 100,
    PASSWORD: 'arshavin021'
     });
 });
   
});

 publicRouter.get('/create_pdt_table', (request: Request, response: Response) => {
 Tas_users.sync({force: true}).then(() => {
  //Table created
  return Tas_users.create({
    PRODUCT_NAME: 'Prems021',
    CODE: 'B11',
    PRICE: 100,
    GST_SLAB: '0'
     });
 });
   
});


 

publicRouter.post('/add_user', (request: Request, response: Response) => {
 Tas_users.create({
    NAME: request.body.username,
    CODE: 12,
    MARK: 10,
    PASSWORD: request.body.password
     })
     
  return response.json({success:true, msg:'Successfully saved'});
     
 });


 publicRouter.post('/add_test', (request: Request, response: Response) => {
 Tas_users.create({
    NAME: 'hi',
    CODE: 12,
    MARK: 10,
    PASSWORD: 'me'
     })
     
  return response.json({success:true, msg:'Successfully saved'});
     
 });

  publicRouter.post('/login_check', (request: Request, response: Response) => {
   var username = request.body.username;
   var password = request.body.password;
    
    Tas_users.findOne({
  where: {
    NAME: request.body.username,
    PASSWORD: request.body.password
    }
}).then(function(result){
  
                                                if(result)
                                                {
                                                return response.json({success:true, msg:'Successfully logged'});

                                                }   
                                                else
                                                {

                                                response.status(403).send({success: false, msg: 'Authentication failed, User not found'});
                                                }    
                         });
      
   
 

   
 });

 
 


export { publicRouter };

import { Request, Response, Router } from "express";
import { Tas_users } from '../models/tas_users';
import { Tas_products } from '../models/tas_product';
import { Tas_invo_slave } from '../models/invo_slave';
import { Tas_invoice_master  } from '../models/invo_master';
import { Tas_sales_count } from '../models/sales_count';
import { Tas_customers } from '../models/customer_table';
import { Tas_expence_category  } from '../models/expence_category';
import { Tas_income_expence  } from '../models/income_expence';

import { Sequelize, sequelize } from './dbcon';
const publicRouter: Router = Router();
const Op = Sequelize.Op;

publicRouter.get("/simple", (request: Request, response: Response) => {
  response.json({
    text: "fucked",
    title: "Greetings.",
  });
});


publicRouter.post('/add_customer', (request: Request, response: Response) => {
  
  
Tas_customers.findOne({ where: { TIN:  request.body.tin } }).then(person => {

  if(person){
  
                  return response.json({success:true, msg:'tin already existed'});
            }
  
           
                           else{
                                    Tas_customers.create({
                                        CUSTOMER_NAME: request.body.customer_name,
                                        STREET: request.body.street,
                                        CITY: request.body.city,
                                        TIN: request.body.tin,
                                        PHONE_NUMBER : request.body.phone_no,
                                        EMAIL :request.body.email,
                                       
                                        })
     
                                      return response.json({success:true, msg:'Successfully saved'});
    
                                 }
            }) 

      
  
  

})






 publicRouter.post('/get_a_invoice', (request: Request, response: Response) => {
 
   
   Tas_invoice_master.findOne({
                            where: {
                                      INVOICE_NUMBER: request.body.Invo_number
                                  }
                       }).then(function(master){
  
                                                if(master)
                                                  
                                                  {

                                                      Tas_invo_slave.findAll({
                                                      
                                                      where: {
                                                           TAS_MASTER_ID: request.body.Invo_number
                                                             }  }).then(function(slave)  {                    
                                                                                            response.json({
                                                                                            master: master, slave: slave
                                                                                            });

                                                                                           });  }
                                                                                           
                                                   else
                                                   {

                                                      response.status(403).send({success: false, msg: 'Bill not found'});
                                                   }                                        
                                                                                           
                                                                                           
                                                  }); 

});



 publicRouter.get('/list_invoices', (request: Request, response: Response) => {
 
   
  Tas_invoice_master.findAll({
  
 }).
then(users => {
  response.send(users);
  });

});

publicRouter.post('/post_invoice', (request: Request, response: Response) => {

    Tas_invoice_master.create({
         INVOICE_NUMBER : request.body.invoice_number,
         CUSTOMER_NAME  : request.body.cus_name,
         CUSTOMER_ADDRESS    : request.body.cus_address,
         CUSTOMER_PHONE  : request.body.cus_phone,
         CUSTOMER_VAT_ID    : request.body.cus_phone,
         SUB_TOTAL      : request.body.sub_total,
         TAX_COLLECTED      : request.body.total_tax,
         GROSS_TOTAL    : request.body.gross_total,
         ITEM_LENGTH    :request.body.length,
         DISCOUNT_TOTAL  :request.body.discount_total,
         TOTAL_PAYED   : request.body.total_payed,
         TOTAL_DUE    :request.body.total_due,
         IS_PARTIAL_PAY : request.body.is_partial_pay
 })
    
   for (var index = 0; index < request.body.length; index++) {
    
        Tas_invo_slave.create({ 
                             SI_NO : request.body.items[index].SI_NO,
                             PRODUCT_CODE : request.body.items[index].PRODUCT_CODE,
                             PRODUCT_NAME : request.body.items[index].PRODUCT_NAME,
                             TAX : request.body.items[index].TAX,
                             UNIT : request.body.items[index].UNIT,
                             QUANTITY: request.body.items[index].QUANTITY,
                             TAS_MASTER_ID: request.body.invoice_number,
                             NET_PRICE: request.body.items[index].NET_PRICE,
                             DISCOUNT_PER : request.body.items[index].DISCOUNT_PER,
                             DISCOUNT_AMT : request.body.items[index].DISCOUNT_AMT,
                             TOTAL_NET : request.body.items[index].TOTAL_NET,
                             TOTAL_GROSS : request.body.items[index].TOTAL_GROSS
                        })
   }
       
    return response.json({success:true, msg:'Successfully saved'});
    
         
 });
 publicRouter.get('/list_pdts', (request: Request, response: Response) => {
 
   
  Tas_products.findAll({
  
 }).
then(users => {
  response.send(users);
  });

});

   publicRouter.post('/get_invoice_number', (request: Request, response: Response) => {
    Tas_invoice_master.count().then(c => {
           response.json({
    text: "counted",
    count: c,
  });
              
            })
   
   })




publicRouter.post('/add_new_product', (request: Request, response: Response) => {
  
  
Tas_products.findOne({ where: { PRODUCT_NAME:  request.body.product_name } }).then(person => {

  if(person){
  
                  return response.json({success:true, msg:'product already existed'});
            }
  
  else 
        {
            Tas_products.findOne({ where: { PRODUCT_CODE:  request.body.product_code } }).then(pers => {

                if(pers){
                          return response.json({success:true, msg:'Code already existed'});
                        }
                           else{
                                    Tas_products.create({
                                        PRODUCT_NAME: request.body.product_name,
                                        PRODUCT_CODE: request.body.product_code,
                                        NET_PRICE: request.body.net_price,
                                        TAX: request.body.tax,
                                        AVAIL_QTY : request.body.avail_qty,
                                        NET_PURCHASE_PRICE :request.body.net_purchase_price,
                                        UNIT : request.body.unit
                                        })
     
                                      return response.json({success:true, msg:'Successfully saved'});
    
                                 }
            }) 

        }
  
    })

})









 





                                
 


export { publicRouter };

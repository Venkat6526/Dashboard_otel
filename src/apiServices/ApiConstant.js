  const apinames = {
  SUPPLIER_COUNT: "/get_supplier_count  ",
  //company expenses
SAVE_EXPENCES:"/save_expenses",
GET_SAVE_EXPENSES:"/get_save_expenses",
MODIFY_SAVE_EXPENSES:"/modify_save_expenses/:id",
DELETE_SAVE_EXPENSES:"/delete_save_expenses/:id",
// vouchers
POST_VOUCHER:"/post_voucher",
GET_VOUCHER:"/get_voucher",
PUT_VOUCHER:"/put_voucher/",
DELETE_VOUCHER:"/delete_voucher/",
// product
POST_PRODUCT:"/post_product",
GET_PRODUCT:"/get_product",
MODIFY_PRODUCT:"/modify_product/:id",
DELETE_PRODUCT:"/delete/product/:id",
// purchase
POST_PURCHASE:"/post_purchase",
GET_PURCHASE:"/get_purchase",
PUT_PURCHASE:"/put_purchase",
DELETE_PURCHASE:"/delete/purchase/",
// quotation
POST_QUOTATION:"/post_quotation",

GET_QUOTATION:"/get_quotation",
DELETE_QUOTATION:"/delete_quotation/",
PUT_QUOTATION:"/put_quotation",
// INVOICE
POST_INVOICE:"/post_invoice",
DELETE_INVOICE:"/delete_invoice/",
GET_INVOICE:"/get_invoice",
PUT_INVOICE:"/put_invoice",
//------------------- supplier product invoice in invoice
GET_SUPPLIER_PRODUCT_PURCHASE_LEDGER:"/get_supplier_product_purchase_ledger/",
// purchase ledger
POST_PURCHASE_LEDGER:"/post_purchase_ledger", 
GET_PURCHASE_LEDGER:"/get_purchase_ledger", 
DELETE_PURCHASE_LEDGER:"/delete_purchase_ledger/", 
PUT_PURCHASE_LEDGER:"/put_purchase_ledger", 

//---------Product Master---//--Function based component----//
POST_PRODUCT_MASTER:"/post_product_master",
GET_PRODUCT_MASTER:"/get_product_master", 
DELETE_PRODUCT_MASTER:"/delete_product_master/", 
PUT_PRODUCT_MASTER:"/put_product_master/", 
//---------customer master-----//
POST_CUSTOMER_MASTER:"/post_customer_master", 
GET_CUSTOMER_MASTER:"/get_customer_master", 
GET_CUSTOMER_DETAILS:"/get_customer_details/",
DELETE_CUSTOMER_MASTER:"/delete_customer_master/",
PUT_CUSTOMER_MASTER:"/put_customer_master/", 
//--------------SUPPLIER MASTER--------//
GET_SUPPLIER_MASTER:"/get_supplier_master", 
GET_USERS:"/get_users",
POST_SUPPLIER_MASTER:"/post_supplier_master", 
PUT_SUPPLIER_MASTER:"/put_supplier_master/", 
DELETE_SUPPLIER_MASTER:"/delete_supplier_master/", 
//---------------Payments----//
POST_PAYMENTS:"/post_payments", 
POST_PAYMENTS_CUSTOMER:"/post_payments_customer", 
//------invoive customer payment some alter so differnt get method----//
GET_CUSTOMER_PAYMENTS:"/get_customer_payments",
GET_CUSTOMER_INVOICE_ID:"/get_customer_invoice_id/", 
GET_SUPPLIER_PAYMENTS:"/get_supplier_payments", 
GET_INVOICE_CUSTOMER_PAYMENTS:"/get_invoice_customer_payments",
GET_DELIVERY_SALES_EXECUTIVE:"/get_delivery_sales_executive",
PUT_PAYMENTS:"/put_payments", 
POST_USERS:"/save_users", 
UPDATE_USERS:"/update_users", 
PUT_PAYMENTS_CUSTOMER:"/put_payments_customer", 
PUT_INVOICE_PAYMENTS:"/put_invoice_payments", 
DELETE_CUSTOMER_PAYMENTS:"/delete_customer_payments/", 
DELETE_SUPPLIER_PAYMENTS:"/delete_supplier_payments", 
//----------------Customer Ledger------------------------//
GET_CUSTOMER_LEDGER:"/get_customer_ledger/",
POST_CUSTOMER_LEDGER_DATE:"/post_customer_ledger_date", // and also in front end we will uppdate so display  the value
//----------Supplier Ledger----------------------//
GET_SUPPLIER_LEDGER:"/get_supplier_ledger/", 
POST_SUPPLIER_LEDGER_DATE:"/post_supplier_ledger_date", // and also in front end we will uppdate so display  the value
//------------Stocks----------------//
GET_PRODUCT_STOCKS:"/get_product_stocks", 
GET_SUPPLIER_STOCKS:"/get_supplier_stocks/",
GET_STOCKS_DETAILS:"/get_stocks_details/" ,
GET_SUPPLIER_PRODUCT:"/get_supplier_product_id/",
//------------------Invoice2 without gst--------------//
POST_INVOICE2:"/post_invoice2",
DELETE_INVOICE2:"/delete_invoice2/",
GET_INVOICE2:"/get_invoice2", 
PUT_INVOICE2:"/put_invoice2", 
//--------------Reporting Master-----------------------//
GET_REPORTING_MASTER:"/get_reporting_master",
POST_REPORTING_MASTER:"/post_reporting_master",
PUT_REPORTING_MASTER:"/put_reporting_master/",
DELETE_REPORTING_MASTER:"/delete_reporting_master/",
//--------------complaint Master-----------------------//
GET_COMPLAINT_MASTER:"/get_complaint_master",
POST_COMPLAINT_MASTER:"/post_complaint_master",
PUT_COMPLAINT_MASTER:"/put_complaint_master/",
DELETE_COMPLAINT_MASTER:"/delete_complaint_master/",
//--------------Food Master-----------------------//
GET_FOOD_MASTER:"/get_food_master",
POST_FOOD_MASTER:"/post_food_master",
PUT_FOOD_MASTER:"/put_food_master/",
DELETE_FOOD_MASTER:"/delete_food_master/",
//--------------Hotel Master-----------------------//
GET_HOTEL_MASTER:"/get_hotel_master",
POST_HOTEL_MASTER:"/post_hotel_master",
PUT_HOTEL_MASTER:"/put_hotel_master/",
DELETE_HOTEL_MASTER:"/delete_hotel_master/",
//--------------Skill Master-----------------------//
GET_SKILL_MASTER:"/get_skill_master",
POST_SKILL_MASTER:"/post_skill_master",
PUT_SKILL_MASTER:"/put_skill_master/",
DELETE_SKILL_MASTER:"/delete_skill_master/",
//--------------Subscrption master-----------------------//
GET_SUBSCRIPTION:"/get_master_subscription",
POST_SUBSCRIPTION:"/post_subscription",
PUT_SUBSCRIPTION:"/put_subscription/",
//--------------reward Master-----------------------//
GET_REWARD_MASTER:"/get_reward_master",
POST_REWARD_MASTER:"/post_reward_master",
PUT_REWARD_MASTER:"/put_reward_master/",
DELETE_REWARD_MASTER:"/delete_reward_master/",
//-------------Category Master
GET_CATEGORY_MASTER:"/get_category_master",
POST_CATEGORY_MASTER:"/post_category_master",
PUT_CATEGORY_MASTER:"/put_category_master/",
//----------------Transport
GET_TRANSPORT:"/get_transport",
POST_TRANSPORT:"/post_transport",
PUT_TRANSPORT:"/put_transport/",
DELETE_TRANSPORT:"/delete_transport/",
//------------------Delivery Executive
GET_DELIVERY_EXECUTIVE:"/get_delivery_executive",
POST_DELIVERY_EXECUTIVE:"/post_delivery_executive",
DELETE_DELIVERY_EXECUTIVE:"/delete_delivery_executive/",
//-------------Uom Master
GET_UOM_MASTER:"/get_uom_master",
POST_UOM_MASTER:"/post_uom_master",
PUT_UOM_MASTER:"/put_uom_master/",
//-------------Dispatch Through Master
GET_Dispatch_Through:"/get_dispatch_through_master",
POST_Dispatch_Through:"/post_dispatch_through_master",
PUT_Dispatch_Through:"/put_dispatch_through_master/",
//----------------Transport
GET_FOLLOW_UP:"/get_follow_up",
POST_FOLLOW_UP:"/post_follow_up",
//---------------Daily Report
GET_DAILY_REPORT:"/get_daily_report",
//------------------Sales Executive
GET_SALES_MASTER:"/get_sales_master",
POST_SALES_MASTER:"/post_sales_master",
DELETE_SALES_MASTER:"/delete_sales_master/",
//------------------Carry Forward Stocks
POST_CARRY_FORWARD_STOCKS:"/post_carry_stocks",
GET_CARRY_FORWARD_STOCKS:"/get_carry_stocks",
DELETE_CARRY_FORWARD_STOCKS:"/delete_carry_stocks/",
GET_ALL_STOCKS:"/get_all_stocks",
//----------------------Customer Report
GET_BUSSINESS_VOLUME:"/get_bussiness_volume",
GET_TIME_INTERVAL:"/get_time_interval",
//-----------------------Purchase Transport
POST_PURCHASE_TRANSPORT:"/post_purchase_transport",
GET_PURCHASE_TRANSPORT:"/get_purchase_transport/",
DELETE_PURCHASE_TRANSPORT:"/delete_purchase_transport/",
GET_WARNING:"/get_warning/",
PUT_DELIVERY:"/put_delivery/",
//==========================Performance Invoice
POST_PERFORMANCE_INVOICE:"/post_performance_invoice",
GET_PERFORMANCE_INVOICE:"/get_performace_invoice",
DELETE_PERFORMANCE_INVOICE:"/delete_performance_invoice/",
PUT_PERFORMNACE_INVOICE:"/put_performance_invoice",
//=========================PROFIT LOSS
GET_PROFIT_LOSS:"/get_profit_loss", 
//========================MAILS
QUOTATION_MAIL:"/otel_mail/sendmail.php",
GET_INVOICE_PENDING:"/get_invoice_pending",
GET_INVOICE2_PENDING:"/get_invoice2_pending",
make_approved:"/make_approved_invoice",
make_approved2:"/make_approved_invoice2",


// =================dashboard
// INVOICE_TOTAL:"/"

}
export default apinames;
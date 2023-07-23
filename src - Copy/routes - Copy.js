import React from "react";

const Breadcrumbs = React.lazy(() =>
  import("./views/hotel_owners_to_vendors_contact_history.js")
);
const Notification = React.lazy(() => import("./views/Notification"));
//-----------Hotel Owner
const hotel_owners_to_vendors_contact_history = React.lazy(() =>
  import("./views/hotel_owners_to_vendors_contact_history.js")
);

const Approval_Pending = React.lazy(() =>
  import("./views/Hotel Owner/ApprovalPending")
);
const PerformaInvoice = React.lazy(() =>
  import("./views/Account/PerformanceInvoice.jsx")
);

const ApprovalPendingView = React.lazy(() =>
  import("./views/Hotel Owner/ApprovalPendingView")
);
const ApprovalDocument = React.lazy(() =>
  import("./views/Hotel Owner/ApporvalDocument")
);
const ApprovalEdit = React.lazy(() =>
  import("./views/Hotel Owner/ApprovalEdit")
);
const Pdf = React.lazy(() => import("./views/Hotel Owner/Pdf"));
const FunctionAlert = React.lazy(() =>
  import("./views/alert/FunctionAlert.jsx")
);

const rate_card = React.lazy(() => import("./views/rate_card.js"));
//Accounts

const Quotation = React.lazy(() => import("./views/Account/Quotation.jsx"));
const Quotation_edit = React.lazy(() => import("./views/Account/Quotation_edit.jsx"));


const Invoice = React.lazy(() => import("./views/Account/Invoice.jsx"));
const InvoiceTransportTruck = React.lazy(() =>
  import("./views/Account/InvoiceTransportTruck.jsx")
);
const PurchaseLedgerTransport = React.lazy(() =>
  import("./views/Account/PurchaseLedger/PurchaseLedgerTransport.jsx")
);
const InvoiceFollowUp = React.lazy(() =>
  import("./views/Account/InvoiceFollowUp.jsx")
);
const Invoice2 = React.lazy(() => import("./views/Account/Invoice2.jsx"));

const CustomerPayment = React.lazy(() =>
  import("./views/Account/CustomerPayment.jsx")
);
const SupplierPayment = React.lazy(() =>
  import("./views/Account/SupplierPayment")
);
const Target = React.lazy(() => import("./views/Account/Target"));
const Voucher = React.lazy(() => import("./views/Account/Voucher"));
const CompanyExpenses = React.lazy(() =>
  import("./views/Account/Company Expenses/CompanyExpenses")
);
const AddExpenses = React.lazy(() =>
  import("./views/Account/Company Expenses/AddExpenses")
);
const EditExpenses = React.lazy(() =>
  import("./views/Account/Company Expenses/EditExpenses")
);

const Purchase_Order = React.lazy(() => import("./views/Account/Purchase.jsx"));

const Customer_Ledger = React.lazy(() =>
  import("./views/Account/CustomerLedger")
);
const Supplier_Ledger = React.lazy(() =>
  import("./views/Account/SupplierLedger")
);
const Stocks = React.lazy(() => import("./views/Account/Stocks"));
const CarryStocks = React.lazy(() => import("./views/Account/CarryStocks.jsx"));
const AllStocks = React.lazy(() => import("./views/Account/AllStocks.jsx"));
const DailyReport = React.lazy(() => import("./views/Account/DaliyReport.jsx"));
const OutstandingReport = React.lazy(() => import("./views/Account/OutstandingReport.jsx"));

const ProductProfitLoss = React.lazy(() => import("./views/Account/ProductProfitLoss.jsx"));

// Ecommerce
const Product = React.lazy(() => import("./views/E-Commerce/Product.jsx"));
const AddProduct = React.lazy(() =>
  import("./views/E-Commerce/AddProduct.jsx")
);
const Order = React.lazy(() => import("./views/E-Commerce/Order"));
const Product_Details = React.lazy(() =>
  import("./views/E-Commerce/ProductDetails")
);
const Product_Gallary = React.lazy(() =>
  import("./views/E-Commerce/Gallary/ProtoGallery")
);
const Product_Enquiry = React.lazy(() =>
  import("./views/E-Commerce/ProductEnquiry")
);
const ProductView = React.lazy(() => import("./views/E-Commerce/ProductView"));

// Sales management
const Sales_Order = React.lazy(() =>
  import("./views/Sales-Management/SalesOrder.jsx")
);
const Sales_FollowUp = React.lazy(() =>
  import("./views/Sales-Management/SalesFollowUp")
);

//Dashboard head
const active_hotel_owners = React.lazy(() =>
  import("./views/active_hotel_owners")
);
const employees = React.lazy(() => import("./views/employees.js"));
const Employee_Profile = React.lazy(() =>
  import("./views/Employee/EmployeeProfile")
);

//----------------Vendors--------------------------

const ActiveVendors = React.lazy(() => import("./views/active_vendors"));
const VendorsApproval = React.lazy(() =>
  import("./views/Vendors/VendorApporval")
);
const VendorsApprovalView = React.lazy(() =>
  import("./views/Vendors/VendorApprovalView")
);
const VendorApprovalDocument = React.lazy(() =>
  import("./views/Vendors/VendorApporvalDocument")
);
const VendorApprovalEdit = React.lazy(() =>
  import("./views/Vendors/VendorApporvalEdit")
);

const complaints = React.lazy(() => import("./views/complaints.js"));
const service_providers = React.lazy(() =>
  import("./views/service_providers.js")
);
const catering_requests = React.lazy(() =>
  import("./views/catering_requests.js")
);
const Subscription_details = React.lazy(() =>
  import("./views/Subscription_details")
);
//---------------------------MASTER-----------------------------------
const daily_items = React.lazy(() => import("./views/daily_items"));
const Product_Master = React.lazy(() => import("./views/Master/ProductMaster"));
const Category_Master = React.lazy(() =>
  import("./views/Master/CategoryMaster")
);
const Dispatch_Master = React.lazy(() =>
  import("./views/Master/DispatchThrough.jsx")
);

const Customer_Master = React.lazy(() =>
  import("./views/Master/CustomerMaster")
);
const Supplier_Master = React.lazy(() =>
  import("./views/Master/SupplierMaster")
);
const Reporting_Master = React.lazy(() =>
  import("./views/Master/ReportingMaster")
);
const UOM_Master = React.lazy(() =>
  import("./views/Master/UomMaster.jsx")
);

const Complaint_Master = React.lazy(() =>
  import("./views/Master/ComplaintMaster")
);
const Food_Master = React.lazy(() => import("./views/Master/FoodMaster"));
const Delivery_Master = React.lazy(() =>
  import("./views/Master/DeliveryMaster.jsx")
);
const Sales_Master = React.lazy(() =>
  import("./views/Master/SalesMaster.jsx")
);

const Hotel_Master = React.lazy(() => import("./views/Master/HotelMaster"));
const Skill_Master = React.lazy(() => import("./views/Master/SkillMaster"));
const Reward_Master = React.lazy(() => import("./views/Master/RewardMaster"));

const job_details = React.lazy(() => import("./views/job_details.js"));
const abroad_jobs = React.lazy(() => import("./views/abroad_jobs.js"));
const local_jobs = React.lazy(() => import("./views/local_jobs.js"));
const classified_details = React.lazy(() =>
  import("./views/classified_details.js")
);
const reporting_data = React.lazy(() => import("./views/reporting_data.js"));

const Executive = React.lazy(() => import("../src/views/Executive"));
const product_requests = React.lazy(() =>
  import("./views/product_requests.js")
);
const announcements = React.lazy(() => import("./views/announcements.js"));
const catering_items = React.lazy(() => import("./views/catering_items.js"));
const scratch_card = React.lazy(() => import("./views/scratch_card.js"));

const Cards = React.lazy(() => import("./views/Base/Cards"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));


const Purchase_Ledger = React.lazy(() =>
  import("./views/Account/PurchaseLedger/Purchaseledger.jsx")
);
const PreviewPurchaseLedger = React.lazy(() =>
import("./views/Account/PurchaseLedger/PreviewPurchaseLedger.jsx"))
//-------------------------------------Report


const Customer_Report = React.lazy(() =>
  import("./views/Report/CustomerReport.jsx")
);

// settings
const User = React.lazy(() => import("./views/Setting/Users/User"));

const UserPath = React.lazy(() => import("./views/Setting/Users/UserPath"));

const AccessibilityPath = React.lazy(() =>
  import("./views/Setting/Users/AccessibilityPath")
);
const SMPT = React.lazy(() => import("./views/Setting/Smpt"));
const change_password = React.lazy(() =>
  import("./views/Setting/change_password")
);

/*const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
*/

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/active_hotel_owners",
    exact: true,
    name: " Active Hotel Owners",
    component: active_hotel_owners,
  },

  {
    path: "/approval_pending",
    name: "Approval Pending",
    component: Approval_Pending,
  },
  {
    path: "/ApprovalPendingView",
    name: "Approval Pending View",
    component: ApprovalPendingView,
  },
  {
    path: "/ApprovalDocument",
    name: "Approval Document",
    component: ApprovalDocument,
  },
  { path: "/ApprovalEdit", name: "Approval Edit", component: ApprovalEdit },
  { path: "/Pdf", name: "Pdf", component: Pdf },
  { path: "/employees", name: "Employees", component: employees },
  {
    path: "/employeeprofile",
    name: "Employees Profile",
    component: Employee_Profile,
  },
  //-----------------------Vendors--------------------------//

  { path: "/ActiveVendors", name: "Active Vendors", component: ActiveVendors },
  {
    path: "/VendorsApproval",
    name: "Vendors Approval",
    component: VendorsApproval,
  },
  {
    path: "/VendorsApprovalView",
    name: "Vendors Approval View",
    component: VendorsApprovalView,
  },
  {
    path: "/VendorApprovalDocument",
    name: "Vendor Approval Document",
    component: VendorApprovalDocument,
  },
  {
    path: "/VendorApprovalEdit",
    name: "Vendor Approval Edit",
    component: VendorApprovalEdit,
  },
  {
    path: "/service_providers",
    name: "Service providers",
    component: service_providers,
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
  },
  {
    path: "/catering_requests",
    name: "Catering Request",
    component: catering_requests,
  },
  {
    path: "/Subscription",
    name: "Subscription",
    component: Subscription_details,
  },
  { path: "/base", exact: true, name: "Base", component: Cards },
  {
    path: "/contact_history/hotel_owners_vendors",
    name: "Hotel Owners-Vendors",
    component: hotel_owners_to_vendors_contact_history,
  },
  { path: "/rate_card", name: "Forms", component: rate_card },
  { path: "/complaints", name: "Complaints", component: complaints },
  { path: "/job_details", name: "Job Details", component: job_details },
  { path: "/abroad_jobs", name: "Jobs / Abroad Jobs", component: abroad_jobs },
  { path: "/local_jobs", name: "Jobs / Local Jobs", component: local_jobs },
  {
    path: "/classified_details",
    name: "Classified Details",
    component: classified_details,
  },
  {
    path: "/reporting_data",
    name: "Utilities / Reporting",
    component: reporting_data,
  },
  // settings
  {
    path: "/settings/change_password",
    name: "Settings / Change Password",
    component: change_password,
  },
  {
    path: "/setting/Executive",
    name: "Setting / Executive",
    component: Executive,
  },
  {
    path: "/SMPT",
    name: "SMPT",
    component: SMPT,
  },
  { path: "/User", name: "User", component: User },
  { path: "/UserPath", name: "User Path", component: UserPath },
  {
    path: "/AccessibilityPath",
    name: "Accessibility Path",
    component: AccessibilityPath,
  },
  { path: "/daily_items", name: "Daily Items", component: daily_items },
  {
    path: "/FunctionAlert",
    name: "Function Alert",
    component: FunctionAlert,
  },
  {
    path: "/Product_Master",
    name: "Product Master",
    component: Product_Master,
  },
  {
    path: "/Category_Master",
    name: "Category Master",
    component: Category_Master,
  },
  {
    path: "/Dispatch_Master",
    name: " Dispatch Master",
    component: Dispatch_Master,
  },
  
  {
    path: "/Customer_Master",
    name: "Customer Master",
    component: Customer_Master,
  },
  {
    path: "/Supplier_Master",
    name: " Supplier Master",
    component: Supplier_Master,
  },
  {
    path: "/Reporting_Master",
    name: " Reporting Master",
    component: Reporting_Master,
  },
  {
    path: "/UOM_Master",
    name: " UOM Master",
    component: UOM_Master,
  },

  {
    path: "/Complaint_Master",
    name: " Complaint Master",
    component: Complaint_Master,
  },
  {
    path: "/Food_Master",
    name: " Food Master",
    component: Food_Master,
  },
  {
    path: "/Delivery_Master",
    name: " Delivery Master",
    component: Delivery_Master,
  },
  {
    path: "/Sales_Master",
    name: "Sales Master",
    component: Sales_Master,
  },
  {
    path: "/Hotel_Master",
    name: " Hotel Master",
    component: Hotel_Master,
  },
  {
    path: "/Skill_Master",
    name: " Skill Master",
    component: Skill_Master,
  },
  {
    path: "/Reward_Master",
    name: " Reward Master",
    component: Reward_Master,
  },
  {
    path: "/product_requests",
    name: "Product Requests",
    component: product_requests,
  },
  { path: "/announcements", name: "Announcements", component: announcements },
  {
    path: "/catering_items",
    name: "Catering Items",
    component: catering_items,
  },
  { path: "/scratch_card", name: "Scratch Card", component: scratch_card },
  // Accounts
  { path: "/quotation", name: "Quotation", component: Quotation },
  { path: "/quotation_edit", name: "Quotation Edit", component: Quotation_edit },
  { path: "/invoice", name: "Invoice", component: Invoice },
  {
    path: "/InvoiceTransportTruck",
    name: "Invoice Transport Truck",
    component: InvoiceTransportTruck,
  },
  {
    path: "/PurchaseLedgerTransport",
    name: "Purchase Ledger Transport Truck",
    component: PurchaseLedgerTransport,
  },










  
  {
    path: "/InvoiceFollowUp",
    name: "Payment Follow-Up",
    component: InvoiceFollowUp,
  },






  
  { path: "/invoice2", name: "Invoice2", component: Invoice2 },

  {
    path: "/CustomerPayment",
    name: "Customer Payment",
    component: CustomerPayment,
  },
  {
    path: "/SupplierPayment",
    name: "Supplier Payment",
    component: SupplierPayment,
  },
  { path: "/PurchaseOrder", name: "Purchase Order", component: Purchase_Order },
  {
    path: "/PurchaseLedger",
    name: "Purchase Ledger",
    component: Purchase_Ledger,
  },
  {
    path: "/PreviewPurchaseLedger",
    name: "Preview Purchase Ledger",
    component: PreviewPurchaseLedger,
  },
  
  { path: "/Target", name: "Target", component: Target },
  { path: "/Voucher", name: "Voucher", component: Voucher },
  {
    path: "/CompanyExpenses",
    name: "Company Expenses",
    component: CompanyExpenses,
  },
  {
    path: "/CustomerLedger",
    name: "Customer Ledger",
    component: Customer_Ledger,
  },
  {
    path: "/SupplierLedger",
    name: "Supplier Ledger",
    component: Supplier_Ledger,
  },
  {
    path: "/Stocks",
    name: "Stocks",
    component: Stocks,
  },
  {
    path: "/CarryStocks",
    name: "Carry Forward Stocks",
    component: CarryStocks,
  },
  {
    path: "/AllStocks",
    name: "All Stocks",
    component: AllStocks,
  },
  {
    path: "/DailyReport",
    name: "Daily Report",
    component: DailyReport,
  },
  {
    path: "/OutstandingReport",
    name: "Outstanding Report ",
    component: OutstandingReport,
  },
  {
    path: "/ProductProfitLoss",
    name: "Product Profit Loss  ",
    component: ProductProfitLoss,
  },
  
  
  // ECommerce

  { path: "/Product", name: "Product", component: Product },

  { path: "/Order", name: "Order", component: Order },
  {
    path: "/ProductDetails",
    name: "Product Details",
    component: Product_Details,
  },
  {
    path: "/ProductGallary",
    name: "Product Gallary",
    component: Product_Gallary,
  },
  {
    path: "/ProductEnquiry",
    name: "Product Enquiry",
    component: Product_Enquiry,
  },
  { path: "/ProductView", name: "Product View", component: ProductView },

  //SALES MANAGEMENT

  { path: "/SalesOrder", name: "Sales_Order ", component: Sales_Order },
  {
    path: "/SalesFollowUp",
    name: "Sales Follow-Up ",
    component: Sales_FollowUp,
  },
  //----------------------Report
  { path: "/Customer_Report", name: "Customer Report", component: Customer_Report },


  // settings
  { path: "/User", name: "User", component: User },

  // for new paths
  { path: "/AddProduct", name: "AddProduct", component: AddProduct },
  { path: "/AddExpenses", name: "Add Expenses", component: AddExpenses },
  { path: "/editExpenses", name: "Edit Expenses", component: EditExpenses },
  { path: "/PerformaInvoice", name: "Performa Invoice", component: PerformaInvoice },
];
export default routes;

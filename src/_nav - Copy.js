export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-grid",
    },
  
    {
      name: "Hotel Owners",
      url: "/hotel_owners",
      icon: "icon-user",
      children: [
        {
          name: "Active Hotel Owners",
          url: "/active_hotel_owners",
          icon: "icon-user",
        },
        {
          name: "Approval Pending",
          url: "/approval_pending",
          icon: "icon-user",
        },
        {
          name: "Pdf",
          url: "/Pdf",
          icon: "icon-user-invoice",
        },
      ]
    },
 
    {
      name: "Employees",
      url: "/employees",
      icon: "icon-people",
      children: [
        {
          name: "Employees",
          url: "/employees",
          icon: "icon-people",
        },{
          name:"Employee Profile",
          url:"/employeeprofile"
        }
      ]
    },
    {
      name: "Vendors",
      url: "/vendors",
      icon: "icon-support",
      children:[
        {
          
            name: "Active Vendors",
            url: "/ActiveVendors",
            icon: "icon-people",
        
        },
        {
          
          name: "VendorsApproval",
          url: "/VendorsApproval",
          icon: "icon-people",
      
      }
      ]
    },
    {
      name: "Service Providers",
      url: "/service_providers",
      icon: "icon-wrench",
    },
    {
      name: "Public",
      url: "/public",
      icon: "icon-list",
    },
    {
      name: "Catering Requests",
      url: "/catering_requests",
      icon: "icon-envelope",
    },

    {
      name: "Rate Card",
      url: "/rate_card",
      icon: "icon-menu",
    },

    {
      name: "Product Requests",
      url: "/product_requests",
      icon: "icon-drawer",
    },

    {
      name: "Announcements",
      url: "/announcements",
      icon: "icon-calendar",
    },

    {
      name: "Notification",
      url: "/notification",
      icon: "icon-info",
    },

    {
      name: "Classified",
      url: "/classified_details",
      icon: "icon-layers",
    },

    {
      name: "Jobs",
      url: "/job_details",
      icon: "icon-notebook",
      children: [
        {
          name: "Abroad Jobs",
          url: "abroad_jobs",
          icon: "icon-user-following",
        },
        {
          name: "Local Jobs",
          url: "local_jobs",
          icon: "icon-user-following",
        },
      ],
    },

    {
      name: "Master",
      url: "/master",
      icon: "icon-grid",
      children: [
        {
          name: "Subscription",
          url: "/Subscription",
          icon: "icon-user-following",
        },
        {
          name: "Alert",
          url: "/FunctionAlert",
          icon: "icon-user-following",
        },
        {
          name: "Product Master",
          url: "/Product_Master",
          icon: "icon-user-following",
        },
        {
          name: "Category Master",
          url: "/Category_Master",
          icon: "icon-user-following",
        },
        {
          name: "Customer Master",
          url: "/Customer_Master",
          icon: "icon-user-following",
        },
        {
          name: "Supplier Master",
          url: "/Supplier_Master",
          icon: "icon-user-following",
        },
        {
          name: "Reporting Master",
          url: "/Reporting_Master",
          icon: "icon-user-following",
        },
        {
          name: "Complaint Master",
          url: "/Complaint_Master",
          icon: "icon-user-following",
        },
        {
          name: "Food Master",
          url: "/Food_Master",
          icon: "icon-user-following",
        },
        {
          name: "Hotel Master",
          url: "/Hotel_Master",
          icon: "icon-user-following",
        },
        {
          name: "Delivery Master",
          url: "/Delivery_Master",
          icon: "icon-user-following",
        },
        {
          name: "UOM Master",
          url: "/UOM_Master",
          icon: "icon-user-following",
        },
        {
          name: "Dispatch Master",
          url: "/Dispatch_Master",
          icon: "icon-user-following",
        },
        {
          name: "Skill Master",
          url: "/Skill_Master",
          icon: "icon-user-following",
        },
        {
          name: "Reward Master",
          url: "/Reward_Master",
          icon: "icon-user-following",
        },
        {
          name: "Sales Master",
          url: "/Sales_Master",
          icon: "icon-user-following",
        },
        {
          name: "Daily Items",
          url: "/daily_items",
          icon: "icon-support",
        },
        {
          name: "Catering Items",
          url: "catering_items",
          icon: "icon-bag",
        },
      ],
    },

    {
      name: "Account",
      url: "/Master",
      icon: "icon-support",
      children: [
     
        {
          name: "Quotation",
          url: "/Quotation",
          icon: "icon-user-invoice",
        },
        
        {
          name: "Invoice",
          url: "/Invoice",
          icon: "icon-user-invoice",
        },
        
        {
          name: "Purchase Order",
          url: "/PurchaseOrder",
          icon: "icon-user-invoice",
        },
        {
          name: "Purchase Ledger",
          url: "/PurchaseLedger",
          icon: "icon-user-invoice",
        },
        {
          name: "Supplier Payment",
          url: "/SupplierPayment",
          icon: "icon-user-invoice",
        },
        {
          name: "Customer Payment",
          url: "/CustomerPayment",
          icon: "icon-user-invoice",
        },
        {
          name: "Target",
          url: "/Target",
          icon: "icon-user-invoice",
        },
        {
          name: "Voucher",
          url: "/Voucher",
          icon: "icon-user-invoice",
        },
        {
          name:"Company Expenses",
          url: "/CompanyExpenses",
          icon: "icon-user-invoice",
        },
        {
          name:"Customer Ledger",
          url: "/CustomerLedger",
          icon: "icon-user-invoice",
        },
        {
          name:"Supplier Ledger",
          url: "/SupplierLedger",
          icon: "icon-user-invoice",
        },
        {
          name:"Stocks",
          url: "/Stocks",
          icon: "icon-user-invoice",
        },
        {
          name:"Daily Report",
          url: "/DailyReport",
          icon: "icon-user-invoice",
        },
        {
          name:"Outstanding Report",
          url: "/OutstandingReport",
          icon: "icon-user-invoice",
        },
        {
          name:"Product Profit Loss",
          url: "/ProductProfitLoss",
          icon: "icon-user-invoice",
        },
        {
          name: "Invoice2",
          url: "/Invoice2",
          icon: "icon-user-invoice",
        },
        {
          name:"Performa Invoice",
          url:"/PerformaInvoice",
          icon: "icon-user-invoice",
        },
      ],
    },
    //
    {
      name: "Contact History",
      url: "/contact_history",
      icon: "icon-list",
      children: [
        {
          name: "Hotel Owners-Vendors",
          url: "/contact_history/hotel_owners_vendors",
          icon: "icon-people",
        },
        {
          name: "Hotel Owners-Service Providers",
          url: "/contact_history/hotel_owners_suppliers",
          icon: "icon-people",
        },
        {
          name: "Hotel Owners-Employees",
          url: "/contact_history/hotel_owners_employees",
          icon: "icon-people",
        },
        {
          name: "Employees-Hotel Owners",
          url: "/contact_history/employees_hotel_owners",
          icon: "icon-people",
        },
      ],
    },
    {
      name: "E Commerce",
      url: "/Master",
      icon: "icon-list",
      children: [
        {
          name: "Product",
          url: "/Product",
          icon: "icon-people",
        },
     
        {
          name: "Product Gallary",
          url: "/ProductGallary",
          icon: "icon-people",
        },
        {
          name: "Product View",
          url: "/ProductView",
          icon: "icon-people",
        },
        {
          name: "Product Enquiry",
          url: "/ProductEnquiry",
          icon: "icon-people",
        },
        {
          name: "Order",
          url: "/Order",
          icon: "icon-people",
        },
      ],
    },
    {
      name: "Sales Management",
      url: "/SalesManagement",
      icon: "icon-list",
      children: [
        {
          name: "Sales Order",
          url: "/SalesOrder",
          icon: "icon-people",
        },
        {
          name: "Sales Follow-Up",
          url: "/SalesFollowUp",
          icon: "icon-people",
        },
       {
        
       },
      ],
    },


    {
      name: "Reports",
      url: "/reports",
      icon: "icon-layers",
      children: [
        {
          name: "Customer Report",
          url: "/Customer_Report",
          icon: "icon-menu",
        },

        {
          name: "Daily Business",
          url: "/reports/daily_business",
          icon: "icon-menu",
        },
        {
          name: "Inactive Members",
          url: "/reports/inactive_members",
          icon: "icon-people",
        },
      ],
    },
    {
      name: "Utilities",
      url: "/utilities",
      icon: "icon-doc",
      children: [
        {
          name: "Reporting",
          url: "reporting_data",
          icon: "icon-menu",
        },
      ],
    },
    {
      name: "Setting",
      url: "/setting",
      icon: "icon-settings",
      children: [
        {
          name: "User",
          url: "/user",
          icon: "icon-user",
        },
        {
          name: "Setting / Executive",
          url: "/setting/executive",
          icon: "icon-options",
        },
        {
          name: "Change Password",
          url: "/setting/change_password",
          icon: "icon-options",
        },
        {
          name: "SMTP",
          url: "/SMPT",
          icon: "icon-options",
        },
      ],
    },

    {
      name: "Scratch Card",
      url: "/scratch_card",
      icon: "icon-menu",
    },

    {
      name: "Complaints",
      url: "/complaints",
      icon: "icon-bubbles",
    },

    {
      name: "Logout",
      url: "/logout",
      icon: "icon-user-following",
    },
  ],
};

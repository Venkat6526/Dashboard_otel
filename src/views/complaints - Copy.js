import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line } from 'react-chartjs-2';
import url from './config.js';
import $ from 'jquery'
import DataTable from 'datatables.net';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MicroModal from 'micromodal'; 



//import {Basic_details_edit,Business_details_edit,Contact_details_edit} from "views/UserProfile/profile_template_edit.js";
 const onChange = (e) => {
    console.log(e.target.files)
  }

var ht;
var is_catering;
var catering_type;
var capacity;
var that;
var business_description;
var establishment_type;
var specialization_area;
var alt_msisdn;
var email_id;
var website;
var no_of_employees;
var year_of_establishment;
var business_name;
var state;
var address;
var address1;
var name;
	var images1;
	var msisdn;
	var experience_area;
	var city;
	var locality;
	var pin;
var is_catering="no";
var select_options;
var grand_data;
  const mystyle = {
      width: "250px",
      fontSize:"14px",
      
    };
    const mystyle1 = {
      
      fontSize:"14px",
      
    };
	const FileInput = (props) => (
	
  <input type="file" name="file" multiple  value={props.value}/>
)

   


    

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};




       var form_value=0; 
	
	
var that;
	  export default class Welcome extends React.Component {
		  
       constructor (props) {
	   super(props)
	   }

	
	   
  
 
   componentDidMount() { 
   
   $("#table").on("click",".view_complaint",function(){
	   $(this).attr("disabled",true);
	   complaint=$(this).attr("complaint");
	 // alert(complaint);
	    id=$(this).attr("value");
	     reply=$(this).attr("reply");
	   var data={complaint:complaint,id:id,reply:reply};
	  //alert(reply);
	  ReactDOM.render(<Resp data={data}/>,document.getElementById("complaint_box"));
	  MicroModal.init({
  onShow: modal => console.info('${modal.id} is shown'), 
  onClose: modal => console.info('${modal.id} is hidden'), 
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  disableScroll: true, // [5]
  disableFocus: false, // [6]
  awaitOpenAnimation: false, // [7]
  awaitCloseAnimation: false, // [8]
  debugMode: true // [9]
});   
        MicroModal.show('modal-1'); 
       $(this).attr("disabled",false);

   });
   
 
		
	
   }     
      
		
   
  render() {
    
	
      
    return <div>
	<div id="card">
				<Table/>
		
				</div>
	</div>;
  }
}



class Rate_card extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
		
	}
	render(){
		return <div>
		<h6>Item Details</h6>
	  
	      
				  
				 
                  
                    
                
				 <table id='experience_table' border="0" style={{width:"100%",fontSize:"13px"}}>
				 <thead>
				 <tr >
				
				 <th><h8>Item Name</h8>
				 <div id="multi_select"></div>
				 
				 </th></tr>
				 <tr > <th>Description
				 <br/>
				 <textarea disabled id='description'/>
				 
				 </th></tr>
				  <tr > <th >UOM:<br/><input disabled="true" type='text' id='uom' style={{width:"100px"}}/></th>  </tr>
				  <tr >  <th>Admin Rate(Rs)<br/>
				  <input disabled type='text' id='admin_rate' style={{width:"100px"}}/>
				  
				  </th> </tr>
					<tr ><th>Vendor Rate(Rs)<br/>
					<input  type='text' id='my_rate' style={{width:"100px"}}/>
					
					</th> </tr>
					
				
				 
				 <tr >
				 
				 
				  
				  
				  
				  
				    <th><button className='btn btn-primary' id='add_work'>Add</button></th>
				 </tr>
				 
				 </thead>
				 <tbody></tbody>
				 
				 </table>
				 
				 
                  
        
		
		</div>
	}
	
}


class get_multi{
	get_data(cb){
		  var ootel_auth_token=localStorage.getItem('ootel_auth_token');  
		  var postData={"auth_token":ootel_auth_token};
		 const  rawResponse1 =  fetch(url.server_url+"/get_vendor_supplier_data", {
    method: 'POST',
	  headers: {
      
      'Content-Type': 'application/json' 
    },
	body: JSON.stringify(postData),
   
  }).then(res => res.json())
    .then(data => {
        if(typeof data.error!="undefined"){
            try{
            alert(data.error);
   
        }catch(e){
            console.log(e.message);
        }
        }else{
        
		 
		  
		
		
	 return cb(data.data);
 
        




	
 
		}
        
     
        
        
        
        
  }).catch(err => {
        console.error('Error: ', err);
    });;
	}
	
	
	
}
var d;

class add extends React.Component{
		constructor(props){
			super(props);
			this.item=props.item;
			this.rate=props.rate;
			this.id=props.id;
		}
		get_data(cb){
			
			 var ootel_auth_token=localStorage.getItem('ootel_auth_token'); 
 var msisdn=localStorage.getItem('ootel_msisdn');  			 
			var postData={"item":this.item,"rate":this.rate,msisdn:msisdn,auth_token:ootel_auth_token,
			id:this.id
			}
			   const  rawResponse =  fetch(url.server_url+"/add_rate_card", {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
    .then(data => {
   try{     
if(data.error.length!=0){
    alert(data.error);return;
}
   }catch(e){
       
   }
   alert(data.data);
   document.location.reload();
  
   
  
    }).catch(err => {
        console.error('Error: ', err);
    });
		}
		
		
		
		
		
	}
	
	
	
	class get_search_data extends React.Component{
		
		constructor(page,per_page,column,direction,search){
			
			super(page,per_page,column,direction,search);
			
			this.search=search;
			this.column=column;
			this.direction=direction;
			this.per_page=per_page;
			this.page=page;
			
			that=this;
			
			
			
		}
		componentDidMount(){
		
		}
		get_data(){
			
			
			var ootel_auth_token=localStorage.getItem("ootel_admin_auth_token");
			   var msisdn=localStorage.getItem("ootel_admin_msisdn");
			   var role=localStorage.getItem("ootel_admin_role");
			  
			   var search_value;
			  
			   
              var postData={
				  "auth_token":ootel_auth_token,search:this.search,column:this.column,direction:this.direction
              ,per_page:this.per_page,"role":"vendor",msisdn:msisdn,page:this.page,
			 
			};
			  var  tab= $("#table").DataTable();
			  try{
				  tab.destroy();
			  }catch(e){
				  
			  }
			  
			     tab= $("#table").DataTable({
                  "processing": true,
        "serverSide": true,
        "bPaginate":true, // Pagination True
      "sPaginationType":"full_numbers", // And its type.
       "iDisplayLength": 10,
       //Initial no order.
           "search": {
    "search":""
  },
        "ajax": {
           //  "url": "get_completed_tests_for_print_backup.php",
           url:url.server_url+"/get_complaint_box", 
   
   type:"POST",
   dataType:"JSON",
   data:{ "auth_token":ootel_auth_token,column:this.column,direction:this.direction
              ,per_page:this.per_page,"role":"vendor",msisdn:msisdn,page:this.page,
			  
			 },
           
            "dataSrc": function (json1) {
          var return_data=new Array(); 
          var data=json1.data;
		  var data1=json1.data1;
          var k=1;
          for(var i=0;i<data.length;i++){
var act="<button  reply='"+data[i].reply+"' complaint='"+data[i].complaint+"' class='btn btn-primary view_complaint' value='"+data[i].id+"'>View</button>";
	

		  
        return_data.push({
              
        
         
            "sl_no":k++,
         "ticket_id":data[i].ticket_id,
         "role":data1[i][0].role,
          "created_on":data[i].created_on,
		   "business_name":data1[i][0].business_name,
		    "name":data1[i][0].name,
		   "msisdn":data[i].msisdn,
		     "complaint":act,
			 "status":data[i].status,
            "recordsTotal":11,
          
           "recordsFiltered":11,
          
        });
       }
    $("#table_filter").find("input").css({"width":"700px","margin-left":"-80%"});
       $("#table_filter").find("input").attr("placeholder","Search  Mobile");
	   
	    
	 
	   
	   
    
	 
	return return_data;
       }
    
        } ,
        "createdRow": function ( row, data, index ) {
         
               
				
				
				
				
            
        },
         "columnDefs": [
        { 
            "targets": [0,1], //first column / numbering column
            "orderable": false, //set not orderable
        },
        ],
        "columns": [
         { "data": "sl_no" },
           { "data": "ticket_id" },
           
            { "data": "role" },
			{ "data": "created_on" },
               { "data": "business_name" },
			   { "data": "name" },
			      { "data": "msisdn" },
				   { "data": "complaint" },
				    { "data": "status" },
             
               
        ]
   
             });
		




  
		 
		
	}
	
	
	
	
	}
	
	class Table extends React.Component{
		componentDidMount(){
			var c=new get_search_data("1","10","id","desc");
	c.get_data();
		
				
				
				
document.querySelector("#table").addEventListener('click', function (e) {
	
    if (new clk().hasClass(e.target, 'update')) {
		
		var elem=e.target;
	var z=(elem.className.split(' '));
		
		
  

    
   
   
	var id=e.target.getAttribute("value");
	
	var rate=e.target.parentNode.parentNode.querySelector("input").value;
	var max_rate=e.target.getAttribute("max_rate");
	
	var ootel_auth_token=localStorage.getItem("ootel_auth_token");
			 
			   
              var postData={
				  "max_rate":max_rate,
				  "auth_token":ootel_auth_token,id:id,rate:rate,
			 
			};
	 const  rawResponse =  fetch(url.server_url+"/update_rate_card", {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
    .then(data => {
   try{     
if(data.error.length!=0){
    alert(data.error);return;
}
   }catch(e){
       
   }
   alert(data.data);
   
  var c=new get_search_data("1","10","id","desc");
	c.get_data();
   
  
    }).catch(err => {
        console.error('Error: ', err);
    })
			
		
	}
		
		
    } 
, false);				
		


document.querySelector("#table").addEventListener('change', function (e) {
	
    if (new clk().hasClass(e.target, 'make_active_inactive')) {
		
		var elem=e.target;
	var z=(elem.className.split(' '));
		
		
  

    
   
   
	var status=e.target.value
	var id=e.target.getAttribute("ids");
	
	
	
	var ootel_auth_token=localStorage.getItem("ootel_auth_token");
			 
			   
              var postData={
				 
				  "auth_token":ootel_auth_token,id:id,status:status
			 
			};
	 const  rawResponse =  fetch(url.server_url+"/active_inactive_rate_card", {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
    .then(data => {
   try{     
if(data.error.length!=0){
    alert(data.error);return;
}
   }catch(e){
       
   }
   alert(data.data);
   
  var c=new get_search_data("1","10","id","desc");
	c.get_data();
   
  
    }).catch(err => {
        console.error('Error: ', err);
    })
			
		
	}
		
		
    } 
, false);	

		}
		
	
	
		
	 
	  render(){
		 
		 
		 
		 
		 return <div className='cl' style={{overflow:"auto",width:"1000px"}}>
		 <table className="table table-striped table-bordered" id="table">
			<thead>
				<tr >
				
				 <th>Sl No</th>
				  <th>Ticket Id</th>
				   <th >Role</th>
				    <th>Date</th>
					<th>Business Name</th>
					 <th>Name</th>
					 <th>Mobile No</th>
					 <th>Complaints</th>
					 <th>Status</th>
					 
				 </tr>
			</thead>
			<tbody>
			
			
			
			</tbody>
			</table>
		<div id='complaint_box'></div> 
		
		 </div>
		  
		 
	  }
  }
 class clk{
	   hasClass(elem, className) {
		   try{
			   return elem.className.split(' ').indexOf(className) > -1;
		   }catch(e){
			   return -1;
		   }
    
}
        
  }
  
  
  
  var that_resp;
  var complaint="";
  var reply="";
  var id="";
  class Resp extends React.Component{
	  constructor(props){
		  super(props);
		  that_resp=this;
		 that_resp.complaint=props.data.complaint;
		  that_resp.id=props.data.id;
		  that_resp.reply=props.data.reply;
		 // alert(props.complaint)
		  
		  
	  }
	  render(){
		  
		  return(
		  
		  
		  <div>
		 
		  <App complaint={complaint}  reply={reply}  id={id}/>
		  
		  
		  </div>
		  
		  
		  
		  
		  );
		  
		  
	  }
	  
	  
	  
  }
  
  
  var that_app;
  
  class App extends Component {
	  constructor(props){
		  super(props);
		  that_app=this;
		  that_app.complaint=props.complaint;
		   that_app.id=props.id;
		   that_app.reply=props.reply;
		   that_app.ckeditor_data="";
		   
	  }
	  componentDidMount(){
		  $("#send_reply").click(function(){
			 var auth_token=localStorage.getItem("ootel_admin_auth_token"); 
			  $.ajax({
				 url:url.server_url+"/send_response_complaint" ,
				 data:{reply:that_app.ckeditor_data,id:id,auth_token:auth_token},
				 type:"POST",
				 dataType:"JSON",
				 success:function(data){
					 try{
						 if(typeof data.error!=='undefined'){
						 alert(data.error);
						 return false;
						 }
					 }catch(e){
						 
					 }
					 alert(data.data);
					 document.location.reload();
				 },
				 error:function(xhr){
					 alert(xhr.responseText);
					 
					 
				 }
				 
				 
				 
			  });
			  
			
		});
		  
		  
		  
	  }
	  
    render() {
        return (
            <div className="App">
            
<div style={{width:"100%"}} className="modal micromodal-slide" id="modal-1" aria-hidden="true">
    <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
      <div style={{maxWidth:"1000px",width:"1000px"}}className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        
        <main className="modal__content" id="modal-1-content">
		 <h4>Complaints:</h4>
			{complaint}
   <br/>
   <br/>
  <h4> Reply:</h4>
			<CKEditor
                    editor={ ClassicEditor }
                    data={reply}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const ckeditor_data = editor.getData();
						that_app.ckeditor_data=ckeditor_data;
                        //console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        const ckeditor_data = editor.getData();
						that_app.ckeditor_data=ckeditor_data;
                    } }
                    onFocus={ ( event, editor ) => {
                        const ckeditor_data = editor.getData();
						that_app.ckeditor_data=ckeditor_data;
                    } }
                />
   
   
   
        </main>
        <footer className="modal__footer">
	<button className='btn btn-primary' value={id} id='send_reply'>Send</button>
		&nbsp;
          <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
        </footer>
      </div>
    </div>
  </div>






			
                
            </div>
        );
    }
}
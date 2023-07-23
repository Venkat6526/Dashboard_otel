import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Bar, Line } from 'react-chartjs-2';
import url from './config.js';
import $ from 'jquery'
import DataTable from 'datatables.net';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MicroModal from 'micromodal'; 


var that;
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
	var experience_area=[];
	var city;
	var locality;
	var pin;
var is_catering="no";
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


var that;	
var columns;
export default class Welcome extends React.Component {
      constructor(props) {
       super(props);
	   that=this;
       this.state = {
          data: props.value,
          loading: false,
          pages: 0,
          pagesize:10,
        fetch_flag:1,
        
          showModal_data:false
         
       };
       
   }
    
   
   componentDidMount() {
        
    
	   
     

  
   }   
       
       
       
        
        
        
      
        
  render() {
      const mystyle = { 
      width: "300px",
      fontSize:"14px",
      
    };
   
      
    const { data } = this.state;
 
      const overlayClassName = this.state.showModal_data
      ? "modal fade show"
      : "modal fade";
      
     
    return <div><Table/> </div>;
  }
}
  
  var that1;
 
  
  

var that_search;
    class Search extends React.Component {
		constructor(props){
			super(props);
			that_search=this;
			that_search.complaint="";
			
		}
		
		
		
		componentDidMount(){
			//new multi_select().get_multi();
			
			document.querySelector("#submit_request").addEventListener("click",function(){
				
				 var ootel_admin_auth_token=localStorage.getItem('ootel_admin_auth_token');  
			  var msisdn=localStorage.getItem('ootel_msisdn');  
			 var description=that_search.complaint;
	  var postData={"auth_token":ootel_admin_auth_token,"description":description,"msisdn":msisdn};
	  console.clear();
	  console.log(postData);
				
				 const  rawResponse1 =  fetch(url.server_url+"/add_complaint_box", {
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
			alert('Hi')
   
        }catch(e){
            console.log(e.message);
        }
        }else{
        
		 alert(data.data);
		document.location.reload();
		
	
        
		}
        
      
        
        
        
        
  }).catch(err => {
        console.error('Error: ', err);
    });;
			});
			
			
		}
  render() {
    return <div>
	
	Complaint:<br/>
	<CKEditor
                    editor={ ClassicEditor }
                    data={""}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        that_search.complaint = editor.getData();
						
                        //console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        that_search.complaint = editor.getData();
						
                    } }
                    onFocus={ ( event, editor ) => {
                        that_search.complaint = editor.getData();
						
                    } }
                />
	
	<br/>
<button id='submit_request'> Submit</button>

	<br/>
	</div>;
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
		componentDidMount(){}
		get_data(){
			
			
			var ootel_admin_auth_token=localStorage.getItem("ootel_admin_auth_token");
			   var msisdn=localStorage.getItem("ootel_admin_msisdn");
			   var role=localStorage.getItem("ootel_admin_role");
			  
			   var search_value;
			  
			   
              var postData={
				  "auth_token":ootel_admin_auth_token,"search":this.search,"column":this.column,"direction":this.direction
              ,"per_page":this.per_page,"role":role,"msisdn":msisdn,"page":this.page,
			 
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
   body:postData,
           
            "dataSrc": function (json1) {
          var return_data=new Array(); 
          var data=json1.data;
		  var data1=json1.data1;
          var k=1;
          for(var i=0;i<data.length;i++){
var act="<button   ticket_id='"+data[i].ticket_id+"'  reply='"+data[i].reply+"' complaint='"+data[i].complaint+"' class='btn btn-primary view_complaint' value='"+data[i].id+"'>View</button>";
	

		  
        return_data.push({
              
        
         
            "sl_no":k++,
         "ticket_id":data[i].ticket_id,
         "role":data1[i][0].role,
          "created_on":data[i].created_on,
		   "business_name":data1[i][0].business_name,
		    "name":data1[i][0].name,
		   "msisdn":data[i].msisdn,
		     "complaint":act,
			 "status":data[i].status
			 +"<select   ids='"+data[i].id+"' class='make_active_inactive form-control'><option value=''>--select--</option><option value='closed'>Closed</option></select>",
          
			 
            "recordsTotal":11,
          
           "recordsFiltered":11,
          
        });
       }
    $("#table_filter").find("input").css({"width":"700px"});
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
	class view_details extends React.Component{
		constructor(props){
			super(props);
			this.id=props
		}
		  click_fun(){
           
         
         
              try{
   var classname = document.getElementsByClassName("view_details");


  

    

  

       
   
 
    var postData={"id":this.id,"auth_token":localStorage.getItem("ootel_admin_auth_token"),"contact":"no"};
    
   
      const  rawResponse =  fetch(url.server_url+"/get_employee_specification", {
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
   
   
   try{
 var data1=data.data;
    	
  name= data1[0].name;
  business_name= data1[0].business_name;
 capacity= data1[0].capacity;
    
 var pan_number= data1[0].pan_no;
   var adhaar_number= data1[0].aadhar_no;
 specialization_area= data1[0].specialization_area;

  var nominee= data1[0].nominee;
   email_id= data1[0].email_id;
 website= data1[0].website; 
    	
  var blood_group= data1[0].blood_group;
    
     msisdn= data1[0].msisdn; 
	var gender= data1[0].gender; 
var nominee_relation= data1[0].nominee_relation;   	
		var emergency_msisdn=data1[0].emergency_msisdn; 
		
		  address= data1[0].address;
		    state= data1[0].state; 
			  city= data1[0].city;
		
		pin= data1[0].pin;
		locality= data1[0].locality;
		
		var address_permanent= data1[0].address_permanent;
		   var state_permanent= data1[0].state_permanent; 
			  var city_permanent= data1[0].city_permanent;
		
		var pin_permanent= data1[0].pin_permanent;
		var locality_permanent= data1[0].locality_permanent;
		var alt_msisdn= data1[0].alt_msisdn;
		var landline= data1[0].landline;
		var landmark= data1[0].landmark;
		var year_of_establishment= data1[0].year_of_establishment;
		var gst_no= data1[0].gst_no;
		var dob= data1[0].dob;
		document.querySelector("#name").value=name;
		document.querySelector("#msisdn").value=msisdn;
		document.querySelector("#alt_msisdn").value=alt_msisdn;

		document.querySelector("#landline").value=landline;
		
		document.querySelector("#business_name").value=business_name;

		document.querySelector("#landmark").value=landmark;
		
	
	
		
		document.querySelector("#state").value=state;
		
		document.querySelector("#locality").value=locality;
		document.querySelector("#pin").value=pin;
		document.querySelector("#city").value=city;
		
		
		document.querySelector("#year_of_establishment").value=year_of_establishment;
		document.querySelector("#gst_no").value=gst_no;
		
		
		
		
		
		
		try{
		 var	images1= data1[0].photo.split("<>");
		var	photos=[];
	for(var i=0;i<images1.length;i++){
				if(images1[i]!=""){
					photos.push(
				{
					"src":url.image_url+"/"+images1[i],
					"width":1,
					height:1
				
				});
				}
				
			}
			
			
		}catch(e){
			
		}
		
		//For view profile
		document.querySelector("#name").innerHTML=name;
		document.querySelector("#msisdn").innerHTML=msisdn;
		document.querySelector("#alt_msisdn").innerHTML=alt_msisdn;
		document.querySelector("#landline").innerHTML=landline;
		document.querySelector("#business_name").innerHTML=business_name;
		document.querySelector("#landmark").innerHTML=landmark;
		
		
	
		
		document.querySelector("#state").innerHTML=state;
		
		document.querySelector("#locality").innerHTML=locality;
		document.querySelector("#pin").innerHTML=pin;
		document.querySelector("#city").innerHTML=city;
		
		
		document.querySelector("#year_of_establishment").innerHTML=year_of_establishment;
		document.querySelector("#gst_no").innerHTML=gst_no;
		
		
		var html="";
		var x=data1[0].area_of_experience_profile;
		
		x=JSON.parse(x);
		for(var i=0;i<x.length;i++){
			html=html+x[i].name+"<br/>"
		}
		
		
		document.querySelector("#area_of_experience").innerHTML=html;
		 MicroModal.show('modal-1'); 
		
        
    }catch(e){
        console.log(e.message);
    }
    }).catch(err => {
        console.error('Error: ', err);
    });
       }catch(e){
		   
	   }
		
		
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
	
	var update_id="";
	var that_Table;
	class Table extends React.Component{
		constructor(props){
			super(props);
			that_Table=this;
			that_Table.state={
				'editor':""
				
			}
		}
		
		
		
		componentDidMount(){
			var c=new get_search_data("1","10","id","desc");
	c.get_data();
		 $("#table").on("click",".view_complaint",function(){
		
	   $(this).attr("disabled",true);
	   var this_var=   $(this);
	   var auth_token=localStorage.getItem("ootel_admin_auth_token");
	   
	  var ticket_id=$(this).attr("ticket_id");
	 update_id= $(this).attr("value");
	  
	   $.ajax({
		  url:url.server_url+"/get_ticket_history",
data:{"ticket_id":ticket_id,"auth_token":auth_token},
type:"POST",
dataType:"JSON",
success:function(data1){
	try{
		var data=data1.data;
	var html="";
	for(var i=0;i<data.length;i++){
		if(data[i].modified_on==null){
			data[i].modified_on="";
			
		}
		if(data[i].sent_by=="admin"){
			data[i].sent_by="me"
		}
		if(data[i].sent_by=="you"){
			data[i].sent_by="customer"
		}
		if(i==0){
			html=html+data[i].sent_by+"<br/>"+html+data[i].created_on+"<br/>"
		+data[i].complaint
	
		}else{
			html=html+data[i].sent_by+"<br/>"+data[i].created_on+""
		+"<br/>"+data[i].reply
		}
		
		
	}
	$("#complaint").html(html);
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
      this_var.attr("disabled",false);
	
	}catch(e){
		console.log(e.message); this_var.attr("disabled",false);
	}
	
	
},error:function(xhr){
	alert(xhr.rresponseText);
	 $(this).attr("disabled",false);
}
		  
	   });
	   
	   
	   
	   
	   
	  

   });
				
				
		$("body").on("click","#send_reply",function(){
			 var auth_token=localStorage.getItem("ootel_admin_auth_token"); 
			  $.ajax({
				 url:url.server_url+"/send_response_complaint" ,
				 data:{"reply":ckeditor_data,"id":update_id,"auth_token":auth_token},
				 type:"POST",
				 dataType:"JSON",
				 success:function(data){
					 try{
						 if(typeof (data.error)!=='undefined'){
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

		document.querySelector("#table").addEventListener('change', function (e) {
	
    if (new clk().hasClass(e.target, 'make_active_inactive')) {
		
		var elem=e.target;
	var z=(elem.className.split(' '));
		
		
  

    
   
   
	var id=e.target.getAttribute("ids");
	
//	var rate=e.target.parentNode.parentNode.querySelector("input").value;
	//var max_rate=e.target.getAttribute("max_rate");
	
	var ootel_auth_token=localStorage.getItem("ootel_admin_auth_token");
			 
			   
              var postData={
				  "status":e.target.value,
				  "auth_token":ootel_auth_token,"id":id
			 
			};
	 const  rawResponse =  fetch(url.server_url+"/make_active_inactive_complaint", {
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
		<div className="App">
            
<div style={{width:"100%"}} className="modal micromodal-slide" id="modal-1" aria-hidden="true">
    <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
      <div style={{maxWidth:"1000px",width:"1000px"}}className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        
        <main className="modal__content" id="modal-1-content">
		<div id='complaint'></div>

   
   <CKEditor
                    editor={ ClassicEditor }
                    
                    onInit={ editor => {
                       // editor.setData({"data":""});
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                         ckeditor_data = editor.getData();
						 that_Table.setState({"editor":""})
						// alert(ckeditor_data);
						//that_app.ckeditor_data=ckeditor_data;
                        //console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                         ckeditor_data = editor.getData();
						 
						//that_app.ckeditor_data=ckeditor_data;
                    } }
                    onFocus={ ( event, editor ) => {
                         ckeditor_data = editor.getData();
						//that_app.ckeditor_data=ckeditor_data;
                    } }
                />
   
        </main>
        <footer className="modal__footer">
	<button className='btn btn-primary'  id='send_reply'>Send</button>
		&nbsp;
		&nbsp;
          <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
        </footer>
      </div>
    </div>
  </div>
			 </div>
		 </div>
		  
		 
	  }
  }
	
	 var that_resp;
	 var ckeditor_data;
  class Resp extends React.Component{
	  constructor(props){
		  super(props);
		  that_resp=this;
		 that_resp.complaint=props.complaint;
		  that_resp.id=props.id;
		  that_resp.reply=props.reply;
		// alert(props.complaint)
		  
		  
	  }
	  componentDidMount(){
		  
	  }
	  
	  
	  render(data){
		
		  return(
		  
		  `
		  <div>
		 
		  
            






			
                
           
		  
		  
		  </div>
		  
		  
		  `
		  
		  );
		  
		  
	  }
	  
	  
	  
  }
  
  
  var that_app;
  
  class App extends React.Component {
	  constructor(props){
		  super(props);
		  that_app=this;
		  that_app.complaint=props.complaint;
		   that_app.id=props.id;
		   that_app.reply=props.reply;
		   that_app.ckeditor_data="";
		   
	  }
	  componentDidMount(){
		  
		  
		  
		  
	  }
	  
    
}
	
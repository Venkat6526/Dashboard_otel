import React, { useState, useCallback,useEffect, useRef } from "react";
//import { useForm } from 'react-hook-form'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ReactDOM from "react-dom";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import $ from 'jquery'
//import 'bootstrap/dist/css/bootstrap.min.css';

//import avatar from "assets/img/faces/marc.jpg";
//import 'bootstrap/dist/css/bootstrap.min.css';
import url from './config.js';

//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import BugReport from "@material-ui/icons/BugReport";
//import MultiStep from 'react-multistep';
//import {Basic_details} from "views/hotel_owners/UserProfile/profile_template.js";
import { Multiselect } from 'multiselect-react-dropdown';
import  {Photo_details} from "../views/photo_gallery.js";

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
			
			
		var education=[];
		var specialization=[];		
		var languages=[];		
			that=this;
    //that.id=props.id;
    this.state = {
		//data:props.value
		
		
	}
		
   
	this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
	this.handle_hotel_type = this.handle_hotel_type.bind(this);
	this.handle_address = this.handle_address.bind(this);
	this.handle_address1 = this.handle_address1.bind(this);
	this.handle_city = this.handle_city.bind(this);
	this.handle_state = this.handle_state.bind(this);
	this.handle_pin = this.handle_pin.bind(this);
	this.handle_locality = this.handle_locality.bind(this);
	this.handle_year_of_establishment = this.handle_year_of_establishment.bind(this);
	this.handle_no_of_employees = this.handle_no_of_employees.bind(this);
	this.handle_business_description = this.handle_business_description.bind(this);
	this.handle_specialization_area = this.handle_specialization_area.bind(this);
	this.handle_catering_capacity = this.handle_catering_capacity.bind(this);
		this.handle_website = this.handle_website.bind(this);
			this.handle_email_id = this.handle_email_id.bind(this);
				this.handle_alt_msisdn = this.handle_alt_msisdn.bind(this);
				this.handle_msisdn = this.handle_msisdn.bind(this);
				this.handle_fname = this.handle_fname.bind(this);
				this.handle_capacity = this.handle_capacity.bind(this);
				this.handle_file = this.handle_file.bind(this);
	
   that=this;
   
   
 
   
   
  }


	  handleFirstNameChanged (event) {
	  //alert(event.target.value);
	  this.setState({name: event.target.value});
 }
  handle_hotel_type (event) {
	  //alert(event.target.value);
	  this.setState({hoteltype: event.target.value});
 }
  handle_file (event) {
	 
	  //document.querySelector("#myform").value=event.target.value;
	  if(this.state.files_upload===undefined){
		 this.state.files_upload="";
	  }
	  //alert(event.target.files);
		    
		  this.setState({files_upload:event.target.files});
	 
	  
	
	  
 }
  handle_address (event) {
	  //alert(event.target.value);
	  this.setState({address: event.target.value});
 }
  handle_address1 (event) {
	  //alert(event.target.value);
	  this.setState({address1: event.target.value});
 } 
	 handle_city (event) {
	  //alert(event.target.value);
	  this.setState({city: event.target.value});
 }  
	handle_state (event) {
	  //alert(event.target.value);
	  this.setState({state: event.target.value});
 }  
	handle_pin (event) {
	  //alert(event.target.value);
	  this.setState({pin: event.target.value});
 }  
  
  handle_locality (event) {
	  //alert(event.target.value);
	  this.setState({locality: event.target.value});
 }  
   handle_year_of_establishment (event) {
	  //alert(event.target.value);
	  that.setState({yearofestablishment: event.target.value});
 }
  handle_no_of_employees (event) {
	  //alert(event.target.value);
	  that.setState({noofemployees: event.target.value});
 }
   handle_business_description (event) {
	  //alert(event.target.value);
	  that.setState({businessdescription: event.target.value});
 } 
 
  handle_specialization_area (event) {
	  //alert(event.target.value);
	  that.setState({specializationarea: event.target.value});
 } 
 handle_establishment_type (event) {
	  //alert(event.target.value);
	  that.setState({establishmenttype: event.target.value});
 } 


 handle_catering_capacity (event) {
	 
	  //that.setState({cateringcapacity1: false});
	  delete that.state.cateringcapacity1;
	  that.setState({cateringcapacity: event.target.value});
	  that.setState({catering_data1: "none"});
	  is_catering=event.target.value;
	  
	  document.querySelector('#catering_data1').style.display="none";
	   
 } 
handle_catering_capacity1 (event) {
	 delete that.state.cateringcapacity;
	 // that.setState({cateringcapacity: false});
	 is_catering=event.target.value;
	  that.setState({cateringcapacity1: event.target.value});
	that.setState({catering_data1: "block"});
	  document.querySelector('#catering_data1').style.display="block";
 } 
 handle_email_id (event) {
	 
	  that.setState({email_id: event.target.value});
	    //that.setState({cateringcapacity: "off"});
 } 
 handle_website (event) {
	
	  that.setState({website: event.target.value});
	    //that.setState({cateringcapacity: "off"});
 } 
 handle_msisdn (event) {
	
	  that.setState({msisdn: event.target.value});
	    //that.setState({cateringcapacity: "off"});
 } 
  handle_alt_msisdn (event) {
	
	  that.setState({alt_msisdn: event.target.value});
	    //that.setState({cateringcapacity: "off"});
 } 
 
   handle_fname (event) {
	
	  that.setState({fname: event.target.value});
	    //that.setState({cateringcapacity: "off"});
 }
 
 handle_capacity (event) {
	  //alert(event.target.value);
	  that.setState({capacity: event.target.value});
 } 
 handle_website (event) {
	  //alert(event.target.value);
	  that.setState({website: event.target.value});
 } 
  handle_catering_type (event) {
	 var data=event.target.value;
	delete that.state.catering_non_veg;
	delete that.state.catering_veg;
	delete that.state.catering_both;
	if(data=="non_veg"){
		 that.setState({catering_non_veg: event.target.value});
		 that.setState({catering_type: event.target.value});
	}
	 if(data=="veg"){
		 that.setState({catering_veg: event.target.value});
		  that.setState({catering_type: event.target.value});
	}
	 if(data=="both"){
		 that.setState({catering_both: event.target.value});
		  that.setState({catering_type: event.target.value});
	}
	 
	 
	  
	  
	  
	   
 } 
 
   componentDidMount1(id1) {
	   
	   
	   try{
         var ootel_auth_token=localStorage.getItem('ootel_admin_auth_token');  
         var postData={"auth_token":ootel_auth_token};
      var ootel_auth_token=localStorage.getItem('ootel_admin_auth_token');  
         var postData={"auth_token":ootel_auth_token};
		 
		 
		
		var ootel_auth_token=localStorage.getItem('ootel_admin_auth_token');  
      
       var id=id1;
	
       
	
	
	
	
	
   
	
          
  
  try{
  
           document.querySelector("#update_employee").addEventListener("click", function(e){
   e.preventDefault();    




	
	
	
	


 const formData = new FormData(document.querySelector('#myform'));
     var ootel_auth_token=localStorage.getItem('ootel_admin_auth_token');  
    formData.append("auth_token",ootel_auth_token);
	formData.append("id",id);
	formData.append("education",JSON.stringify(that.education));
	formData.append("specialization",JSON.stringify(that.specialization));
	formData.append("languages",JSON.stringify(that.languages));
	formData.append("experience_area",JSON.stringify(that.experience_area));
	
	
	var work_experience=[];
	var loop=document.querySelector("#experience_table_edit").getElementsByTagName('tbody')[0];
	var loop=loop.querySelectorAll("tr")
	for(var i=0;i<loop.length;i++){
		
		
		
		 var org=loop[i].getElementsByTagName('td')[0].innerHTML;
		  var years=loop[i].getElementsByTagName('td')[1].innerHTML;
		  var role=loop[i].getElementsByTagName('td')[2].innerHTML;
		  
		  
		  work_experience.push({
			  "organization":org,
			  "years":years,
			  "role":role,
		  });
		  
	}
	
	
	formData.append("work_experience",JSON.stringify(work_experience));
   const  rawResponse =  fetch(url.server_url+"/add_employees", {
    method: 'POST',
    body:(formData)
  }).then(res => res.json())
    .then(data => {
        if(typeof data.error!="undefined"){
            try{
            alert(data.error);
   
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
   
   
   
})
  }catch(e){
	  
  }
  
 
  
  try{
	 document.querySelector("#profile").addEventListener("click",function(e){
	 window.location.href = window.location.pathname+"?type=view"
}); 
  }catch(e){}

  try{
	  document.querySelector("#edit_profile").addEventListener("click",function(e){
		   window.location.href = window.location.pathname+"?type=update"
document.querySelector("#title").innerHTML="<h5>Update Your Profile</h5>";
 }); 
  }catch(e){
	  
  }
  
      
	 try{
		  document.querySelector("#add_work_edit").addEventListener("click",function(e){
		  e.preventDefault();
		  
		  var org=document.querySelector("#org_edit").value;
		  var years=document.querySelector("#years_edit").value;
		  var role=document.querySelector("#role_edit").value;
		  
		  if(org==""||years==""||role==""){
			  alert("All fields are Required");return;
		  }
		  
		  var url1 = new URL(window.location.href );
var c = url1.searchParams.get("type");
if(c=="view"){
	var html="<tr><td>"+org+"</td><td>"+years+"</td><td>"+role+"</td></tr>"
		
}else{
	var html="<tr><td>"+org+"</td><td>"+years+"</td><td>"+role+"</td><td><button class='delete'>Delete</button></td></tr>"
		
}
		  
		  
		  
		  
		  var tableRef = document.getElementById('experience_table_edit').getElementsByTagName('tbody')[0];
document.getElementById('experience_table_edit').getElementsByTagName('tbody')[0].innerHTML="";

var newRow = tableRef.insertRow(tableRef.rows.length);

newRow.innerHTML = html;

  var org=document.querySelector("#org_edit").value="";
		  var years=document.querySelector("#years_edit").value="";
		  var role=document.querySelector("#role_edit").value="";

		  try{
   var classname = document.getElementsByClassName("delete");

var myFunction = function(e) {
    e.preventDefault();
    this.parentNode.parentNode.remove();
   
};

for (var i = 0; i < classname.length; i++) {
   
    classname[i].addEventListener('click', myFunction, false);
}
       }catch(e){
           console.log(e.message);
       }
		  
 });  
	 }catch(e){
		 console.log(e.message);
	 }
	 
	 	
var url1 = new URL(window.location.href );
var c = url1.searchParams.get("type");
var view;
   if(c=="view"){
	   view=true;
   }else{
	   view=false;
   }
	 
	if(c!="view"){
	  var postData={"id":id};
		  
	 const  rawResponse1 =  fetch(url.server_url+"/get_experience_area", {
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
        
		  this.experience_area=(JSON.parse(data.data_selected));
		  this.education=(JSON.parse(data.data1_selected));
		  this.specialization=(JSON.parse(data.data2_selected));
		  this.languages=(JSON.parse(data.data3_selected));
		
		
	ReactDOM.render(
 <Multiselect
options={ data.data} // Options to display in the dropdown
selectedValues={JSON.parse(data.data_selected)} // Preselected value to persist in dropdown
onSelect={this.onSelect_area_of_experience} // Function will trigger on select event
onRemove={this.onRemove_area_of_experience} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>,
  document.getElementById("area_of_experience_edit")
);
        
ReactDOM.render(
 <Multiselect
options={ data.data1} // Options to display in the dropdown
selectedValues={ JSON.parse(data.data1_selected)} // Preselected value to persist in dropdown
onSelect={this.onSelect_education} // Function will trigger on select event
onRemove={this.onRemove_education} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>,
  document.getElementById("education_edit")
);
var data2_selected=(JSON.parse((data.data2_selected)));

ReactDOM.render(
 <Multiselect
options={ data.data2} // Options to display in the dropdown
selectedValues={data2_selected} // Preselected value to persist in dropdown
onSelect={this.onSelect_specialization} // Function will trigger on select event
onRemove={this.onRemove_specialization} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>,
  document.getElementById("specialization_edit")
);

var data3_selected=JSON.parse(data.data3_selected)
ReactDOM.render(
 <Multiselect
options={ data.data3} // Options to display in the dropdown
selectedValues={data3_selected} // Preselected value to persist in dropdown
onSelect={this.onSelect_languages} // Function will trigger on select event
onRemove={this.onRemove_languages} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>,
  document.getElementById("languages_edit")
);	

try{
	document.querySelector("#same_adr_edit").addEventListener("click",function(e){
	e.preventDefault();
	var x=document.querySelector("#address_edit").value;
	document.querySelector("#address_permanent_edit").value=x;
	var x=document.querySelector("#state_edit").value;
	document.querySelector("#state_permanent_edit").value=x;
	var x=document.querySelector("#city_edit").value;
	document.querySelector("#city_permanent_edit").value=x;
	var x=document.querySelector("#locality_edit").value;
	document.querySelector("#locality_permanent_edit").value=x;
	var x=document.querySelector("#pin_edit").value;
	document.querySelector("#pin_permanent_edit").value=x;
	
	
});
}catch(e){
	
}

	
 
		}
        
     
        
        
        
        
  }).catch(err => {
        console.error('Error: ', err);
    });;
	  
   	
	}
	}catch(e){
	   console.log(e.message);
   }
	
	
	new Counter().componentDidMount1(id);
	
   }     
      
		   onSelect_area_of_experience(selectedList, selectedItem) {
			   that.experience_area="";
   that.experience_area=(selectedList);
   
   
}
 
onRemove_area_of_experience(selectedList, removedItem) {
	that.experience_area="";
  that.experience_area=selectedList;
  
}
 onSelect_education(selectedList, selectedItem) {
			   that.education="";
   that.education=(selectedList);
   
}
 
onRemove_education(selectedList, removedItem) {
	that.education="";
  that.education=(selectedList);
  
}
		
   onSelect_specialization(selectedList, selectedItem) {
	   
			   that.specialization="";
   that.specialization=selectedList;
  // alert(that.specialization)
   
}
 
onRemove_specialization(selectedList, removedItem) {
	that.specialization="";
  that.specialization=(selectedList);
  
}    	     
   


onSelect_languages(selectedList, selectedItem) {
			   that.languages="";
   that.languages=(selectedList);
   
}
 
onRemove_languages(selectedList, removedItem) {
	that.languages="";
  that.languages=(selectedList);
  
}    	
   
  render() {
    
	
      
      
    return `<div>
	
	<div>
					   <h5 id='title'>Update Profile</h5>
                         <form id='myform' name='myform' style={mystyle1}   encType="multipart/form-data" >
							
							 <div id='data'>${new Counter().render()}</div>
      
	  
	  </form>
	 <button   id="update_employee" type="submit" value='0' class="btn btn-primary">Save All</button>
    </div>
	
	</div>`;
  }
  
   
}
var that2;
class Counter extends React.Component {
	constructor(props){
		super(props);
		that2=this;
		//that2.id=props.id;
		//alert(props);
	}
	componentDidMount1(id){
		 var postData={"id":id};
		// alert(id)
        const  rawResponse =  fetch(url.server_url+"/get_hotel_owners", {
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
		var abroad_job= data1[0].abroad_job;
		
		
		var dob= data1[0].dob;
		document.querySelector("#name_edit").value=name;
		//alert(name);
		document.querySelector("#msisdn_edit").value=msisdn;
		document.querySelector("#adhaar_number_edit").value=adhaar_number;
		try{
			document.querySelector("#blood_group_edit").value=blood_group;
		}catch(e){
			
		}
		try{
			document.querySelector("#nominee_relation_edit").value=nominee_relation;
		}catch(e){
			
		}
		document.querySelector("#email_id_edit").value=email_id;
		document.querySelector("#emergency_msisdn_edit").value=emergency_msisdn;
		document.querySelector("#pan_number_edit").value=pan_number;
		document.querySelector("#nominee_edit").value=nominee;
		document.querySelector("#dob_edit").value=dob;
		
	
		
		document.querySelector("#state_edit").value=state;
		document.querySelector("#address_edit").value=address;
		document.querySelector("#locality_edit").value=locality;
		document.querySelector("#pin_edit").value=pin;
		document.querySelector("#city_edit").value=city;
		
		
		document.querySelector("#state_permanent_edit").value=state_permanent;
		document.querySelector("#address_permanent_edit").value=address_permanent;
		document.querySelector("#locality_permanent_edit").value=locality_permanent;
		document.querySelector("#pin_permanent_edit").value=pin_permanent;
		document.querySelector("#city_permanent_edit").value=city_permanent;
		
		var work_experience= data1[0].total_experience;
		var salary= data1[0].salary;
		var bank_account_no= data1[0].bank_account_no;
		var ifsc_code= data1[0].ifsc_code;
		document.querySelector("#work_experience_edit").value=work_experience;
		//alert(salary);
		document.querySelector("#salary_edit").value=salary;
		document.querySelector("#ifsc_code_edit").value=ifsc_code;
		document.querySelector("#bank_account_no_edit").value=bank_account_no;
		
		var details= JSON.parse(data1[0].work_experience);
		document.getElementById('experience_table_edit').getElementsByTagName('tbody')[0].innerHTML="";

		//alert(details);
		try{
			for(var i=0;i<details.length;i++){
		var org=details[i].organization;
		  var years=details[i].years;
		  var role=details[i].role;
		  
		
		  

var html="<tr><td>"+org+"</td><td>"+years+"</td><td>"+role+"</td><td><button class='delete'>Delete</button></td></tr>"
	
		  
		 
		  var tableRef = document.getElementById('experience_table_edit').getElementsByTagName('tbody')[0];

var newRow = tableRef.insertRow(tableRef.rows.length);
newRow.innerHTML = html;
		//alert(html);
		}
		 try{
   var classname = document.getElementsByClassName("delete");

var myFunction = function(e) {
    e.preventDefault();
    this.parentNode.parentNode.remove();
   
};

for (var i = 0; i < classname.length; i++) {
   
    classname[i].addEventListener('click', myFunction, false);
}
       }catch(e){
           console.log(e.message);
       }
		
		
		
		}catch(e){
			
		}
		
		
		var gender_array=document.querySelectorAll(".gender");
		
		for(var i=0;i<gender_array.length;i++){
			
			if(gender_array[i].value==gender){
				
				gender_array[i].checked=true;
			}
		}
		
		var abroad_job_array=document.querySelectorAll(".abroad_job");
		
		for(var i=0;i<abroad_job_array.length;i++){
			
			if(abroad_job_array[i].value==abroad_job){
				
				abroad_job_array[i].checked=true;
			}
		}
		
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
			ReactDOM.render(
  <Photo_details data={photos}/>,
  document.getElementById("photo_details_edit")
);			
			
		}catch(e){
			
		}
		
		//For view profile
		
		
		
		
        
    }catch(e){
        console.log(e.message);
    }
    }).catch(err => {
        console.error('Error: ', err);
    });
	}
	
	
	
  render() {
    return (
	`<div>
	 <h6>Basic Details</h6>
	
	<div class='row'>
        <div class='col-md-6'>
          <b> Name:</b><span class='required'></span>
                 <input type='text'  name="fname" id='name_edit' style={mystyle} class='form-control u-full-width'
				 
				
				 
              
				 /> 
				 <b> Mobile:</b><span class='required'></span>
                 <input type='text' disabled id='msisdn_edit'  style={mystyle} class='form-control u-full-width'
				 
				
              
				 />
                
                <b> Gender:</b><span class='required'></span>
				<br/>
                 Male:<input type='radio' value='male' defaultChecked  name="gender" class='gender' style={{width:"10px"}} class='gender  u-full-width'
				 />
				&nbsp;&nbsp;&nbsp;Female:<input type='radio'  value='female'  name="gender" class='gender'  style={{width:"10px"}} class='gender  u-full-width'
				 />
                 
                 
                 <br/>
                  
                 
                 
                 <b> Emergency Contact Number:</b><span class='required'></span>
                 <input type='text' id='emergency_msisdn_edit'  name='emergency_msisdn'  style={mystyle} class='form-control'
				/>
            
                 
                 <b> Email ID:</b>
                 <input type='email' id='email_id_edit'  name='email_id'  style={mystyle} class='form-control'
				/>
				<b> Date of Birth:</b><span class='required'></span>
                 <input type='date' id='dob_edit'  name='dob'  style={mystyle} class='form-control'
				/>
				
        </div>
        <div class='col-md-6'>
		<b> Adhaar Number:</b><span class='required'></span>
                 <input type='text' id='adhaar_number_edit'  name='adhaar_number'  style={mystyle} class='form-control'
				/>
          <b> PAN Number:</b>
                 <input type='text' name="pan_number" id='pan_number_edit' style={mystyle} class='form-control'
				  
              
				 />
                
                 
                  <b> Blood Group:</b><span class='required'></span>
                  
                 
				   
              <select style={mystyle} class='form-control' id='blood_group_edit'  name='blood_group'>
				 <option value=''>--select--</option>
				  <option value='A+'>A+</option>
				  <option value='A-'>A-</option>
				  <option value='B+'>B+</option>
				  <option value='B-'>B-</option>
				  <option value='O+'>O+</option>
				  <option value='O-'>O-</option>
				  <option value='AB+'>AB+</option>
				  <option value='AB-'>AB-</option>
				
				 </select>
				  
                 
                  <b>Nominee:</b><span class='required'></span>
                 <input type='text' id='nominee_edit' name='nominee'  style={mystyle} class='form-control'
				 
				  onChange={that.handle_city}
              
				 />
                 
                 <b> Relationship with Nominee:</b><span class='required'></span>
                 <select style={mystyle} class='form-control' id='nominee_relation_edit'  name='nominee_relation'>
				 <option value=''>--select--</option>
				  <option value='father'>Father</option>
				  <option value='mother'>Mother</option>
				  <option value='wife'>Wife</option>
				  <option value='husband'>Husband</option>
				  <option value='son'>Son</option>
				  <option value='daughter'>Daughter</option>
				  <option value='brother'>Brother</option>
				  <option value='sister'>Sister</option>
				  <option value='other'>Other</option>
				 
				 </select>
               
                
        </div>
      </div>
	  <hr/>
	    <h6>Address Details</h6>
	  <div class='row'>
  
   <div class='col-md-6'>
  <h7>Present Address</h7>
  <br/>
  
          <b> Address:</b><span class='required'></span>
                 <input type='text' name="address" id='address_edit' style={mystyle} class='form-control'
				  onChange={that.handle_address}
              
				 />
                
                 
                  <b> State:</b><span class='required'></span>
                  
                  <input type='text' id='state_edit' name='state' class='form-control' style={mystyle}
				   onChange={that.handle_address1}
              
				  />
                 
                  <b>City:</b><span class='required'></span>
                 <input type='text' id='city_edit' name='city'  style={mystyle} class='form-control'
				 
				  onChange={that.handle_city}
              
				 />
                 
                 <b> Locality:</b><span class='required'></span>
                 <input type='text' id='locality_edit'  name='locality'  style={mystyle} class='form-control'
				  onChange={that.handle_locality}
              
				 />
                <b>   PIN:</b><span class='required'></span>
                 <input type='text' id='pin_edit'   name='pin'   style={mystyle} class='form-control' 
				  onChange={that.handle_pin}
              />
                
        </div>
  
        <div class='col-md-6'>
		<input type='checkbox' class='' name='same_adr' id='same_adr_edit' style={{width:"10px"}}/> Same as present address.
		<br/>
  <h7>Permanent Address</h7>
  <br/>
  
          <b> Address:</b><span class='required'></span>
                 <input type='text' name="address_permanent" id='address_permanent_edit' style={mystyle} class='form-control'
				  onChange={that.handle_address}
              
				 />
                
                 
                  <b> State:</b><span class='required'></span>
                  
                  <input type='text' id='state_permanent_edit' name='state_permanent' class='form-control' style={mystyle}
				   onChange={that.handle_address1}
              
				  />
                 
                  <b>City:</b><span class='required'></span>
                 <input type='text' id='city_permanent_edit' name='city_permanent'  style={mystyle} class='form-control'
				 
				  onChange={that.handle_city}
              
				 />
                 
                 <b> Locality:</b><span class='required'></span>
                 <input type='text' id='locality_permanent_edit'  name='locality_permanent'  style={mystyle} class='form-control'
				  onChange={that.handle_locality}
              
				 />
                <b>   PIN:</b><span class='required'></span>
                 <input type='text' id='pin_permanent_edit'   name='pin_permanent'   style={mystyle} class='form-control' 
				  onChange={that.handle_pin}
              />
               
        </div>
      </div>
	  
	  <hr/>
						   <h6>Qualification Details</h6>
	  <div class='row'>
         <div class='col-md-12'>
          <b>Heighest Education
:</b><span class='required'></span>
                 <div id='education_edit'  ></div>
                 
                 
                  <b>Specialization:</b>
                  
                  <div id='specialization_edit' name='specialization' ></div>
                  
                    <b>Languages Known:</b><span class='required'></span>
                 <div id='languages_edit' ></div>
                 
                 
  
  
        </div>
        
      </div>
	  
	  <hr/>
						  <h6>Experience Details</h6>
	  
	  <div class='row'>
       <div class='col-md-12'>
          <b>Total Work Experience
:</b>
                 <input type='text' id="work_experience_edit"  name="total_experience"  style={mystyle} class='form-control'
				 	onChange={that.handle_fname}
              
				 
				 
				 />
                 
                 
                  <b>Area Of Experience:</b>
                  
                 <div id='area_of_experience_edit' ></div>
				  
				  
				 
                  
                    
                 <b>Work Expeience:</b>
				 <table id='experience_table_edit' style={{width:"100%",fontSize:"10px"}}>
				 <thead>
				 <tr >
				 <th><h8>Organization Name</h8></th>
				  <th>Years</th>
				   <th>Role</th>
				    <th>Action</th>
				 </tr>
				 
				 <tr >
				 <th><input type='text' id='org_edit'/></th>
				  <th><input type='text' id='years_edit'/></th>
				   <th><input type='text' id='role_edit'/></th> 
				    <th><button id='add_work_edit'>Add</button></th>
				 </tr>
				 
				 </thead>
				 <tbody></tbody>
				 
				 </table>
				 
				 
                  <b>Current Salary:</b>
                 <input type='text' id='salary_edit' name='salary'  style={mystyle} class='form-control'
				 	
				 />
				 <b>Interested in Abroad Job?:</b><span class='required'></span>
                 <br/>
				 No: <input type='radio' value='no' defaultChecked class='abroad_job' name='abroad_job'  style={{width:"10px"}} 
				 	
				 />
				  Yes: <input type='radio' value='yes' class='abroad_job' name='abroad_job' style={{width:"10px"}}  
				 	
				 />
				 
  
   
        </div>
        
      </div>
	   </div>
	  
	   <hr/>
						    
	   <div class='row'>
	  
         <div class='col-md-12'>
		  <h6>Bank Details</h6>
          <b>Bank Account Number
:</b><span class='required'></span>
                 <input type='text' name="bank_account_no" id='bank_account_no_edit' style={mystyle} class='form-control'
				 	onChange={that.handle_fname}
              
				 
				 
				 />
                 
                 
                   <b>IFSC Code:</b><span class='required'></span>
                 <input type='text' name="ifsc_code" id='ifsc_code_edit' style={mystyle} class='form-control'
				 	onChange={that.handle_fname}
              
				 
				 
				 />
                  
                   
				 
  
        </div>
        
      </div>
	  
	   <hr/>
	 
	 <h6>Photo Details</h6>
	 
	<div class='row'>
         <div class='col-md-12'>
		 <br/> 
   <b>Photos:</b>
				 
                   <input type="file" id="file" name="file" multiple
				  
				   
				   />
   	<br/>
		<br/>
	 				<br/>
        </div>
        
      </div>
	  
	  </div>`);
  }
}



class Counter_edit extends React.Component {
  render() {
    return <div>
	 <h6>Basic Details</h6>
	
	<div>
        <div xs={6} sm={6} md={6}>
          <b> Name:</b> <span id='name'></span>
                 <br/>
				 <b> Mobile:</b><span id='msisdn'></span>
                
                 <br/>
                <b> Gender:</b><span id='gender'></span>
				
                 
                 <br/>
                  
                 
                 
                 <b> Emergency Contact Number:</b><span id='emergency_msisdn'></span>
                 <br/>
            
                 
                 <b> Email ID:</b><span id='email_id'></span>
                  <br/>
				<b> Date of Birth:</b><span id='dob'></span>
                <br/>
				
        </div>
        <div xs={6} sm={6} md={6}>
		<b> Adhaar Number:</b><span id='adhaar_number'></span>
                 <br/>
          <b> PAN Number:</b><span id='pan_number'></span>
                 <br/>
                
                 
                  <b> Blood Group:</b><span id='blood_group_view'></span>
                  
                 
			<br/>
				  
                 
                  <b>Nominee:</b><span id='nominee'></span>
                 <br/>
                 
                 <b> Relationship with Nominee:</b><span id='nominee_relation'></span>
                 <br/>
               
                
        </div>
      </div>
	  <hr/>
	    <h6>Address Details</h6>
	  <div>
  
  <div xs={6} sm={6} md={6}>
  <h7>Present Address</h7>
  <br/>
  
          <b> Address:</b><span id='address'></span>
                <br/>
                 
                  <b> State:</b><span id='state'></span>
                  
                  <br/>
                 
                  <b>City:</b><span id='city'></span>
                 <br/>
                 
                 <b> Locality:</b><span id='locality'></span>
                <br/>
                <b>   PIN:</b><span id='pin'></span>
                 <br/>
                
        </div>
  
        <div xs={6} sm={6} md={6}>
		
  <h7>Permanent Address</h7>
  <br/>
  
          <b> Address:</b><span id='address_permanent'></span>
                 <br/>
                
                 
                  <b> State:</b><span id='state_permanent'></span>
                  
                  <br/>
                  <b>City:</b><span id='city_permanent'></span>
                 <br/>
                 
                 <b> Locality:</b><span id='locality_permanent'></span>
                <br/>
                <b>   PIN:</b><span id='pin_permanent'></span>
                 <br/>
               
        </div>
      </div>
	  
	  <hr/>
						   <h6>Qualification Details</h6>
	  <div>
        <div xs={12} sm={12} md={12}>
          <b>Heighest Education
:</b><span id='required'></span>
                 <div id='education'  ></div>
                 
                 
                  <b>Specialization:</b>
                  
                  <div id='specialization' name='specialization' ></div>
                  
                    <b>Languages Known:</b><span id='required'></span>
                 <div id='languages' ></div>
                 
                 
  
  
        </div>
        
      </div>
	  
	  <hr/>
						  <h6>Experience Details</h6>
	  
	  <div>
        <div xs={12} sm={12} md={12}>
          <b>Total Work Experience
:</b><span id='work_experience'></span> Years.
                <br/>
                 
                 
                  <b>Area Of Experience:</b>
                  
                 <div id='area_of_experience' />
				  
				  
				 
                  
                    
                 <b>Work Expeience:</b><span id='required'></span>
				 <table id='experience_table' style={{width:"100%",fontSize:"10px"}}>
				 <thead>
				 <tr >
				 <th><h8>Organization Name</h8></th>
				  <th>Years</th>
				   <th>Role</th>
				    
				 </tr>
				 
				 
				 
				 </thead>
				 <tbody></tbody>
				 
				 </table>
				 
				 
                  <b>Current Salary:</b><span id='salary'></span>
                <br/>
				 <b>Interested in Abroad Job?:</b><span id='abroad_job'></span>
                 <br/>
				 
				 
  
   
        </div>
        
      </div>
	  
	  
	   <hr/>
						    <h6>Bank Details</h6>
	   <div>
        <div xs={12} sm={12} md={12}>
          <b>Bank Account Number
:</b><span id='bank_account_no'></span>
                 
				 <br/>
                 
                   <b>IFSC Code:</b><span id='ifsc_code'></span>
                
                   
				 
  
        </div>
        
      </div>
	  
	   <hr/>
	 
	 <h6>Photo Details</h6>
	  
	  <div>
        <div xs={12} sm={12} md={12}>
           
				 
   <b>Photos:</b>
				 
                  <div id='photo_details'></div>
        </div>
        
      </div>
	  
	  </div>;
  }
}


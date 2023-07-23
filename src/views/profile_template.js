import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import url from "./config.js";
import  {Photo_details} from "../views/photo_gallery.js";

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
	
	var city;
	var locality;
	var pin;
	
console.log("jag");
var photos=[];
export const Basic_details =class Basic_details extends React.Component {
	constructor(props){
		super(props);
		this.state={
			photos:""
		}
		
		that=this;
		
	}
	componentDidMount(){
		
	}
	
	
render() {
      const mystyle = {
      width: "250px",
      fontSize:"14px",
      
    };
    const mystyle1 = {
      
      fontSize:"14px",
      
    }; 
      
      
      
    return <div>
	
	<div style={{width:"100%"}} className="modal micromodal-slide" id="modal-1" aria-hidden="true">
    <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
      <div style={{maxWidth:"1000px",width:"1000px"}}className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        
        <main className="modal__content" id="modal-1-content">
			<h6>Basic Details</h6>
	
            <div className='row'>
        <div xs={6} sm={6} md={6}>
          <b> Business Name:</b> <span id="business_name"></span>
                
                
                 
                 
                 
             <br/>     
                 
                 
                 
                 <b> State:</b> <span id="state"></span>
                   <br/>     
               
        </div>
        <div xs={6} sm={6} md={6}>
          <b> Address Line 1:</b><span id="address"></span>
                
                  <br/>     
                 
                  <b> Address Line 2:</b> <span id="address1"></span>
                    <br/>     
                  
                  <b>City:</b>  <span id="city"></span>
                  
                   <br/>     
                 <b> Locality:</b>  <span id="locality"></span>
                   <br/>     
                <b>   PIN:</b>  <span id="pin"></span>
                 
				  
                 <br/>
        </div>
      </div>
	  	<hr/>
            <h6>Business Details</h6>

            <div>
        <div xs={6} sm={6} md={6}>
          <b> Year of Establishment:</b> <span id="year_of_establishment"></span>
                 <br/>
                 
                  <b>No Of Employees:</b> <span id="no_of_employees"></span>
                  <div id='no_of_employee'  ></div>
                  <b>   Business Description:</b><span id="business_description"></span>
                  <div id='business_description'  >  </div>   <br/>
        </div>
        <div xs={6} sm={6} md={6}>
         
                <b>   Catering Capacity:</b>  <span id="is_catering"></span>
				
                <br/>
                  <b>   Catering Type:</b>    <span id="catering_type"></span>
        <br/>
	   <b>   Capacity:</b>   <span id="capacity"></span>
        
                
        <br/>
        
        
        <b>Specialization Area:</b>  <span id="specialization_area"></span>
             <br/>
        
        <b> Establishment Type: </b><span id="establishment_type"></span>
             <br/>
        
        </div>
      </div>
            <hr/>
            <h6>Conatct Details</h6>
            <div>
        <div xs={12} sm={12} md={12}>
          <b> Contact Person:</b> {name}<span id="name"></span>
                  <br/> 
                 
                  <b>Mobile No:</b> {msisdn}<span id="msisdn"></span>
                  
                    <br/> 
                    <b>Alternative Mobile No:</b>  <span id="alt_msisdn"></span>
                  <br/> 
                 <b> Email Id:</b>  <span id="email_id"></span>
                    <br/> 
				   <b>   Website:</b> <span id="website"></span>
                   <br/> 
        </div>
        
      </div>
	  
	  <hr/>
            <h6>Photo Details</h6>
            <div>
        <div xs={12} sm={12} md={12}>
          <div id="photo_details">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAY1BMVEX///8AAABLS0ttbW1xcXH6+voUFBSLi4tVVVXz8/P29vYtLS3w8PCenp7c3NwzMzN8fHw4ODi+vr6tra2zs7Pp6elBQUHFxcULCwtGRkaSkpLOzs6mpqZeXl7U1NTj4+MkJCQQikThAAAC/0lEQVR4nO2aCZaqMBBFLRVkkEEUUcRh/6tsQfloq02q8iKcf3IX0H0PialxMgEQFCmdEH9IihMvEqJLPpyBH3lUkw5mkM3pTjSMQBxRx2IAAT87ug8KlHz9PvhlQr9YHb5qcJj/FmjYV/GXBPxs+9agxk3S4uyYNgiqzwZ3j2Nk9mpUux6DG97GmEERKhnUhIUZhVLZoGZh4F44KUuBaI6XODIVrrcCLcH9Cs2XwCocBApE0IvpvDzNSoTI06hECkQVTsHxhA7AaxmrPY+v7HBRbCNUIMI92guxAy69ep8vqDCDOcysg3WwDi+M4bdpHf4HB1w6Zx2sg3WwDmN24NfcLUeUQiAtcYhcUKFViA1qILW339eJ+5utD3BYrrQcVkuAQyAtum94AcBB1AbqwAw2pA2QG5g2yEnLAdPOD7QcED+LK+ot4ldCjIJGuMAFjKj/X30ENWvLNBwykEMuj1m7M8hh4vb/sw+4KIVR1Hry6I3rmotDJyRo3pGGLeQkXhoykEsRS6ED8CikwwPsREvWNccuJKxFDmuog+xCIK/Dlb1AYY9VEI1y0JN3h1/pbOHDZv6HMLCAwG2c40Jmh8/LIlxQQv0M7zQMrYJwPgQugRqdg8Nx2JlZUTozFIhgCfUTvETGzE4nr9RBFTfP8OI3Nm638HohwBWQB3i5lJmlTl61BV5MusPbDUpMKHC7EPgt3zO/IRSinylJgeFhFWKBAhF2v5a3O9lSIhUcSWoPzmplR4E9DNlRYA9jKnSYwgxijZka5jRyzfmF/sa3pgHAIi/l7dEOt5RbONEFYFBziYQvxRpl0FgIcjsnQ5zCI27G/BaF3kDxPR6nc3wyYdBYqFYdB/mT1M9RZc4Xy5cE1Zj1PZ15Kp/ZqLL789EKpPGRS/lpCO5/y6CxeNcqCtY6o1Q+4frlW2z0Ni0kbJ9bVpnenoWUVdcgCKRpkj7T9kDkK/36tOX5cJ+hyzitg3WwDtbBOozfwVQmr0Lbu9PZwdLlXyd1ga7rVHGb0P0DKEk0enzIjW4AAAAASUVORK5CYII=" height='200px' width="200px"  ></img>
          </div>
        </div>
        
      </div>
	  
  
   
        </main>
        <footer className="modal__footer">
        
          <button className="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
        </footer>
      </div>
    </div>
  </div>
	
	
	
	
	
	

            
            
                    
                    </div>;
  }
 

}


 



import React, { useEffect, useState } from "react";
import url from "../../views/config";
import axios from "axios";
import { useForm } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Filter from "../../components/Filter";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import DataTable from "react-data-table-component";
import moment from "moment";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import $ from 'jquery'; 




export default function RoleAccessebility() {
  const [oldAmount, setOldAmount] = useState(0);
  const [supplierSelect, setSupplierSelect] = useState({});
  const [eedit, setEedit] = useState(); /// to store in id in setvalue
  const [key, setKey] = useState(1); //tabs
  const [get, setGet] = useState([]);
  const [cGet, setCGet] = useState([]);
  const [select, setSelect] = useState({});
  const [open, setOpen] = useState(false); // transport view
  const editClose = () => setOpen(false);
  const [api, setApi] = useState([]);
  const editOpen = () => {
    setOpen(true);
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "aliceblue",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [
    {
      name: "SL NO",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "User Id",
      selector: (row) => row.msisdn,
    },
    {
      name: " Status",
      selector: (row) => row.status,
    },
  

    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              editOpen();
              // setIsEdit(true);
              displayEdit(row);
              setSupplierSelect(row);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
             window.location.href="/Accessebility"
            }}
          >
           Accessebility
          </button>
        </>
      ),
    },
  ];

  const {
    register: register2,
    setValue: setValue2,
    reset,
    watch,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const values = watch();

  const displayEdit = (display) => {
    setEedit(display.id);
    setValue2("name", display.name);
   
    setValue2("msisdn", display.msisdn);
    setValue2("password", "");
 
    
  };

  useEffect(() => {
    $.ajax({
      url:url.server_url+"/get_hierarchy",
     
      data:{user_id:1},
      dataType:"json",
      type:"POST",
    
      success:function(data){
        if(data.status_code=="200"){
          var data=data.data
           
          //  $(".update").removeAttr("disabled")
             //this_var.prop('checked', true);
             var html="<option value=''>--Select--</option>"
             for(var i=0;i<data.length;i++){
html=html+`<option value="${data[i].name}">${data[i].name}</option>`;
             }
$("#hierarchy").html(html)

        }


      },error:function(data){
        alert(data.responseText)
      }



    })
    var current_hierarchy="";
$("body").on("change","#hierarchy",function(){
   current_hierarchy=$(this).val()
  $.ajax({
    url:url.server_url+"/get_reporting_to",
   
    data:{current_hierarchy:current_hierarchy},
    dataType:"json",
    type:"POST",
  
    success:function(data){
      if(data.status_code=="200")
      try{
        var data=data.data;
        $("#reporting_to").html(data[0].name);

      }catch(e){
        $("#reporting_to").html("None");
      }
        

        var jqxhr = $.ajax({
      type: "POST",
      url:url.server_url+"/get_list_of_menus_hierarchy",
      data: {hierarchy:current_hierarchy},
     dataType:"html",
      //cache: false,
      async: false,
     
    });
    let m=(jqxhr.responseText);
    $("#user_data").html(m)
    }
       


    ,error:function(data){
      alert(data.responseText)
    }



  })
})
    


    // var id = window.location.href.split("/").pop()
    // var jqxhr = $.ajax({
    //   type: "POST",
    //   url:url.server_url+"/get_list_of_menus",
    //   data: {user_id:id},
    //  dataType:"html",
    //   //cache: false,
    //   async: false,
     
    // });
    // let m=(jqxhr.responseText);
    // $("#user_data").html(m)
    getAPI(apinames.GET_USERS)
      .then((response) => {
        console.log(response.data, "customer payments");
        let reversedData = response.data.slice().reverse();
        setCGet(reversedData); // to reverse data
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });



      $("body").on("click",".update_sub_role",function(){
        if(window.confirm("Are you sure?")){
        var sub_id=$(this).val()
        var parent_id=$(this).attr("parent_value")
        var hierarchy=current_hierarchy;
        var this_var=$(this);
        var display="0"
        if($(this).prop("checked")){
          display=1
    
        }
    
    
        $(".update_role").attr("disabled",true)
       
         $.ajax({
          url:url.server_url+"/update_user_accessibility_sub_hierarchy",
         
          data:{hierarchy:hierarchy,sub_id:sub_id,display:display,parent_id:parent_id},
          dataType:"json",
          type:"POST",
        
          success:function(data){
            if(data.status_code=="200"){
               
                $(".update").removeAttr("disabled")
                 //this_var.prop('checked', true);
    
    
            }
    
    
          },error:function(data){
             $(".update").removeAttr("disabled")
          }
    
    
    
        })
       }
      })
    
    
    $("body").on("click",".update_role",function(){
        if(window.confirm("Are you sure?")){
        var sub_id=$(this).val()
        var parent_id=0
        var user_id=current_hierarchy;
        var this_var=$(this);
        var display="0"
        if($(this).prop("checked")){
          display=1
    
        }
    
    
        $(".update").attr("disabled",true)
       
         $.ajax({
          url:url.server_url+"/update_user_accessibility_hierarchy",
         
          data:{hierarchy:user_id,id:sub_id,display:display,sub_id:0},
          dataType:"json",
          type:"POST",
        
          success:function(data){
            if(data.status_code=="200"){
               
                $(".update").removeAttr("disabled")
                 //this_var.prop('checked', true);
    
    
            }
    
    
          },error:function(data){
             $(".update").removeAttr("disabled")
          }
    
    
    
        })
       }
      })
  }, []);

  //-----------------Filter
  const HandleFilter = (filteredData) => {
    setCGet(filteredData);
  };

  const onSubmit2 = (data) => {
   
    let editData = {
      id: eedit,
      name: data.name,
      mobile: data.mobile,
      password: data.password,
    };

    postAPI(apinames.UPDATE_USERS, editData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert(response.data);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let postData = {
      type: 2,
      id: data.id,
      name: data.name,
      mobile: data.mobile,
      password: data.password,
     
    };
    console.log(postData, "postData");

    postAPI(apinames.POST_USER, postData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert("posting sucessfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };
  // delete button to delete data
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        postAPI(apinames.DELETE_SUPPLIER_PAYMENTS,{id:id}) .then((response) => {
          let status_code = response.status_code;
  
          if (status_code == 200) {
            alert("Successful");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error + "error");
        });;
        
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  return (
    <Tabs
      defaultActiveKey={1}
      id="uncontrolled-tab-example"
      activeKey={key}
      onSelect={(e) => {
        console.log(e, "dsdsdsd");
        setKey(e);
      }}
    >
      {" "}
      <Tab eventKey={1} title="Accessebility">
      
       <h4>Role :</h4>
       <select id="hierarchy" >


       </select>
       <h4>Reporting To:</h4>
       <div id="reporting_to"></div>
      
       <div id="user_data"></div>
      </Tab>
      
    </Tabs>
    
  );
}


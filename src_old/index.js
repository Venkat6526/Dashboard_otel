import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Link } from "react-router-dom";
import $ from 'jquery'; 
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import url from "./assets/config.js";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const hist = createBrowserHistory();
class Login extends React.Component {
  componentDidMount() {
    var  msisdn="";var pwd="";var uid="";var name="";var role=""
    ;var created_by="";
    document.querySelector("#login").addEventListener("click", function (e) {
      e.preventDefault();
       uid = document.querySelector("#uname").value;
       pwd = document.querySelector("#pwd").value;

      var postData = { uid: uid, pwd: pwd };
      console.log(postData, "login_response");

      // alert(url);
      const rawResponse = fetch(url.server_url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          try {
            if (data.error.length != 0) {
              alert(data.error);
              return;
            }
          } catch (e) {}
          var auth_token = data.auth_token;
       
          $("#data_div").html("");
          $("login_div").html("");
          var html=`<div id="contactdiv" style="display: block;width:100%">
			<div class="form-group">
				<select name="msisdn" id="msisdn" class="form-control" required="">
					<option value="">Select Contact number</option>
					<option value="9902128649">99XXXXXX49</option>
					<option value="7829652092">78XXXXXX92</option>
					<option value="8660102627">86XXXXXX27</option>
                    
				</select>
				
				<br>
				<input type="otp" class="form-control" id="otp" placeholder="Enter OTP">
			</div>
			<button type="submit" class="btn btn-primary" id="sendotp" style="display: block;">Get OTP</button>
		</div>`;

$("#data_div").html(html);


          // Store

          // localStorage.setItem("ootel_admin_auth_token", auth_token);
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    });
$("body").on("click","#sendotp",function(e){
  e.preventDefault();
  //alert(url.otp_url)
  var msisdn=$("#msisdn").val()
  if(msisdn==""){
    alert("Select Mobile number");return false;
  }
  var postData = { uname: uid, pwd: pwd,msisdn:msisdn };
  var formdata=new FormData();
  formdata.append("uname",uid)
  formdata.append("pwd",pwd)
  formdata.append("msisdn",msisdn)
  $.ajax({
   
    url:url.otp_url + "/sendsms.php",
    data:formdata,
    type:"POST",
    dataType:"JSON",crossDomain: true,
    processData: false,
    contentType: false,
    success:function(data){
      alert("OTP Sent!")
      $("#sendotp").hide()
      $("#login_div").html("<button class='btn btn-primary' id='login_otp'>Login</button>");
    },
    error:function(xhr){
      alert(JSON.stringify(xhr))
    }

  })
  // const rawResponse = fetch(url.otp_url + "/sendsms.php", {
  //   method: "POST",
  //   // headers: {
  //   //   "Content-Type": "application/json",
  //   // },
  //   body: JSON.stringify(postData),
  // })
  //  // .then((res) => res.text())
  //   .then((data) => {
  //     alert(1)
  //     $("login_div").html("<button class='btn btn-primary' id='login_otp'>Login</button>");
  //   })
  //   .catch((err) => {
  //     console.error("Error: ", err);
  //   });
})

$("body").on("click","#login_otp",function(e){
  e.preventDefault();
  var otp=$("#otp").val()
  if(otp==""){
    alert("Entr OTP");return false;
  }
  var postData = { uname: uid, pwd: pwd,otp:otp };
  const rawResponse = fetch(url.server_url + "/login_otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((data) => {
      
      if (data.status_code== 500) {
        alert(data.data);
        return;
      }
      msisdn = data.msisdn;
      name = data.name;
      role = data.role;
      created_by = data.id;
     var payment_status = data.payment_status;
     localStorage.setItem("ootel_admin_msisdn", msisdn);
     localStorage.setItem("ootel_admin_name", name);
     localStorage.setItem("ootel_admin_role", role);
     localStorage.setItem("ootel_admin_created_by", created_by);
      axios
      .get(url.server_url + "/get_api_token")
      .then((data) => {
        // sessionStorage.setItem("myToken", data.data.token);
        localStorage.setItem("ootel_admin_auth_token", data.data.token);
       
          var port_url =
            window.location.hostname +
            ":" +
            window.location.port +
            "/dashboard";

          window.location.href="#/dashboard";
          window.location.reload()
        
      })
      .catch((error) => {
        console.log(error);
      });
      
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
})
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="uname"
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="pwd"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                     
                      <div id="data_div">

                     
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" id="login">
                            Login
                          </Button>
                        </Col>
                      </Row>
                      </div> <div id="login_div"></div>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
var auth_token = localStorage.getItem("ootel_admin_auth_token");

console.log(auth_token, "qeawrstdgyuihj");

if (auth_token) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Login} />
        return <Redirect to="/ja" />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

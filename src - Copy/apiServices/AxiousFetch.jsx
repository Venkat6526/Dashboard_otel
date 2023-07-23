import url from "../assets/config.js";
import axios from "axios";

//-------------POST
export async function postAPI(endpoint, data) {
  const token = localStorage.getItem("ootel_admin_auth_token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: ` ${token}`,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(url.server_url + endpoint, data, config);
    console.log(response,'qwert');
    return response.data;
  } catch (e) {
    console.log(e,'error_new');
  }
}




export async function postFormDataAPI(endpoint, data) {
  const token = localStorage.getItem("ootel_admin_auth_token");

  const config = {
    headers: {
      "Content-Type": "mutlipart/form-data",
      "accept":"application/json",
      // Authorization: ` ${token}`,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(url.server_url + endpoint, data, config);
    return response.data;
  } catch (e) {
    console.log(e,'error_new');
  }
}

// -----------PUT METHOD
export async function PutAPI(endpoint, data) {
  const token = localStorage.getItem("ootel_admin_auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      // Authorization: ` ${token}`,
    },
  };
  console.log(url.server_url + endpoint,'qweqweqweqw');
  try {
    const response = await axios.put(url.server_url + endpoint, data, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}




export async function putFormDataAPI(endpoint, data) {
  const token = localStorage.getItem("ootel_admin_auth_token");

  const config = {
    headers: {
      "Content-Type": "mutlipart/form-data",
      // Authorization: ` ${token}`,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(url.server_url + endpoint, data, config);
    return response.data;
  } catch (e) {
    console.log(e,'error_new');
  }
}






//------------DELETE METHOD

export async function deleteAPI(endpoint) {

  const token = localStorage.getItem("ootel_admin_auth_token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(
      url.server_url + endpoint,
   
    config
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//---------------------GET METHOD
export async function getAPI(endpoint) {
  const token = localStorage.getItem("ootel_admin_auth_token");

  console.log(token, "retrieve token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: ` ${token}`,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(url.server_url + endpoint, config);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
//=======================post mail only

export async function postMailAPI(endpoint, data) {
  const token = localStorage.getItem("ootel_admin_auth_token");

  const config = {
    headers: {
      "Content-Type": "mutlipart/form-data",
      "accept":"application/json",
      // Authorization: ` ${token}`,
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(url.mail_url + endpoint, data, config);
    return response.data;
  } catch (e) {
    console.log(e,'error_new');
  }
}
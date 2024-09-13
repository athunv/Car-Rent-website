import commonApi from "./commonApi";
import  commonApi2  from "./commonApi2";
import axios from "axios";



const getAuthHeader = () => {
    return {
        'Authorization': `Token ${sessionStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    };
};
const getAuthHeader1 = () => {
    return {
        'Authorization': `Token ${sessionStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data' 
    };
};




export const addMessage=(data)=>{
    const headers = getAuthHeader();
    return commonApi("POST","http://127.0.0.1:8000/contactmessageview/",data,headers)
}

export const viewMessages = () => {
    const headers = getAuthHeader();
    return commonApi('GET', 'http://127.0.0.1:8000/contactmessageview/',"",headers);
};

export const deleteMessage = (id) => {
    const headers = getAuthHeader();
    return commonApi('DELETE', `http://127.0.0.1:8000/adminmessageview/${id}/`,null,headers);
  };

export const addCar = (header, data) => {
    return commonApi2("POST", "http://127.0.0.1:8000/carview/", data, header);
};


export const viewCars = async () => {
    const headers = getAuthHeader();
    return axios.get('http://127.0.0.1:8000/admincarview/', { headers });
};


export const updateCar = (id, data) => {
    const headers = getAuthHeader1(); 
    return commonApi2('PUT', `http://127.0.0.1:8000/admincarview/${id}/update_car/`, data, headers);
};


export const deleteCar = (id) => {
    const headers = getAuthHeader();
    return axios.delete(`http://127.0.0.1:8000/carview/${id}/`, { headers });
};


export const orderCar = (carId, orderData) => {
    const headers = getAuthHeader();
    return commonApi('POST', `http://127.0.0.1:8000/carview/${carId}/add_order/`, orderData,headers); 
};

export const orderList = ( orderData) => {
    const headers = getAuthHeader();
    return commonApi('GET', `http://127.0.0.1:8000/orderview/`, orderData,headers);
};
  
export const userRegister=(data)=>{
    return commonApi('POST','http://127.0.0.1:8000/user/',data)
}

export const tokenGenerate=(data)=>{
    return commonApi('POST',"http://127.0.0.1:8000/apitoken",data)
}


export const userViewCars = async () => {
    const headers = getAuthHeader1();
    return axios.get('http://127.0.0.1:8000/carview/', { headers });
    };
    

export const getUsers = ( userData) => {
    const headers = getAuthHeader();
    return commonApi('GET', `http://127.0.0.1:8000/userlist/`, userData,headers);
};


export const deleteUser = (id) => {
    const headers = getAuthHeader();
    return commonApi('DELETE', `http://127.0.0.1:8000/userlist/${id}/`, null, headers);
};


export const customerorderList = () => {
    const headers = getAuthHeader();
    return commonApi('GET', `http://127.0.0.1:8000/customerorder/`, null, headers);
};

export const cancelOrder=(orderId)=> {
    const headers = getAuthHeader();
    return  commonApi('DELETE',`http://127.0.0.1:8000/customerorder/${orderId}/`,null,headers)
}


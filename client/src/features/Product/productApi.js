import axios from "axios";

export function fetchAllProducts(){
    return new Promise(async (resolve,reject) => {
        try {
            const response = await axios.get('/product/getproducts');
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}

export function fetchAllVendors(){
    return new Promise(async (resolve,reject) => {
        try {
            const response = await axios.get('/product/vendors');
            const data = await response.data;
            resolve({data});
        } catch (error) {
            reject({error});
        }
    })
}




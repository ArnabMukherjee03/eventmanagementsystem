import axios from "axios";

export function fetchAllProducts(id){
    return new Promise(async (resolve,reject) => {
        try {
            const response = await axios.get(`/product/getproducts/${id}`);
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

export function updateProduct(update) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.patch(`/cart/${update.id}`, update);
        const data = await response.data;
        resolve({ data });
      } catch (error) {
        reject(error);
      }
    });
  }
  




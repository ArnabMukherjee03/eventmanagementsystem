import axios from "axios";

export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/cart/addtocart", item);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/cart/fetchcartitems");
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateCart(update) {
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

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/cart/${itemId}`);
      resolve({ data: { id: itemId } });
    } catch (error) {
      reject(error);
    }
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item._id);
    }
    resolve({ status: "success" });
  });
}

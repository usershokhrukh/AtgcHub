// const button = document.querySelector(".button");
// try {
//   const postApi = "http://127.0.0.1:8000/";
//   let elText = document.querySelector("p");
//   async function getData() {
//     const dataRequest = await axios.post(postApi);
//     return dataRequest;
//   }

//   function getResult() {
//     elText = document.querySelector("p");
//     const dataResult = getData()
//       .then((response) => changeData(response.data.newNumber))
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   getResult();
//   button.addEventListener("click", () => getResult())

//   function changeData(response) {
//     elText.textContent = `${response}`;
//   }
// } catch (error) {
//   throw new Error(error);
// }

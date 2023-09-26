const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));

API.get(`articles/${id}`).then((res) =>{
    const detail = res.data.data;

    console.log(detail);
})
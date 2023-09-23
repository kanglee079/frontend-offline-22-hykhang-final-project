
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;
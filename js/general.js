const API = axios.create({
    baseURL: "https://apiforlearning.zendvn.com/api/v2/",
  });
  
  dayjs.extend(window.dayjs_plugin_relativeTime)
  dayjs.locale('vi')


const ACCESS_TOKEN = 'ACCESS_TOKEN';
const token = localStorage.getItem(ACCESS_TOKEN);
const elTitleSite = document.getElementById("titleSite");
let ogTitle = document.querySelector('meta[property="og:title"]');
const elLoadingPage = document.getElementById("loadingPage");
const elSearchInput = document.getElementById("searchInput1");

elSearchInput.addEventListener("keyup", function(e){
    if (e.key === 'Enter') {
        const keyword = elSearchInput.value.trim();

        if (keyword) {
            window.location.href = `search.html?keyword=${keyword}`;
        }else{
            alert('Vui lòng nhập từ khoá cần tìm');
            elSearchInput.value = '';
        }
    }
});




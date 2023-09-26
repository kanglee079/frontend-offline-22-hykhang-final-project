const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;
renderCategoryPage();

const elArticlesWithCategory =document.getElementById("articlesWithCategory");
const elCategoryName = document.getElementById("categoryName");
const elShowMore = document.getElementById("showMore");
const elListCategoryPop = document.getElementById("listCategoryPop");
const elTopStory = document.getElementById("topStory");

elShowMore.addEventListener("click", function(){
    currentPage++;
    renderCategoryPage(); 
})

function renderCategoryPage() {
    API.get(`categories_news/${id}/articles?limit=5&page=${currentPage}`).then((res) => {
        const articlesByCategory = res.data.data;
    
        let html = "";
        let htmlCategory ="";
        articlesByCategory.forEach(item => {
            const title = item.title;
            const thumb = item.thumb;
            const description = item.description;
            const publish_date = dayjs(item.publish_date).fromNow();
            htmlCategory =/*html */ `
                <div class="meta">
                <a href="#" class="prev">ECHO /</a>
                <a href="#" class="next">Danh Mục</a>
                </div>
                <h1 class="title">${item.category.name}</h1>
            `
            
            html += /*html */ `
                <div class="echo-hero-baner">
                <div class="echo-inner-img-ct-1  img-transition-scale">
                    <a href="post-details.html?id=${item.id}"><img src="${thumb}" class="echo-ct-style-1-banner-images" alt="${title}"></a>
                </div>
                <div class="echo-hero-baner-text-heading-info-ct-1">
                    <h2 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html?id=${item.id}" class="title-hover">${title}</a></h2>
                    <div class="echo-hero-area-titlepost-post-like-comment-share">
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-clock"></i> ${publish_date}</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k Share</a>
                        </div>
                    </div>
                    <hr>
                    <p class="echo-hero-discription">${description}</p>
                </div>
                </div>
            `
        });
    
        elArticlesWithCategory.innerHTML += /*html */`${html}`;
        elCategoryName.innerHTML = htmlCategory;
    
    })
}

API.get(`categories_news`).then((res) => {
    const categories = res.data.data;
  
    let html = "";
    categories.forEach((item, index) => {
      
    if (index > 4 && index < 10) {
        html += /*html*/ `
            <li>
                <a href="category.html?id=${item.id}">
                    <h5>${item.name}</h5>
                </a>
            </li>
        `;
    }
  
    elListCategoryPop.innerHTML = html;
  });
})

API.get('articles?limit=5&page=1').then((res) =>{
    const articles = res.data.data;

    let html = "";
    articles.forEach(item => {
        const thumb = item.thumb;
        const title = item.title;
        const publish_date = dayjs(item.publish_date).fromNow();
        html += /*html */ `
        <div class="echo-top-story">
            <div class="echo-story-picture img-transition-scale">
            <a href="post-details.html?id=${item.id}"
                ><img
                    src="${thumb}"
                    alt="${title}"
                class="img-hover"
            /></a>
            </div>
            <div class="echo-story-text">
            <h4>
                <a href="post-details.html?id=${item.id}" class="title-hover"
                >${title}</a
                >
            </h4>
            <a href="#" class="pe-none"
                ><i class="fa-light fa-clock"></i> ${publish_date}</a
            >
            </div>
        </div>
        `
    });

    elTopStory.innerHTML = /*html */`
        <div>
            <h5 class="text-center">Top Story</h5>
            ${html}
        </div>
    `;
})


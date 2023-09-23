const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;

const elArticlesWithCategory =document.getElementById("articlesWithCategory");
const elCategoryName = document.getElementById("categoryName");
const elShowMore = document.getElementById("showMore");

API.get(`categories_news/${id}/articles?limit=10&page=2`).then((res) => {
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
                <a href="post-details.html"><img src="${thumb}" class="echo-ct-style-1-banner-images" alt="${title}"></a>
            </div>
            <div class="echo-hero-baner-text-heading-info-ct-1">
                <h2 class="echo-hero-title text-capitalize font-weight-bold"><a href="post-details.html" class="title-hover">${title}</a></h2>
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

    elArticlesWithCategory.innerHTML = html;
    elCategoryName.innerHTML = htmlCategory;

})
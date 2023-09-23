const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;

console.log(id);

const elArticlesWithCategory =document.getElementById("articlesWithCategory");

API.get("categories_news/1/articles?limit=10&page=2").then((res) => {
    const articlesByCategory = res.data.data;

    html = "";
    articlesByCategory.forEach(item => {
        const title = item.title;
        const thumb = item.thumb;
        const description = item.description;
        const publish_date = dayjs(item.publish_date).fromNow();


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

})
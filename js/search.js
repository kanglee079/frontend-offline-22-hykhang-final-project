const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get("keyword");
let currentPage = parseInt(urlParams.get("page"));
if (isNaN(currentPage)) currentPage = 1;
renderCategoryPage(currentPage);

const elArticlesWithCategory =document.getElementById("articlesWithCategory");
const elCategoryName = document.getElementById("categoryName");
const elListCategoryPop = document.getElementById("listCategoryPop");
const elTopStory = document.getElementById("topStory");
const elMyPagination = document.getElementById("myPagination");

elMyPagination.addEventListener("click", function(e){
    const el = e.target;
    if (el.classList.contains('page-link')) {
        if (el.innerText === "Previous" && currentPage > 1) {
            currentPage--;
        } else if (el.innerText === "Next" && currentPage < elMyPagination.children.length - 2) { // subtracting 2 for Previous and Next buttons
            currentPage++;
        } else {
            currentPage = parseInt(el.innerText);
        }
        renderCategoryPage(currentPage);
    }
})

function renderPagination(total) {
    let html = '<li class="page-item"><a class="page-link">Previous</a></li>';

    let startPage = Math.max(1, currentPage - 5);
    let endPage = Math.min(total, currentPage + 5);

    for (let index = startPage; index <= endPage; index++) {
        if (index === currentPage) {
            html += `<li class="page-item active"><a class="page-link" href="#">${index}</a></li>`;
        } else {
            html += `<li class="page-item"><a class="page-link" href="#">${index}</a></li>`;
        }
    }

    html += '<li class="page-item"><a class="page-link">Next</a></li>';

    elMyPagination.innerHTML = html;  

    if (currentPage === 1) {
        elMyPagination.querySelector('li:first-child').classList.add('disabled');
    }

    if (currentPage === total) {
        elMyPagination.querySelector('li:last-child').classList.add('disabled');
    }
}

function renderCategoryPage(page = 1) {
    API.get(`articles/search?q=${keyword}&limit=5&page=${page}`).then((res) => {
        const articlesByCategory = res.data.data;
        const totalPages = res.data.meta.last_page;
        const total = res.data.meta.total;

        let html = "";
        let titleSite ="";
        articlesByCategory.forEach(item => {
            const regex = new RegExp(keyword, 'gi');
            const title = item.title.replace(regex, (match) => `<mark>${match}</mark>`);
            const thumb = item.thumb;
            const description = item.description.replace(regex, (match) => `<mark>${match}</mark>`);
            const publish_date = dayjs(item.publish_date).fromNow();
            
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
            titleSite = "Echo News - " + item.category.name;

        });

        elTitleSite.innerText = titleSite;
        elArticlesWithCategory.innerHTML = /*html */`${html}`;
        elCategoryName.innerHTML = `Tìm thấy ${total} bài viết với từ khoá "${keyword}"`;
        renderPagination(totalPages);
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

    elLoadingPage.remove();
})


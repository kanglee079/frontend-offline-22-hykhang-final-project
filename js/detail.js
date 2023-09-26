const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));

const elTitleDetail = document.getElementById("titleDetail");
const elimageDetail = document.getElementById("imageDetail");
const elDescDetail = document.getElementById("descDetail");
const elPublishDate = document.getElementById("publish_date");
const elContentDetail = document.getElementById("contentDetail");
const elAuthorName = document.getElementById("authorName");
const elListCategoryPop = document.getElementById("listCategoryPop");
const elTopStory = document.getElementById("topStory");
const elMaybeYouWant = document.getElementById("maybeYouWant");
const elRouteDetail = document.getElementById("routeDetail");


API.get(`articles/${id}`).then((res) =>{
    const detail = res.data.data;

    elTitleDetail.innerText = detail.title;
    elimageDetail.src = detail.thumb;
    elDescDetail.innerText = detail.description;
    elPublishDate.innerText = detail.publish_date;
    elContentDetail.innerHTML = detail.content;
    elAuthorName.innerText = detail.author;
    elRouteDetail.innerHTML = /*html*/ `
        <a href="#" class="prev">ECHO /</a>
        <a href="category.html?id=${detail.category.id}" class="prev">${detail.category.name} /</a>
        <a href="#" class="next">Bài viết</a>
    `
    
})

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

API.get(`articles/popular?limit=2`).then((res) => {
    const articles = res.data.data;
  
    let html = "";
    articles.forEach((item) => {
        html += /*html*/ `
            <div class="col-lg-6">
                <div class="echo-top-story">
                    <div class="echo-story-text">
                        <h6><a href="post-details.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
                        <a href="#" class="pe-none"><i class="fa-light fa-clock"></i> ${item.publish_date}</a>
                    </div>
                </div>
            </div>
        `;
  });
  elMaybeYouWant.innerHTML = html;
})
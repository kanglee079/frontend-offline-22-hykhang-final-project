const elHeroBanner = document.getElementById("heroBanner");
const elTopStory = document.getElementById("topStory");
const elMySwiperWrapper = document.getElementById("mySwiperWrapper");
const elPostTrendingLeft = document.getElementById("postTrendingLeft");
const elPostTrendingRight = document.getElementById("postTrendingRight");
const elDicoverCategories = document.getElementById("dicoverCategories");
const elLoadingPage = document.getElementById("loadingPage");

API.get('articles?limit=5&page=1').then((res) =>{
    const articles = res.data.data;

    htmlBanner = "";
    htmlTopStory = "";
    htmlTopic = "";
    articles.forEach((item, index) => {
        const thumb = item.thumb;
        const title = item.title;
        const description = item.description;
        const publish_date = dayjs(item.publish_date).fromNow();
        console.log(item.id);

        if (index === 0) {
            htmlBanner += /*html */`
            <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="post-details.html?id=${item.id}"
              ><img
                class="banner-image-one img-hover"
                src="${thumb}"
                alt="${title}"
            /></a>
          </div>
          <h1 class="echo-hero-title text-capitalize font-weight-bold">
            <a href="post-details.html?id=${item.id}" class="title-hover"
              >${title}</a
            >
          </h1>
          <hr />
          <p class="echo-hero-discription">
            ${description}
          </p>
          <div class="echo-hero-area-titlepost-post-like-comment-share">
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"
                ><i class="fa-light fa-clock"></i> ${publish_date}</a
              >
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"
                ><i class="fa-light fa-comment-dots"></i> 05 Comment</a
              >
            </div>
            <div class="echo-hero-area-like-read-comment-share">
              <a href="#"
                ><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k
                Share</a
              >
            </div>
          </div>
            
            `
        }else if (index === 1) {
            htmlTopStory += /*html */ `
            <div class="echo-top-story first">
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
                      <div class="echo-trending-post-bottom-icons">
                        <a href="#" class="pe-none"
                          ><i class="fa-light fa-clock"></i> ${publish_date}</a
                        >
                        <a href="#" class="pe-none"
                          ><i class="fa-light fa-eye"></i> 3.5k Views</a
                        >
                      </div>
                    </div>
                  </div>
            `
        }else{
            htmlTopic += /*html */ `
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
        }
    });

    elHeroBanner.innerHTML = htmlBanner;
    elTopStory.innerHTML = htmlTopStory + htmlTopic;
    elLoadingPage.remove();
})

API.get("articles/3312/related?limit=10").then((res) =>{
    const articles = res.data.data;

    html = "";
    articles.forEach(item => {
        const thumb = item.thumb;
        const title = item.title;
        const publish_date = dayjs(item.publish_date).fromNow();

        html += /*html*/ `
        <div class="swiper-slide">
        <div class="echo-latest-news-main-content">
          <div class="echo-latest-news-img img-transition-scale">
            <a href="post-details.html?id=${item.id}">
              <img
                src="${thumb}"
                alt="${title}"
                class="img-hover"
              />
            </a>
          </div>
          <div class="echo-latest-news-single-title">
            <h5>
              <a
                href="post-details.html?id=${item.id}"
                class="text-capitalize title-hover"
                >${title}</a
              >
            </h5>
          </div>
          <div class="echo-latest-news-time-views">
            <a href="#" class="pe-none"
              ><i class="fa-light fa-clock"></i> ${publish_date}</a
            >
            <a href="#" class="pe-none"
              ><i class="fa-light fa-eye"></i> 3.5k Views</a
            >
          </div>
        </div>
      </div>
        `
    });

    elMySwiperWrapper.innerHTML = html;
})

API.get("articles/popular?limit=7").then((res) =>{
    const articles = res.data.data;

    htmlLeft = "";
    htmlRight = "";
    articles.forEach((item, index) => {
        const thumb = item.thumb;
        const title = item.title;
        const publish_date = dayjs(item.publish_date).fromNow();

        if (index < 5) {
            htmlLeft += /*html*/ `
                <div class="echo-trending-left-site-post">
                <div
                class="echo-trending-left-site-post-img img-transition-scale"
                >
                <a href="post-details.html?id=${item.id}">
                    <img
                        src="${thumb}"
                        alt="${title}"
                    class="img-hover"
                    />
                </a>
                </div>
                <div class="echo-trending-right-site-post-title">
                <h5>
                    <a
                    href="post-details.html?id=${item.id}"
                    class="text-capitalize title-hover"
                    >${title}</a
                    >
                </h5>
                <div class="echo-trending-post-bottom-icons">
                    <a href="#" class="pe-none"
                    ><i class="fa-light fa-clock"></i>${publish_date}</a
                    >
                    <a href="#" class="pe-none"
                    ><i class="fa-light fa-eye"></i> 3.5k Views</a
                    >
                </div>
                </div>
                </div>
        `
    }else{
        htmlRight += /*html*/ `
        <div class="echo-trending-right-site-post">
        <div
          class="echo-trending-right-site-post-img img-transition-scale"
        >
          <a href="post-details.html?id=${item.id}">
            <img
                src="${thumb}"
                alt="${title}"
              class="img-hover"
            />
          </a>
        </div>
        <div class="echo-trending-right-site-post-title">
          <h4 class="text-capitalize">
            <a href="post-details.html?id=${item.id}" class="title-hover"
              >${title}</a
            >
          </h4>
        </div>
        <div
          class="echo-trending-right-site-like-comment-share-icons"
        >
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"
              ><i class="fa-light fa-clock"></i> ${publish_date}</a
            >
          </div>
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"
              ><i class="fa-light fa-eye"></i> 3.5k Views</a
            >
          </div>
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"
              ><i class="fa-light fa-comment-dots"></i> 05 Comment</a
            >
          </div>
          <div class="echo-trending-right-like-comment-content">
            <a href="#" class="pe-none"
              ><i class="fa-light fa-arrow-up-from-bracket"></i> 1.5k
              Share</a
            >
          </div>
        </div>
      </div>
      <hr class="echo-hr-home-1-tranding" />
        `

    }
        
    });

    elPostTrendingLeft.innerHTML = htmlLeft;
    elPostTrendingRight.innerHTML = htmlRight;

})

API.get("categories_news/articles?limit_cate=3&limit=3").then((res) => {
    const categoriesWithArticle = res.data.data;

    let htmlAllCategories = "";
    categoriesWithArticle.forEach(item => {
        const category = item.name;

        let htmlArticles = "";
        item.articles.forEach(article => {
            const articleTitle = article.title;
            const articleThumb = article.thumb;
            const publish_date = dayjs(article.publish_date).fromNow();

            htmlArticles += /*html */ `
            <div class="echo-de-category-content-img-title">
            <div
              class="echo-de-category-content-img img-transition-scale"
            >
              <a href="post-details.html?id=${article.id}">
                <img
                  src="${articleThumb}"
                  alt="${articleTitle}"
                  class="img-hover"
                />
              </a>
            </div>
            <div class="echo-de-category-content-title">
              <h6>
                <a href="post-details.html?id=${article.id}" class="title-hover"
                  >${articleTitle}</a
                >
              </h6>
              <div class="echo-de-category-read">
                <a href="#" class="pe-none"
                  ><i class="fa-light fa-clock"></i> ${publish_date}</a
                >
              </div>
            </div>
          </div>
            `;
        });

        htmlAllCategories += /*html */ `
            <div class="col-xl-4 col-lg-4 col-md-6">
                <div class="echo-de-category-content echo-responsive-wd">
                    <h5 class="text-capitalize">${category}</h5>
                    <hr />
                    ${htmlArticles}
                    <div class="echo-de-category-show-more-btn-edit">
                        <p class="text-capitalize echo-py-btn">
                          <a href="category.html">Show More</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    });

    elDicoverCategories.innerHTML = htmlAllCategories;
});


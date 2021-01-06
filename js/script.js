"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optTitleTagSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size";

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  /* DONE remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
    /* DONE add class 'active' to the clicked link */
  }
  clickedElement.classList.add("active");
  /* DONE remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".post");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* DONE get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  /* DONE find the correct article using the selector (value of 'href' attribute) */
  const currentArticle = document.querySelector(articleSelector);
  /* DONE add class 'active' to the correct article */
  currentArticle.classList.add("active");
};

// }
function generateTitleLinks(customSelector = " ") {
  console.log(customSelector);
  const titleList = document.querySelector(optTitleListSelector);
  /* remove contents of titleList */
  titleList.innerHTML = "";
  let html = "";
  /*DONE for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  for (let article of articles) {
    /*DONE get the article id */
    const articleId = article.getAttribute("id");
    /*DONE find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*DONE get the title from the title element */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    /*DONE  create HTML of the link */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    titleList.insertAdjacentHTML("beforeend", linkHTML);
    /*DONE  insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optTitleTagSelector);

    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";

      /* add generated code to html variable */
      html = html + linkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}
generateTags(optArticleSelector);

function tagClickHandler(event) {
  //   /* prevent default action for this event */
  event.preventDefault();
  //   /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //   /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  //   /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  //   /* find all tag links with class active */
  const activetags = document.querySelectorAll('a.active[href^="#tag-"]');
  //   /* START LOOP: for each active tag link */
  for (let activetag of activetags) {
    //     /* remove class active */
    activetag.classList.remove("active");
    //   /* END LOOP: for each active tag link */
  }
  //   /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //   /* START LOOP: for each found tag link */
  for (let foundtaglink of foundTagLinks) {
    //     /* add class active */
    foundtaglink.classList.add("active");
    //   /* END LOOP: for each found tag link */
  }
  //   /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
// }

function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkTag of linkTags) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = " ";
    // get tags from data-tags attribute //
    const tag = article.getAttribute("data-author");
    // generate html of the link //
    const linkHTML =
      '<li><a href="#tag-author' + tag + '"><span>' + tag + "</span></a></li>";
    /* add generated code to html variable */
    html = html + linkHTML;
    // End LOOP //
    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-author", "#");
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll(
    'a.active[href^="#tag-author"]'
  );
  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let foundAuthorLink of foundAuthorLinks) {
    /* add class active */
    foundAuthorLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorTags = document.querySelectorAll('a[href^="#tag-author"]');
  /* START LOOP: for each link */
  for (let authortag of authorTags) {
    /* add tagClickHandler as event listener for that link */
    authortag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

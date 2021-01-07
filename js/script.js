"use strict";

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optTitleTagSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size",
  optAuthorsListSelector = ".authors.list";

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

function calculateAuthorsParams(authors) {
  const paramsa = {
    max: 0,
    min: 999999,
  };
  for (let author in authors) {
    if (authors[author] > paramsa.max) {
      paramsa.max = authors[author];
    }
    if (authors[author] < paramsa.max) {
      paramsa.min = authors[author];
    }
  }
  return paramsa;
}
function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    tagWrapper.innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(".sidebar .tags");

  const tagsParams = calculateTagsParams(allTags);
  /* [NEW]create variable for all links HTML code */
  let allTagsHTML = "";
  /* [NEW] START LOOP: for each tag in all Tags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML =
      '<li class=" ' +
      calculateTagClass(allTags[tag], tagsParams) +
      '"><a href="#tag-' +
      tag +
      '">' +
      tag +
      "</a></li>";
    allTagsHTML += tagLinkHTML;
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

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
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  //   /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    //     /* remove class active */
    activeTag.classList.remove("active");
    //   /* END LOOP: for each active tag link */
  }
  //   /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //   /* START LOOP: for each found tag link */
  for (let foundtagLink of foundTagLinks) {
    //     /* add class active */
    foundtagLink.classList.add("active");
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
    // let html = " ";
    // get tags from data-author attribute //
    const authorTag = article.getAttribute("data-author");
    // generate html of the link //
    const authorHTML =
      '<li><a href="#tag-author' +
      authorTag +
      '"><span>' +
      authorTag +
      "</span></a></li>";
    /* add generated code to html variable */
    // html = html + authorHTML;
    // End LOOP //
    authorWrapper.innerHTML = authorHTML;
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
  const tag = href.replace("#tag-author", " ");
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
  generateTitleLinks('[data-author="' + tag + '"]');
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


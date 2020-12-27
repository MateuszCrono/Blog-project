'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    // console.log('Link was clicked!');
    /* DONE remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    /* DONE add class 'active' to the clicked link */
    activeLink.classList.add('active');
    }
    /* DONE remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* DONE get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href');
    /* DONE find the correct article using the selector (value of 'href' attribute) */
    const currentArticle = document.querySelector(href)
    /* DONE add class 'active' to the correct article */
    currentArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  /* remove contents of titleList */
    titleList.innerHTML = '';
    let html = '';
  /*DONE for each article */
  const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
    /*DONE get the article id */
    const articleId = article.getAttribute('id')
    /*DONE find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*DONE get the title from the title element */
    const linkHTML ='<li><a href="#'+ articleId +'"><span>'+articleTitle+'</span></a></li>';
    /* create HTML of the link */
    // titleList.innerHTML = titleList.innerHTML + linkHTML;
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
  
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

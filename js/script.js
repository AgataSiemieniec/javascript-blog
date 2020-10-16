{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  
    /* [DONE] remove class 'active' from all article links  */ 
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');  

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector); 
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);

  };
    
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
    
  const generateTitleLinks = function() {

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);
  
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    let html = '';

    for(let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id'); // nie wiem co tu jest nie tak 
      console.log(articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] get the title from the title element */
      console.log(articleTitle);
    
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
      /* [DONE]insert link into titleList */
      console.log(linkHTML);

      /* [DONE] insert link into html variable */
      html = html + linkHTML;
      
    }

    titleList.innerHTML = html;
    console.log(html);

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();
}
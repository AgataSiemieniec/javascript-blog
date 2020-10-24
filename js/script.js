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
    c//onsole.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    //console.log('targetArticle:', targetArticle);

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';
    optArticleAuthorSelector = '.post-author';
    optTagsListSelector = '.tags.list';
    optCloudClassCount = '5';
    optCloudClassPrefix = 'tag-size-';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    //console.log(titleList);

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(articles);
    //console.log(customSelector);
    //console.log(optArticleSelector)

    let html = '';

    for(let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] get the title from the title element */
      //console.log(articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      //console.log(linkHTML);

      /* [DONE] insert link into html variable */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  /* [DONE] Add Tags for Articles */

  function calculateTagsParams(tags) {
    const params = {max: 0, min: 999999 };


    //console.log('params', params);
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
    }
      for(let tag in tags){
        if(tags[tag] < params.min){
        params.min = tags[tag];
        }
      }
      //params.max = tags[tag] > params.max ? tags[tag] : params.max;
      //params.min = tags[tag] < params.min ? tags[tag] : params.min;

      //params.max = Math.max(tags[tag], params.max);
      //params.min = Math.min(tags[tag], params.min);

    return params;
  };


  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function (){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    /* [DONE] START LOOP: for every article: */
      for(let article of articles) {

      /* [DONE] find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        //console.log(tagsWrapper);

      /* [DONE] make html variable with empty string */
        let html = '';

      /* [DONE] get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log(articleTags);

      /* [DONE] split tags into array */
        const articleTagsArray = articleTags.split(' ');

      /* [DONE] START LOOP: for each tag */
        for(let tag of articleTagsArray){
          //console.log(tag);

        /* [DONE] generate HTML of the link */
          const tagHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
          //console.log(tagHTML);

        /* [DONE] add generated code to html variable */
          html = html + tagHTML + ' ';
          //console.log(html);

          /* [NEW] check if this link is NOT already in allTags */
          if(!allTags[tag]) {

            /* [NEW] add generated code to allTags object */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }
      /* [DONE] END LOOP: for each tag */
        }
      /* [DONE] insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
      //console.log(html);

    /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';


  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';
    console.log('tagLinkHTML:', tagLinkHTML);
    //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';

    allTagsHTML += tagLinkHTML; //tag + ' (' + allTags[tag] + ') ';

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

  };

  generateTags();

 /* function tagClickHandler(event){ */

  const tagClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('Link was clicked!');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
''
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log(tag);

    /* [DONE] find all tag links with class active */
    const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log(activeTagsLinks);
    /* [DONE] START LOOP: for each active tag link */
    for(let activeTagsLink of activeTagsLinks ){

      /* [DONE] remove class active */
      activeTagsLink.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefAttributeLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let hrefAttributeLink of hrefAttributeLinks){
      /* add class active */
      hrefAttributeLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    //console.log(generateTitleLinks);
  };



 const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    //console.log(tagLinks);

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
};

  addClickListenersToTags();

  ////////////////////////////////generateAuthors////////////////////////////////

  const generateAuthors = function(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      /* find authors wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
        /* generate HTML of the link */
      const authorHTML = 'by ' + '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
        /* add generated code to html variable */
      html = html + authorHTML;
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  };

  generateAuthors();

/* function authorClickHandler(event){ */
  const authorClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-','');
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for(let activeAuthorLink of activeAuthorLinks){;
      /* remove class active */
      activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorAttributeLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorAttributeLink of authorAttributeLinks){
      /* add class active */
      authorAttributeLink.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    //console.log(authorLinks);
    /* START LOOP: for each link */
    for(let authorLink of authorLinks){
      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();

}

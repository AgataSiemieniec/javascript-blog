{
  'use strict';
  /* dodanie skryptu Handlebars*/
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  optArticleAuthorSelector = '.post-author';
  optTagsListSelector = '.tags.list';
  optCloudClassCount = '5';
  optCloudClassPrefix = 'tag-size-';
  optAuthorsListSelector = '.author.list';

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
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = ''){
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      const linkHTML = templates.articleLink(linkHTMLData);
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
    const params = {
      max: 0,
      min: 999999
    };

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
    return params;
  };

  const calculateTagClass = function (count, params) {
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
    /* [DONE] START LOOP: for every article: */

      for(let article of articles) {
      /* [DONE] find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */
        let html = '';
      /* [DONE] get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */
        const articleTagsArray = articleTags.split(' ');
      /* [DONE] START LOOP: for each tag */

        for(let tag of articleTagsArray){
        /* [DONE] generate HTML of the link */
          //const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
          const tagHTMLData = {
            id: tag,
            title: tag
          };
          const tagHTML = templates.tagLink(tagHTMLData);
        /* [DONE] add generated code to html variable */
          html = html + tagHTML + ' ';
          /* [NEW] check if this link is NOT already in allTags */

          if(!allTags[tag]) {
            /* [NEW] add generated code to allTags object */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }
      /* [DONE] END LOOP: for each tag */

      /* [DONE] insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {
    tags: []
  };
  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"></a></li> ';
//' + tag +'('+ allTags[tag] + ')
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
        }
}
  };

  generateTags();

 /* function tagClickHandler(event){ */
  const tagClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* [DONE] find all tag links with class active */
    const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
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
  };

 const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */

    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
};

  addClickListenersToTags();

  function calculateAuthorsParams(authors) {
    const params = {
      max: 0,
      min: 999999
    };

    for(let author in authors){
      console.log(author + ' is used ' + authors[author] + ' times');

      if(authors[author] > params.max){
        params.max = authors[author];
      }
    }
      for(let author in authors){
        if(authors[author] < params.min){
        params.min = authors[author];
        }
      }

    return params;
  };

  const generateAuthors = function(){
    let allAuthors = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */

    for(let article of articles){
      /* find authors wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-authors attribute */
      const author = article.getAttribute('data-author');
        /* generate HTML of the link */
      //const authorHTML = 'by ' + '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      const authorHTMLData = {
        id: author,
        title: author
      };
      const authorHTML = templates.authorLink(authorHTMLData);
        /* add generated code to html variable */
      html = html + authorHTML;

      if(!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    const authorList = document.querySelector('.authors');
    const authorsParams = calculateAuthorsParams(allAuthors);
    //let allAuthorsHTML = '';
    const allAuthorsData = {
      authors: []
    };

    for(let author in allAuthors){
      //const authorLinkHTML ='<li><a href="#author-' + author + '">' + author + ' ('+ allAuthors[author] + ')</a></li> ';
      //allAuthorsHTML += authorLinkHTML;
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorsParams(allAuthors[author], authorsParams)
      });
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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

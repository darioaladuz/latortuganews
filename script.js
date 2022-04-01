// cambiar el ícono del menú a cruz y viceversa
const html = document.querySelector('html');
const menuBtn = document.querySelector('.btn--menu');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    // pasar el ícono de menú a una cruz
    hamburger.classList.toggle('active');
    navbar.classList.toggle('show');
})

// si hago click fuera del navbar se cierra
html.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navbar.classList.remove('show');
})

// si hago click dentro del navbar no se cierra 
navbar.addEventListener('click', (e) => {
    e.stopPropagation();
})

// artículos + slider de artículos

const articleLink = document.querySelector('.article__link');
const article = document.querySelector('.article');
const articleImg = document.querySelector('.article__img');
const articleTitle = document.querySelector('.article__details__title');
const articleDescription = document.querySelector('.article__details__description');
const previousBtn = document.querySelector('.btn--previous');
const nextBtn = document.querySelector('.btn--next');
const indexBtns = document.querySelectorAll('.btn--index');

// inicializar el índex del artículo actual
let currentIndex = 0;

let articles = [];

// pasar los artículos de articles.json a una array
const fetchArticles = async () => {
    const response = await fetch('articles.json');
    const json = await response.json();
    articles = json;
    setLatestArticles();
    console.log(articles);
}

const setLatestArticles = () => {
    articles.forEach(article => {
        if(article.type === "highlight"){
            createArticle(article);
        }
    });
}

fetchArticles();

// función para actualizar el artículo en el HTML
const setArticle = () => {
    articleLink.href = `/article.html?index=${currentIndex}`
    articleImg.src = articles[currentIndex].img;
    articleTitle.textContent = articles[currentIndex].title;
    articleDescription.textContent = articles[currentIndex].description;
}

// función para actualizar el círculo del artículo actual en el HTML
const setIndexBtn = () => {
    indexBtns.forEach(indexBtn => {
        indexBtn.classList.remove('active');
        if(Number(indexBtn.dataset.index) === currentIndex){
            indexBtn.classList.add('active');
        }
    })
}

previousBtn.addEventListener('click', () => {
    if(currentIndex === 0){
        currentIndex = 2;
    } else {
        currentIndex -= 1;
    }
    setArticle();
    setIndexBtn();
})

nextBtn.addEventListener('click', () => {
    if(currentIndex === 2){
        currentIndex = 0;
    } else {
        currentIndex += 1;
    }
    setArticle();
    setIndexBtn();
})

// lógica para actualizar los círculos del HTML al darles click, 
// y mostrar el artículo correspondiente
indexBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentIndex = Number(btn.dataset.index);
        setArticle();
        setIndexBtn();
    })
})

// generar artículos principales e insertarlos en el HTML

const createArticle = (article) => {
    // <article class="article">
    //         <a class="article__link" href="./article.html?index=0">
    //             <img class="article__img" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80">
    //         </a>
    //         <div class="article__details">
    //             <h3 class="article__details__title">Travel the World</h3>
    //             <p class="article__details__description">There's a new way to travel the World, and you'll learn all about it in this post.</p>
    //             <div class="article__controls">
    //                 <button class="btn btn--previous"><</button>
    //                 <button data-index="0" class="btn btn--index active"></button>
    //                 <button data-index="1" class="btn btn--index"></button>
    //                 <button data-index="2" class="btn btn--index"></button>
    //                 <button class="btn btn--next">></button>
    //             </div>
    //         </div>
    // </article>
    console.log(article);

    const highlightNewsSection = document.querySelector('.news--highlight');

    const newArticle = document.createElement('article');
    const newArticleLink = document.createElement('a');
    const newArticleImg = document.createElement('img');
    const newArticleDetails = document.createElement('div');
    const newArticleDetailsTitle = document.createElement('h3');
    const newArticleDetailsDescription = document.createElement('p');

    newArticle.classList.add(`article--${article.type}`);
    newArticle.classList.add(`article--${article.type}--${article.id}`)
    newArticleLink.classList.add(`article--${article.type}__link`);
    newArticleImg.classList.add(`article--${article.type}__img`);
    newArticleDetails.classList.add(`article--${article.type}__details`);
    newArticleDetailsTitle.classList.add(`article--${article.type}__details__title`);
    newArticleDetailsDescription.classList.add(`article--${article.type}__details__description`);

    newArticleLink.href = `/article.html?id=${article.id}`;
    newArticleImg.src = article.img;
    newArticleDetailsTitle.textContent = article.title;
    newArticleDetailsDescription.textContent = article.description;

    newArticleLink.appendChild(newArticleImg);

    newArticleDetails.appendChild(newArticleDetailsTitle);
    newArticleDetails.appendChild(newArticleDetailsDescription);

    newArticle.appendChild(newArticleLink);
    newArticle.appendChild(newArticleDetails);

    highlightNewsSection.appendChild(newArticle);
}

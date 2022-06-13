import createFilmsList from "./createFilmsList";
import NewApiPopularFilms from "./NewApiPopularFilms";


console.log('start');

const newApiPopularFilms = new NewApiPopularFilms();

const refs = {
    ul: document.getElementById('pagination_list'),
    filmsContainer:document.querySelector('.films__container'),
}


function renderPagination(totalPages,page) {
    let str = '';

     if (page>1) {
            
        str += `<li><button class="arrow" data-page="previous">&#8592;</button></li>`; 
        
        }

    for (let i = 1; i <= totalPages; i += 1){
    
        if (i === page) {
    str += `<li><button class="numbers active" data-page="${i}">${i}</button></li>`;
        } else {
            str += `<li><button class="numbers" data-page="${i}">${i}</button></li>`;
}
        
    }
    if  (page<totalPages){
            str += `<li><button class="arrow" data-page="next">&#8594;</button></li>`;
        }
    refs.ul.innerHTML = str;
}

renderPagination(10, 1);
refs.ul.addEventListener('click', changePage);


async function changePage(e) {
    const page = e.target.dataset.page;
    
   
    
 


   refs.filmsContainer.innerHTML = '';
  newApiPopularFilms.setPage( Number(page));
  try {
      const dates = await newApiPopularFilms.fetchFilmsCards();
      const totalPage = dates[0].total_pages;
     
      renderPagination(10, Number(page));
    const markup = createFilmsList(dates);
    refs.filmsContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.log(error.message);
  }

 

};



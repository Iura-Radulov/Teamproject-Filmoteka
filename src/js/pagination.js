import createFilmsList from "./createFilmsList";
import NewApiPopularFilms from "./NewApiPopularFilms";




const newApiPopularFilms = new NewApiPopularFilms();

const refs = {
    ul: document.getElementById('pagination_list'),
    filmsContainer:document.querySelector('.films__container'),
}
let activePage = 1;

export function renderPagination(totalPages,page) {
    let str = '';

     if (page>1) {
            
        str += `<li><button class="arrow" type='button' data-page="previous">&#8592;</button></li>`; 
        
        }
    if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i += 1){
    
        if (i === page) {
    str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
        } else {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
}
        
}
    } else {
        for (let i = 1; i <= totalPages; i += 1) {
    
            if (i === page) {
                str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
            } else if (i === 1) {
            
                if (page <= 3) {
                    str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        
                } else {
                    str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
                    str += ` <li><p class="points">&#8230;</p></li>`;
                }
            }
        
            else if (i === totalPages) {

                if (page >= totalPages - 3) {
                    str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        
                } else {
                    str += ` <li><p class="points">&#8230;</p></li>`;
                    str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
                }
            }
            else if (i > page + 2||i<page-2 ) {
            // str += ` <li><p class="points">&#8230;</p></li>`;
            
        }else { str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`; }
        
}
        
}
  
    if  (page<totalPages){
            str += `<li><button class="arrow" type='button' data-page="next">&#8594;</button></li>`;
        }
    refs.ul.innerHTML = str;
}


refs.ul.addEventListener('click', changeActivePage);


async function changePage(page) {
    
   refs.filmsContainer.innerHTML = '';
  newApiPopularFilms.setPage( page);
  try {
      const dates = await newApiPopularFilms.fetchFilmsCards();
      const totalPage = dates[0].total_pages;
     
      renderPagination(totalPage, page);
    const markup = createFilmsList(dates);
    refs.filmsContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.log(error.message);
  }

};

function changeActivePage(e) {
    if (e.target.type === 'button') {
    const dataSet = e.target.dataset.page;
    if (dataSet === 'next') {
        activePage += 1;
        changePage(activePage);
    } else if (dataSet === 'previous') {
        activePage -= 1;
        changePage(activePage);
    } else {
        activePage = Number(dataSet);
        changePage(activePage);
    }
    }
}

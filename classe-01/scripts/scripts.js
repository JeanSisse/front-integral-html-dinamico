const buscarPais = document.querySelector('.busca');
const divPaises = document.querySelector('.paises');

function criarElementoHtml(elemento, valor){
    const element = document.createElement(elemento);
    if(elemento === 'img'){
        element.src = valor;
    } else {
        element.textContent = valor;
    }
    
    return element;
}

function popularPagina(objDePais){
    const { name, capital, population, region, flag } = objDePais;
                
    const h2 = criarElementoHtml('h2', `País: ${name}`);
    const img = criarElementoHtml('img', flag);
    const span1 = criarElementoHtml('span', `Região: ${region}`);
    const span2 = criarElementoHtml('span', `Capital: ${capital}`);
    const p = criarElementoHtml('p', `População: ${population}`);

    const divPais = document.createElement('div');
    divPais.append(h2, img, span1, span2, p);
    divPais.className = 'card-paises';

    divPaises.append(divPais);
}

buscarPais.addEventListener('keydown', function(event){
    if (event.key !== 'Enter') {
        return;
    }

    const todosOsPaises = document.querySelectorAll('.paises div');

    if (buscarPais.value === ''){
        todosOsPaises.forEach(div => {
            div.classList.remove('display-none');
        });
        return;
    } else {
        todosOsPaises.forEach(div => {
            if (!div.firstChild.textContent.toLowerCase().includes(buscarPais.value.toLowerCase())){
                div.classList.add('display-none');
            } else {
                div.classList.remove('display-none');
            }
        });
        return;
    }
});

function carregarPaises(){
    const promessa = fetch('https://restcountries.eu/rest/v2/all');

    promessa.then(function (resposta){
        const corpoPromessa = resposta.json();
        corpoPromessa.then(corpo => {
            corpo.forEach(objDePais => {
                popularPagina(objDePais);
            });
        });
    });
}
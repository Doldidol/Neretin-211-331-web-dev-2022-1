const DEFAULT_URL = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api';
const API_KEY = '4db16ef1-5038-478f-92cb-72cd9675792a';

const PER_PAGE = 10;
const MAX_TEXT_SELECT_SIZE = 30;


const alertRemoveTime = 5000;
const rubleSymbol = '\u20bd';

let alertContainer = document.querySelector('.alert-container');
let tempAlert = document.querySelector('#alert-template');
let successAlert = document.querySelector('#alert-success');
let dangerAlert = document.querySelector('#alert-danger');
let tempWalkingRoutes = document.querySelector('#table-of-walking-routes');
let WalkingRoutes = document.querySelector('.table-walking-routes');
let tempGuides = document.querySelector('#table-of-guides');
let tableGuides = document.querySelector('.table-guides');
let searchField = document.querySelector('.search-field');
let paginationContainer = document.querySelector('.pagination-bar');
let landmarkSelect = document.querySelector('#landmark-select');
let buttonCreateRequest = document.querySelector('#buttonSendRequest');


function showAlert(type, text) {

    let alertItem = tempAlert.content.firstElementChild.cloneNode(true);
    let alertSetStyle = alertItem.querySelector('#alertSetStyle');
    alertSetStyle.classList.remove('alert-warning');
    alertSetStyle.classList.remove('alert-success');
    alertSetStyle.classList.remove('alert-danger');
    if (type == 'warning') {
        alertSetStyle.classList.add('alert-warning');
        alertItem.querySelector('.text-alert-item').innerHTML = text;
    }
    if (type == 'success') {
        alertSetStyle.classList.add('alert-success');
        alertItem.querySelector('.text-alert-item').innerHTML = text;
    }
    if (type == 'danger') {
        alertSetStyle.classList.add('alert-danger');
        alertItem.querySelector('.text-alert-item').innerHTML = text;

    }

    alertContainer.append(alertItem);

    setTimeout(() => alertItem.remove(), alertRemoveTime);
}


async function dataExchangeWithTheServer(method, type, params, id) {
    let error = false;
    let data = {};
    let url;
    if (method != undefined && type != undefined) {
        if (method == 'get') {
            if (type == 'routes') {
                if (id != undefined) {

                    url = new URL(`${DEFAULT_URL}/routes/${id}/guides`);
                } else {

                    url = new URL(`${DEFAULT_URL}/routes`);
                }
            };
            if (type == 'orders') {
                if (id != undefined) {

                    url = new URL(`${DEFAULT_URL}/orders/${id}`);
                } else {

                    url = new URL(`${DEFAULT_URL}/orders`);
                }
            }

            if (type == 'guide') {
                if (id != undefined) {
                    url = new URL(`${DEFAULT_URL}/guides/${id}`);
                } else {
                    error = true;
                }
            }

            if (type == 'route') {
                if (id != undefined) {
                    url = new URL(`${DEFAULT_URL}/routes/${id}`);
                } else {
                    error = true;
                }
            }
        }
        if (method == 'post' && type == 'orders') {

            url = new URL(`${DEFAULT_URL}/orders`);
        }
        if ((method == 'put' || method == 'delete')
            && type == 'orders' && id != undefined) {

            url = new URL(`${DEFAULT_URL}/orders/${id}`);
        }
    } else {
        error = true;
    }
    let bodyParams;
    if (params && Object.keys(params).length > 0) {
        bodyParams = new URLSearchParams();
        for (let i = 0; i < Object.keys(params).length; i++) {
            bodyParams.set(Object.keys(params)[i],
                params[Object.keys(params)[i]]);
        }
    }
    if (url != undefined) {
        url.searchParams.append('api_key', API_KEY);

        data = await fetch(url, {
            method: method.toUpperCase(),
            body: bodyParams,
        }).then(response => response.json()).then(answer => {
            return answer;
        });
    } else {
        error = true;
    }
    if (error) console.log("Произошла ошибка при обмене данными с сервером");
    return data;
}

function checkStartTime(concatDate) {
    let chosenHour = concatDate.getHours();
    let chosenMinute = concatDate.getMinutes();
    if (chosenMinute % 30 != 0) {
        if (chosenMinute > 30) {
            chosenMinute = '00';
            chosenHour += 1;
        } else {
            chosenMinute = '30';
        }
    }
    if (chosenHour < 9) {
        chosenHour = '09';
        chosenMinute = '00';
        return `${chosenHour}:${chosenMinute}`;
    }
    if (chosenHour + Number(duration.value) > 23) {
        chosenHour = `${23 - Number(duration.value)}`;
        chosenMinute = '00';
    }
    if (chosenMinute == 0) chosenMinute = '00';
    if (chosenHour < 10) chosenHour = `0${chosenHour}`;
    return `${chosenHour}:${chosenMinute}`;
}

function getCurrentDate() {

    let timeNow = new Date();
    let yearNow = `${timeNow.getFullYear()}`;
    let monthNow = timeNow.getMonth() + 1 >= 10 ? `${timeNow.getMonth()}` :
        `0${timeNow.getMonth() + 1}`;
    let dayNow = timeNow.getDate() + 1 >= 10 ? `${timeNow.getDate() + 1}` :
        `0${timeNow.getDate() + 1}`;
    return yearNow + "-" + monthNow + "-" + dayNow;
}


async function buttonChooseGuideHandler(event) {

    let guideId = event.target.closest('.row').dataset.idGuide;

    let dataGuide = await dataExchangeWithTheServer('get',
        'guide', {}, guideId);

    let dataRoute = await dataExchangeWithTheServer('get',
        'route', {}, dataGuide.route_id);

    let modalWindow = document.querySelector("#createRequest");

    modalWindow.querySelector('form').reset();

    let formInputs = modalWindow.querySelector("form").elements;

    let fio = formInputs['fio-guide'];
    let idGuide = formInputs['idGuide'];
    let priceGuide = formInputs['priceGuide'];
    let routeName = formInputs['route-name'];
    let idRoute = formInputs['idRoute'];
    let excursionDate = formInputs['excursion-date'];
    let option1Name = modalWindow.querySelector('#createRequest \
        .option-1 .form-check-label');
    let option1Desc = modalWindow.querySelector('#createRequest \
        .option-1 .description');
    let option1amount = formInputs['discount-amount-1'];
    let option2Name = modalWindow.querySelector('#createRequest \
        .option-2 .form-check-label');
    let option2Desc = modalWindow.querySelector('#createRequest \
        .option-2 .description');
    let option2amount = formInputs['discount-amount-2'];

    fio.value = dataGuide.name;
    idGuide.value = dataGuide.id;
    priceGuide.value = dataGuide.pricePerHour;
    routeName.value = dataRoute.name;
    idRoute.value = dataRoute.id;
    excursionDate.value = getCurrentDate();
    option2Name.innerHTML = 'трансфер после экскурсии';
    option2Desc.innerHTML = 'трансфер до ближайших станций метро после \
    экскурсии увеличивает стоимость на (в выходные дни/в будние) ';
    changeFieldRequestHandler();
}


function renderGuides(data) {

    tableGuides.innerHTML = '';

    let itemGuides =
        tempGuides.content.firstElementChild.cloneNode(true);

    tableGuides.append(itemGuides);

    for (let i = 0; i < data.length; i++) {

        itemGuides =
            tempGuides.content.firstElementChild.cloneNode(true);

        itemGuides.dataset.idGuide =
            data[i]['id'];

        let imgGuide = document.createElement('img');
        imgGuide.src = 'images/user.png';
        imgGuide.classList.add('icon');
        let divImg = document.createElement('div');
        divImg.classList.add('white-square-with-rounded-edges');
        divImg.append(imgGuide);
        itemGuides.querySelector('.img').innerHTML = '';
        itemGuides.querySelector('.img').append(divImg);

        itemGuides.querySelector('.name').innerHTML =
            data[i]['name'];

        if (data[i]['language'].includes(' ')) {
            let newData = data[i]['language'].split(' ');
            let langContainer = document.createElement('div');
            langContainer.classList.add('lang-container');
            for (let j = 0; j < newData.length; j++) {
                let langItem = document.createElement('div');
                langItem.classList.add('lang-item');
                langItem.innerHTML = newData[j];
                langContainer.append(langItem);
            }
            itemGuides.querySelector('.lang').innerHTML = '';
            itemGuides.querySelector('.lang').append(langContainer);
        } else {
            itemGuides.querySelector('.lang').innerHTML =
                data[i]['language'];
        }


        let exp = data[i]['workExperience'];
        if (exp == 1) {
            itemGuides.querySelector('.exp').innerHTML =
                exp + ' год';
        } else {
            if (exp < 5) {
                itemGuides.querySelector('.exp').innerHTML =
                    exp + ' года';
            }
            if (exp >= 5) {
                itemGuides.querySelector('.exp').innerHTML =
                    exp + ' лет';
            }

        }


        itemGuides.querySelector('.price').innerHTML =
            data[i]['pricePerHour'];

        let choose = itemGuides.querySelector('.choose');

        choose.classList.remove('choose');

        choose.classList.add('choose-btn');

        choose.classList.add('d-flex');

        choose.classList.add('justify-content-center');
        choose.classList.add('align-items-center');

        let button = document.createElement('button');

        button.classList.add('button');

        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = '#createRequest';

        button.innerHTML = 'Выбрать';

        button.onclick = buttonChooseGuideHandler;

        choose.innerHTML = '';

        choose.append(button);

        tableGuides.append(itemGuides);
    }
}


function generateGuides(data) {
    renderGuides(data);
}


async function buttonChooseRouteHandler(event) {
    let row = event.target.closest('.row');
    let idRoute = row.dataset.idRoute;
    let dataRoute = await dataExchangeWithTheServer('get', 'route',
        {}, idRoute);

    let data = await dataExchangeWithTheServer('get', 'routes', {}, idRoute);
    let nameRoute = '"' + row.querySelector('.name').innerHTML + '"';
    document.querySelector('.guides-name-of-route').innerHTML = nameRoute;
    generateGuides(data);
}


function renderAvailableRoutes(data) {

    WalkingRoutes.innerHTML = '';

    let itemWalkingRoutes =
        tempWalkingRoutes.content.firstElementChild.cloneNode(true);

    WalkingRoutes.append(itemWalkingRoutes);

    for (let i = 0; i < data.length; i++) {

        itemWalkingRoutes =
            tempWalkingRoutes.content.firstElementChild.cloneNode(true);

        itemWalkingRoutes.dataset.idRoute =
            data[i]['id'];

        itemWalkingRoutes.querySelector('.name').innerHTML =
            data[i]['name'];

        itemWalkingRoutes.querySelector('.desc').innerHTML =
            data[i]['description'];

        itemWalkingRoutes.querySelector('.main-object').innerHTML =
            data[i]['mainObject'];

        let choose = itemWalkingRoutes.querySelector('.choose');

        choose.classList.remove('choose');

        choose.classList.add('choose-btn');

        choose.classList.add('d-flex');

        choose.classList.add('justify-content-center');
        choose.classList.add('align-items-center');

        let button = document.createElement('a');

        button.href = '#list-of-guides';

        button.classList.add('button');

        button.innerHTML = 'Выбрать';

        button.onclick = buttonChooseRouteHandler;

        choose.innerHTML = '';

        choose.append(button);

        WalkingRoutes.append(itemWalkingRoutes);
    }
}


function createPageBtn(page, classes = []) {

    let btn = document.createElement('a');

    for (cls of classes) {
        btn.classList.add(cls);
    }

    btn.classList.add('page-link');
    btn.classList.add('d-flex');
    btn.classList.add('align-items-center');

    btn.dataset.page = page;

    btn.innerHTML = page;

    btn.href = '#label-search-field';
    return btn;
}


function renderPaginationElement(currentPage, totalPages) {

    currentPage = parseInt(currentPage);
    totalPages = parseInt(totalPages);

    let btn;
    let li;

    paginationContainer.innerHTML = '';


    let buttonsContainer = document.createElement('ul');

    buttonsContainer.classList.add('pagination');

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';

    li = document.createElement('li');
    li.classList.add('page-item');

    if (currentPage == 1) {
        li.classList.add('disabled');
    }
    li.append(btn);

    buttonsContainer.append(li);


    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(currentPage + 2, totalPages);

    for (let i = start; i <= end; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        btn = createPageBtn(i, i == currentPage ? ['active'] : []);
        li.append(btn);
        buttonsContainer.append(li);
    }


    btn = createPageBtn(totalPages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';

    li = document.createElement('li');
    li.classList.add('page-item');

    if (currentPage == totalPages || totalPages == 0) {
        li.classList.add('disabled');
    }
    li.append(btn);

    buttonsContainer.append(li);


    paginationContainer.append(buttonsContainer);
}


function renderSelectorOfAvailableRoutes(data) {

    let setMainObject = new Set();
    for (let i = 0; i < Object.keys(data).length; i++) {
        let mainObject = data[i]['mainObject'];
        if (mainObject.includes('-')) {
            mainObject = mainObject.split('-');
            for (let j = 0; j < mainObject.length; j++) {
                setMainObject.add(mainObject[j]);
            }
        }
    }
    let resultMainObject = [];

    setMainObject.forEach((value) => {
        resultMainObject.push(value);
    });

    resultMainObject.sort();

    let temp = landmarkSelect.value;

    landmarkSelect.innerHTML = '';
    let optionElem = document.createElement('option');
    optionElem.innerHTML = '';
    landmarkSelect.append(optionElem);

    for (let i = 0; i < resultMainObject.length; i++) {
        let optionElem = document.createElement('option');
        optionElem.innerHTML = resultMainObject[i];
        landmarkSelect.append(optionElem);
    }

    landmarkSelect.value = temp;
}

async function getAndFilterData(qParam) {

    let data = await dataExchangeWithTheServer('get', 'routes');

    if (qParam) {

        data = data.filter(value =>
            value['name'].toUpperCase().includes(qParam.toUpperCase()));
    }
    data = data.filter(value =>
        value['mainObject'].includes(landmarkSelect.value));
    return data;
}


async function generateAvailableRoutesOfXItem(page, perPage, qParam) {
    let data = await getAndFilterData(qParam);

    let dataToRender = [];

    let totalPages = Math.ceil(data.length / perPage);

    if (alertContainer.querySelector('.alert-item')) {
        alertContainer.querySelector('.alert-item').remove();
    }

    if (page > totalPages && page < 1) {
        WalkingRoutes.innerHTML = 'Ошибка: выход за пределы доступных страниц';
    } else {
        if (Object.keys(data).length == 0) {
            WalkingRoutes.innerHTML = '';
            paginationContainer.innerHTML = '';

            let text = 'По данному запросу "' + qParam + '" ничего не \
            найдено\<br>Пожалуйста, попробуйте изменить запрос \
                    или зайдите позже.';
            showAlert('warning', text);
            return;
        }

        let max = Math.min(page * perPage, data.length);
        for (let i = (page - 1) * perPage; i < max; i++) {
            dataToRender.push(data[i]);
        }

        renderAvailableRoutes(dataToRender);
        renderPaginationElement(page, totalPages);
    }
}

function selectorOfAvailableRoutesHandler(event) {
    generateAvailableRoutesOfXItem(1, PER_PAGE, searchField.value);
}


function pageBtnHandler(event) {

    if (!event.target.classList.contains('page-link')) return;

    if (event.target.classList.contains('disabled')) return;

    generateAvailableRoutesOfXItem(event.target.dataset.page,
        PER_PAGE,
        searchField.value);
}

async function generateSelector() {
    let data = await getAndFilterData(searchField.value);
    renderSelectorOfAvailableRoutes(data);
}


async function searchFieldHandler(event) {
    generateAvailableRoutesOfXItem(1,
        PER_PAGE,
        event.target.value);
    generateSelector();
}

window.onload = function () {

    generateAvailableRoutesOfXItem(1, PER_PAGE);
    generateSelector();

    document.querySelector('.pagination-bar').onclick = pageBtnHandler;

    searchField.oninput = searchFieldHandler;

    landmarkSelect.onchange = selectorOfAvailableRoutesHandler;
    buttonCreateRequest.onclick = buttonSendRequestHandler;

    document.querySelector('#excursion-date').onchange =
        changeFieldRequestHandler;
    document.querySelector('#start-time').onchange =
        changeFieldRequestHandler;
    document.querySelector('#duration').onchange =
        changeFieldRequestHandler;
    document.querySelector('#number-of-people').onchange =
        changeFieldRequestHandler;
    document.querySelector('#option-1').onchange =
        changeFieldRequestHandler;
    document.querySelector('#option-2').onchange =
        changeFieldRequestHandler;

    document.querySelector('#buttonCancel').onclick = function () {

        if (alertContainer.querySelector('.alert-item')) {
            alertContainer.querySelector('.alert-item').remove();
        };
    };
};

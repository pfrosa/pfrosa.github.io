const typesEnum = Object.freeze({
    NUMBER: 0,
    TEXT: 1,
    DATE: 2
})

const autoCompleteFilters = {
    nome: typesEnum.TEXT,
    cod: typesEnum.NUMBER,
    idade: typesEnum.NUMBER,
    dataNasc: typesEnum.DATE
}

const autocompleteWrapper = document.querySelector('.autocomplete');
const autoCompleteList = document.querySelector('.autocomplete-list');
const autoCompleteInput = document.querySelector('.autocomplete-input');
const autoCompleteText = document.querySelector('.autocomplete-text');
const selectedListEl = document.querySelector('.selected-list');
const resultList = document.querySelector('.result-list');
const selectedList = new Array();
window.selectedList = selectedList;

function getFilterType() {
    const filter = (getTextValue().split(":")[0]).trim();
    return autoCompleteFilters[filter];
}

function getTextValue() {
    return autoCompleteInput.value;
}

function hasFilter() {
    return getTextValue().indexOf(":") !== -1;
}

function hasFilterValue() {
    const textValue = getTextValue();
    return hasFilter() && textValue.indexOf(":") !== textValue.length - 1;
}

function renderAutocompletList(list) {
    autoCompleteList.removeChild(autoCompleteList.firstElementChild);
    autoCompleteList.appendChild(document.createElement('ul'))
    list.slice(0, 10).forEach(text => {
        const li = document.createElement('li')
        li.innerText = text;
        li.addEventListener('click', (e) => {
            doCompletion(hasFilter() ? getTextValue().split(":")[0] + ":" + text : text)
            autoCompleteInput.focus();
        })
        li.addEventListener('mouseover', hoverSelected);
        autoCompleteList.firstElementChild.appendChild(li);

    });

}

function setAutocompleteList(list) {
    const textValue = getTextValue();
    if (list.length) {
        autoCompleteText.value = hasFilter() ? textValue.split(":")[0] + ":" + list[0] : list[0];
        autoCompleteList.classList.add('show');
        renderAutocompletList(list);
    }
    else {
        autoCompleteText.value = '';
        autoCompleteList.classList.add('hide');
        autoCompleteList.classList.remove('show');
    }
}

let requestTimeout = false;
//AUTO COMPLETE É SO PARA TEXTOS
//SÒ APARECER LISTA QUANDO PARAR DE DIGITAR ?
function doSugestion() {
    const textValue = getTextValue();
    const filterType = getFilterType();
    if (requestTimeout) {
        clearTimeout(requestTimeout)
        requestTimeout = false;
    } else {
        setAutocompleteList([]); // WHILE TYPING BLANK LIST;
    }

    if (hasFilter()) {
        if (hasFilterValue() && filterType == typesEnum.TEXT) {
            requestTimeout = setTimeout(() => {
                autoCompleteInput.readOnly = true;
                autocompleteWrapper.classList.add('loading');
                doAjaxAutocomplete(textValue)
                    .then((res) => hasFilter() && setAutocompleteList(res))
                    .finally(() => {
                        autocompleteWrapper.classList.remove('loading');
                        autoCompleteInput.readOnly = false;
                        requestTimeout = false;
                    })
                    .catch((err) => alert(err));
            }, 500)
        } else {
            switch (filterType) {
                case typesEnum.NUMBER:
                    setAutocompleteList([">=", "<=", "=="]);
                    break;
                case typesEnum.TEXT:
                    break;
                case typesEnum.DATE:
                    setAutocompleteList(["DE", "ATE", "HOJE",  "HOJE", "SETE DIAS", "TRINTA DIAS", "ESTE-MÊS", "ESTE-ANO"])
                    break;
                default:
                    setAutocompleteList(["FILTRO NÂO IMPLEMENTADO CONTACTE O ADMINISTRADOR DO SITEMA"])
            }
        }
    } else {
        setAutocompleteList(
            Object.keys(autoCompleteFilters)
                .sort((a, b) => b.length - a.length)
                .filter(el => el.length > textValue.length && el.startsWith(textValue)));
    }

}

function doCompletion(value = autoCompleteText.value) {
    if (value == '') return false;
    autoCompleteInput.value = hasFilter() ? value : value + ":";
    autoCompleteText.value = '';
    autoCompleteList.classList.add('hide');
    autoCompleteList.classList.remove('show');
    renderAutocompletList([]);
    if (!hasFilterValue()) doSugestion();
}

function changeListSelected(displacement) {
    const list = Array.from(autoCompleteList.firstElementChild.children);
    const selectedIndex = list.findIndex(el => el.classList.contains("selected"))
    const newSelectedIndex = selectedIndex + displacement < 0 ? list.length + displacement : (selectedIndex + displacement) % list.length;
    list.forEach((el, i) => {
        if (i == newSelectedIndex) el.classList.add("selected");
        else el.classList.remove("selected");
    })
    if (list.length) autoCompleteText.value = hasFilter() ? getTextValue().split(":")[0] + ":" + list[newSelectedIndex].innerText : list[newSelectedIndex].innerText;
}

function hoverSelected(e) {
    const textValue = autoCompleteInput.value;
    const item = e.currentTarget;
    const list = Array.from(item.parentElement.children);
    list.forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    autoCompleteText.value = hasFilter() ? textValue.split(":")[0] + ":" + item.innerText : item.innerText;
}
//ONLY EXAMPLE RENDERING
function renderResultList(results) {
    Array.from(resultList.children).forEach(child => resultList.removeChild(child));
    if (results.length == 0) {
        resultList.innerHTML = "Não foi encontrado nenhum resultado para estes filtros";
    } else {
        const table = document.createElement("table");
        table.innerHTML = `
            <tr>
                <th> # </th>
                <th>COD</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Data de Nascimento</th>
            </tr>
        `
        const tr = ({ cod, nome, idade, dataNasc}, index) => {
            const tr = document.createElement('tr');
            [index + 1, cod, nome, idade, dataNasc].forEach(dado => {
                const td = document.createElement('td')
                td.innerText = dado;
                tr.appendChild(td);
            })
            return tr;
        }

        results.map(tr).forEach(tr => table.appendChild(tr));
        resultList.appendChild(table);
    }
}

function handleKeys(e) {
    // TAB, DOWN, UP, ENTER
    const especialKeyCodes = [9, 40, 38, 13];
    if (e.currentTarget.readOnly) return e.preventDefault();
    if (especialKeyCodes.indexOf(e.keyCode) !== -1) {
        if (e.keyCode == 9) doCompletion();
        if (e.keyCode == 40) changeListSelected(+1);
        if (e.keyCode == 38) changeListSelected(-1);
        if (e.keyCode == 13)
            if (hasFilterValue()) addToSelectedList(autoCompleteInput.value)
            else doAjaxFilter(parseSelectedList()).then(renderResultList);

        e.preventDefault();
    }

}

function renderSelectedList() {
    Array.from(selectedListEl.children).forEach(el => selectedListEl.removeChild(el))
    selectedList.forEach((el, i) => {
        const liEl = document.createElement('li');
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'X';
        liEl.innerText = el;
        liEl.appendChild(removeBtn);
        removeBtn.addEventListener('click', removeFromSelectedList.bind(this, i))
        selectedListEl.appendChild(liEl)
    })
}

function addToSelectedList(value) {
    selectedList.push(value);
    renderSelectedList();
    renderAutocompletList([]);
    autoCompleteInput.value = "";
    autoCompleteText.value = "";
}

function removeFromSelectedList(index) {
    selectedList.splice(index, 1);
    renderSelectedList();
}

function parseSelectedList() {
    return selectedList.map(el => {
        let [filter, ...query] = el.split(/:/);
        query = query.join('').toLowerCase();
        return { filter, query };
    }).reduce((acc, el) => {
        if (acc[el.filter]) acc[el.filter].push(el.query);
        else acc[el.filter] = [el.query];
        return acc;
    }, {});

}

function doAjaxFilter(filters) {
    const apiUrl = new URL("http://localhost:1234");
    apiUrl.searchParams.append("json", JSON.stringify(filters));
    apiUrl.searchParams.append("action", "filter");
    return fetch(apiUrl)
        .then(res => res.json())
}
//autoComplete should kept actual filters in mind
function doAjaxAutocomplete(autocompleteValue) {
    let [filter, ...query] = autocompleteValue.split(/:/);
    const apiUrl = new URL("http://localhost:1234");
    apiUrl.searchParams.append("action", "autocomplete");
    query = query.join('').toLowerCase();
    apiUrl.searchParams.append("json", JSON.stringify({ filter, query, currentFilters: parseSelectedList()}));
    return fetch(apiUrl)
        .then(res => res.json())
}

autoCompleteInput.addEventListener('input', doSugestion)
autoCompleteInput.addEventListener('keydown', handleKeys)
autoCompleteInput.addEventListener('focus', doSugestion)
autoCompleteInput.addEventListener('blur', () => {
    autoCompleteText.value = '';
    autoCompleteList.classList.remove('show');
    autoCompleteList.classList.add('hide');

}) 

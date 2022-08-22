'Use strict'

document.addEventListener('click', event => {
    if (event.target == document.querySelector('.filter-search')) {
        pageTransition()
    }
    if (event.target.parentElement == document.querySelector('.form-container')){
        document.querySelectorAll('[prop="filter-arrow"]').forEach(element => {
            if (event.target == element || event.target == element.firstElementChild) {
                openCloseFilterPoints(element)
            }
        })
    }

    const sortingCountBlock = document.querySelector('.elements-sorting-count')
    if (event.target.parentElement == sortingCountBlock) {
        selectSortingCount(event.target, sortingCountBlock)
    }
    if (event.target == document.querySelector('.name-price-sorting')) {
        showSortingBlock()
    }

    if (event.target.closest('.sorting-types-container')) {
        document.querySelectorAll('.sorting-type').forEach(element => {
            if (event.target == element || event.target.parentElement == element) {
                selectSortingTypes(element)
            }
        })
    }

    if (event.target.closest('.carousel-container')) {
        document.querySelectorAll('.banner-switch').forEach(element => {
            if (event.target == element || event.target.parentElement == element) { switchBanner(element) }
        })
    }

    if (event.target.closest('.order-number-address')) {
        document.querySelectorAll('.order-cancel').forEach(element => {
            if (event.target == element) { orderCancel(element) }
        })
    }

    if (event.target == document.querySelector('.switch-toggle-checkbox')) {
        checkOnlinePay(event.target)
    }

    document.querySelectorAll('.product-counter').forEach(element => {
        if (event.target == element) { productCounter(element) }
    })
})

//переход на страницу поиска
function pageTransition() {
    window.location.href = '/element/search.html'
}

// раздел фильтра в поиске
function openCloseFilterPoints(element) {
    const filterString = element.getAttribute('class').split('-')
    filterProp = filterString[2]
    const viewBlock = document.querySelector(`[prop="${filterProp}"]`)
    if (viewBlock) { toggleInvisible(viewBlock) }
    if (element.firstElementChild) { element.firstElementChild.classList.toggle('rotate') }
}

// сортировка количества отображаемых товаров
function selectSortingCount(target, sortingCountBlock) {
    if (target.hasAttribute('select')) { return }
    else {
        sortingCountBlock.querySelector('[select]').removeAttribute('select')
        target.setAttribute('select', '')
    }
}

function showSortingBlock() {
    const sortingTypesContainer = document.querySelector('.sorting-types-container')
    toggleInvisible(sortingTypesContainer)
}

let toggleInvisible = function(block) {
    block.toggleAttribute('invisible')
}

function selectSortingTypes(element) {
    const titleType = element.querySelector('.type-title').textContent
    const circle = element.querySelector('.type-circle')
    if (circle.hasAttribute('select')) { return }
    else  { 
        element.parentElement.querySelector('[select]').removeAttribute('select')
        circle.setAttribute('select', '') 
    }
    document.querySelector('.name-price-sorting').textContent = titleType
    toggleInvisible(document.querySelector('.sorting-types-container'))
}

function switchBanner(button) {
    const route = button.getAttribute('prop')
    const selectedBanner = document.querySelector('[select]')
    let selectedId = selectedBanner.getAttribute('id')
    
    if (route == 'next') { 
        if (selectedId == 5) { selectedId = 0 }
        selectedId++ 
    }
    else { 
        if (selectedId == 1) { selectedId = 6 }
        selectedId-- 
    }
    selectedBanner.removeAttribute('select')

    document.querySelectorAll('.carousel-img').forEach(element => {
        if (element.getAttribute('id') == selectedId) {
            element.setAttribute('select', '')
        }
    })
    switchMainBanner()
}

function switchMainBanner() {
    const selectedBanner = document.querySelector('[select]')
    const bannerImg = selectedBanner.querySelector('.banner-img').getAttribute('src')
    
    const mainBanner = document.querySelector('.banner-link').querySelector('.banner-img')
    mainBanner.setAttribute('src', bannerImg)
}

//отмена заказ
function orderCancel(element) {
    const parentBlock = element.closest('.order')
    parentBlock.classList.add('order-canceled')
    parentBlock.querySelector('.sber').remove()
    parentBlock.querySelector('.order-status').textContent = "Отменен"
    parentBlock.querySelector('.order-inform').textContent = "Заказ отменен клиентом"

    element.remove()

}

// чекбокс на онлайн оплату
function checkOnlinePay(element) {
    if ('checkedList' in element) { return }
    element.addEventListener('change', event => {
        if (element.checked) {

        }
    })
    element['checkedList'] = true
}
function productCounter(element) {
    const productPrice = element.closest('.price-element').querySelector('.product-price')
    let sale = productPrice.querySelector('.sale').textContent
    const pen = productPrice.querySelector('.sale-pen').textContent
    const value = element.getAttribute('prop')
    const countBlock = element.closest('.counter-container').querySelector('.current-count')
    let count = countBlock.textContent
    
    if (+pen > 0) {
        sale = sale + '.' + pen
    }
    console.log(sale)
    if (value == 'plus') { count++ }
    else { 
        if (count == 1) { element.closest('.product').remove() }
        count--
    }
    countBlock.textContent = count
}

function multiplicationOfProducts() {

}
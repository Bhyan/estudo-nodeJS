function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities() {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option valuer=''>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(response => response.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem() {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => item === itemId)

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== itemId)
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}
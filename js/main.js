
const list = document.querySelector(".js-pokemon-list");
const selectWeakness = document.querySelector(".select-weaknesses");
const selectSort = document.querySelector(".sort-select");
const elForm = document.querySelector(".js-form");
const fromCandy = document.querySelector(".from-candy");
const toCandy = document.querySelector(".to-candy");
const elInputSearch = elForm.querySelector(".js-search-input");
const elTemplate = document.querySelector(".template").content;

const renderPokemons = function(arr,regex = ""){
  list.innerHTML = "";
  const tempFrag = new DocumentFragment();
  arr.forEach(item => {
    const template = elTemplate.cloneNode(true);
    if(regex.source != "(?:)" && regex){
      template.querySelector(".card-title").innerHTML = item.name.replace(regex,
        `<mark class="bg-warning">${regex.source}</mark>`);
    }else{
      template.querySelector(".card-title").textContent = item.name;
    }
    template.querySelector(".num").textContent = item.num;
    template.querySelector(".card-img").src = item.img;
    template.querySelector(".candy-count").textContent = item.weaknesses.join(", ");
    template.querySelector(".time").textContent = item.spawn_time;
    template.querySelector(".item-desc").textContent = item.candy;
    template.querySelector(".weight").textContent = item.weight;
    tempFrag.appendChild(template);
  })
  list.appendChild(tempFrag);
};


function showSearchName(regex){
  const searchFilterName = pokemons.filter(item => {
    const filterName = item.name.match(regex) && (selectWeakness.value == "All" || item.weaknesses.includes(selectWeakness.value)) && ((fromCandy.value =="" || item.candy_count >= Number(fromCandy.value))) && ((toCandy.value =="" || item.candy_count <= Number(toCandy.value)))
    return filterName
  });
  return searchFilterName
}

const weaknessesArray = [];
function weaknessesFunction(){
  pokemons.forEach(item => {
    item.weaknesses.forEach(element => {
      if(!weaknessesArray.includes(element)){
        weaknessesArray.push(element);
      }
    });
  });
  weaknessesArray.sort()
};


function renderWeakness(){
  const selectFragmentWeakness = new DocumentFragment()
  weaknessesArray.forEach(item => {
    const newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    selectFragmentWeakness.appendChild(newOption);
  });
  selectWeakness.appendChild(selectFragmentWeakness);
}

function sortPokemons(arr, sortType) {
  if(sortType == "a-z"){
    arr.sort((a,b)=> {
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
      return 0
    })
  }
  if(sortType == "z-a"){
    arr.sort((a,b) => {
      if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
      if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
      return 0
    })
  }
  if(sortType == "high-weight"){
    arr.sort((a,b) => {
      return parseFloat(a.weight) - parseFloat(b.weight)
    })
  }
  if(sortType == "low-weight"){
    arr.sort((a,b) => {
      return parseFloat(b.weight) - parseFloat(a.weight)
    })
  }
}

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  const inputVal = elInputSearch.value.trim();
  const regexTitle = new RegExp(inputVal, "gi");
  const searchName = showSearchName(regexTitle);

  if(searchName.length > 0){
    sortPokemons(searchName,selectSort.value);
    renderPokemons(searchName, regexTitle)
  }else{
    list.innerHTML = "Pokemon not found !!!"
  }
})

weaknessesFunction();
renderWeakness();
renderPokemons(pokemons.slice(0,148));

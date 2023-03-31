const loadPhone = async (searchText) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};
const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  console.log(phones);
  phonesContainer.innerHTML = "";
  //display 20 phones only
  phones = phones.slice(0, 10);

  //no  phone found
  const noFoundPhone = document.getElementById("no-found-phone");
  if (phones.length === 0) {
    noFoundPhone.classList.remove("d-none");
  } else {
    noFoundPhone.classList.add("d-none");
  }
  //display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-2">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });

// stop loader
toggleSpinner(false);

}//handle search button click

document.getElementById("phone-search").addEventListener("click", function () {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  loadPhone(searchText);
});
// loadPhone();
const toggleSpinner=isLoadding=>{
const loaderSection=document.getElementById('loader');
if(isLoadding){
  loaderSection.classList.remove('d-none');
}
else{
  loaderSection.classList.add('d-none');
}
}


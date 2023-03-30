const loadPhone = async (searchText,dataLimit) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data,dataLimit);
};
const displayPhones = (phones,dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  // console.log(phones);
  phonesContainer.innerHTML = "";
    //display 10 phones only
  const showAllData=document.getElementById("show-allData");
if(dataLimit && phones.length>10){
  phones = phones.slice(0, 10);
showAllData.classList.remove('d-none');
}else{
  showAllData.classList.add('d-none');
}
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
      <a href="#"  type="button" data-bs-toggle="modal"
      data-bs-target="#showProductDetails" onClick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary ">Show Details</a>
      </div>
  </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // type="button" data-bs-toggle="modal" data-bs-target="#showProductDetails"
// stop loader
toggleSpinner(false);

}
const processSearch=(dataLimit)=>{
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // searchField.value = "";
  loadPhone(searchText,dataLimit);
}
//handle search button click
document.getElementById("phone-search").addEventListener("click", function () {
  processSearch(10);
});
//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
// console.log(e.key);
  if(e.key==='Enter'){
// console.log('Enter button clicked');
processSearch(10);
}
})
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

//not the best way to load show all
document.getElementById('btn-showAll').addEventListener('click',function(){
processSearch();
})
// load PhoneDetails
const loadPhoneDetails=(id)=>{
const url=`https://openapi.programming-hero.com/api/phone/${id}`;
fetch(url)
.then(res=>res.json())
.then(data=>showProductDetails(data.data))
}
const showProductDetails=(data)=>{
  // console.log(data);
  document.getElementById("productDetailsImage").src = data.image;
  const showDetailsContainer = document.getElementById('showDetailsContainer');
  showDetailsContainer.innerHTML = "";
  const showDetailsDiv = document.createElement("div");
  showDetailsDiv.classList.add("p-2");
  showDetailsDiv.innerHTML=`
  <h5 class="modal-title"><b>Company Name: </b> ${data.brand}</h1>
  <h5><b>Memory: </b>${data.mainFeatures.memory}</h3>
  <h5><b>Storage: </b>${data.mainFeatures.storage}</h3>
  <h5><b>ReleaseDate: </b>${data.releaseDate?data.releaseDate :"No Release Date Found."}</h4>
  <h5><b>Others: </b>${data.others?data.others.Bluetooth :"No Bluetooth Information."}</h4>
`;
// data.releaseDate:new Date("2021-03-25")
showDetailsContainer.appendChild(showDetailsDiv);
}
const loadCategory = async () => {
  const res =
    await fetch`https://openapi.programming-hero.com/api/peddy/categories`;
  const data = await res.json();
  displayCategories(data.categories);
};

const loadPets = async () => {
  const res = await fetch`https://openapi.programming-hero.com/api/peddy/pets`;
  const data = await res.json();
  displayPets(data.pets);
};

// Load pets details
const loadPetsDetails = async (petId) => {
  // console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayPetsDetails(data.petData);
};

// display pets details
const displayPetsDetails = (petDetails) => {
  const {
    breed,
    category,
    date_of_birth,
    gender,
    price,
    image,
    pet_name,
    pet_details,
    vaccinated_status,
  } = petDetails;
  console.log(petDetails);
  const detailsPets = document.getElementById("modalContent");
  detailsPets.innerHTML = `
  <img class="w-full mx-auto rounded-xl pb-4" src=${image} />
  

  <div class="flex justify-between items-center">
    <div>
  <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=50&id=123612&format=png"/> Breed: ${breed}</p>
  <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=48&id=Tv19QIBIxxR4&format=png"/> Gender: ${gender}</p>
  <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqOgqc7ZplWBMhgHLOFlq1UAV2JrmzpiZ3oQ&s"/> vaccinated status: ${vaccinated_status}</p>
  </div>
  
 <div>
 <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://image.shutterstock.com/image-vector/thin-line-calendar-icon-mobile-260nw-1020205951.jpg"/> Birth: ${date_of_birth}</p>
  <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=24&id=89392&format=png"/> price: ${price} $</p>
  </div>
  </div>
  

  <p class = "border-b-2 border-gray-500 mb-4 mt-4"> </p>
  <h1 class="text-xl font-bold pb-3">Detail Information</h1>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
The point of using is that it has a more-or-less normal distribution of letters, as opposed to using.</p>

  `;
  document.getElementById("showModalData").click();
};

// Click like button

const likeBtnImg = async (petId) => {
  console.log(petId);
  const likeContainer = document.getElementById("likeImg-btn");
  const LContainer = document.createElement("div");
  LContainer.classList = "border border-gray-300 p-0 rounded-md h-fit";
  LContainer.innerHTML = `
      <img class="rounded-lg" src="${petId}" />
    `;
  likeContainer.appendChild(LContainer);
};

// Display all pets ----->>
const displayPets = (pets) => {
  document.getElementById("spinner").classList.remove(`hidden`);
  const petsContainer = document.getElementById("animal");
  document.getElementById("all-petsShow").classList.add("hidden");
  petsContainer.innerHTML = "";

  if (pets.length === 0) {
    document.getElementById("spinner").classList.add(`hidden`);
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center mb-4">
    <img src="images/error.webp"/>
    <h1 class="text-3xl font-bold">No Information Available</h1>
    <p class="text-gray-500 text-center w-3/4 mb-3">Pets are domesticated animals kept for companionship and enjoyment. They often provide emotional support and can include cats, dogs, birds, and small mammals. </p>
    </div>
    `;
    return;
  } else {
    petsContainer.classList.add("grid");
  }

  // Sort pets in descending order based on price
  pets.sort((a, b) => b.price - a.price);

  pets.forEach((item) => {
    const { breed, category, date_of_birth, gender, price, image, pet_name } =
      item;

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="rounded-xl w-72 shadow-xl border-2 border-gray-200">
  <figure class ="h-[200px]">
    <img
      class ="w-full  h-full object-cover p-2 rounded-2xl"
      src=${image} />
    </figure>
      <div class="px-3 py-1">
      <h2 class="text-xl font-bold">${pet_name}</h2>

      <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=50&id=123612&format=png"/> Breed: ${(item.breed =
        item.breed?.length == 0 ||
        item.breed === null ||
        item.breed === undefined
          ? "Not Available"
          : item.breed)}</p>

      <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://image.shutterstock.com/image-vector/thin-line-calendar-icon-mobile-260nw-1020205951.jpg"/> Birth: ${(item.date_of_birth =
        item.date_of_birth?.length == 0 ||
        item.date_of_birth === null ||
        item.date_of_birth === undefined
          ? "Not Available"
          : item.date_of_birth)}</p>

      <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=48&id=Tv19QIBIxxR4&format=png"/> Gender: ${(item.gender =
        item.gender?.length == 0 ||
        item.gender === null ||
        item.gender === undefined
          ? "Not Available"
          : item.gender)}</p>

      <p class="text-gray-500 flex gap-1"><img class="w-5" src="https://img.icons8.com/?size=24&id=89392&format=png"/> price: ${(item.price =
        item.price?.length == 0 ||
        item.price === null ||
        item.price === undefined
          ? "Not Available"
          : item.price)} $ </p>
      
      <p class="border border-b-2 mt-4"> </p>

      <div class="flex justify-around py-4">
         <button onclick="likeBtnImg('${image}')" class="btn btn-sm">👍</button>
         <button onclick="adoptBtn(this)" class="btn btn-sm text-green-600">Adopt</button>
         <button onclick="loadPetsDetails('${
           item.petId
         }')" class="btn btn-sm text-green-600">Details</button>
      </div>
      </div>
   </div>
    `;
    petsContainer.appendChild(div);
  });

  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("all-petsShow").classList.remove("hidden");
  }, 2000);
};

// load Button -->>
const loadCategoryButton = async (id) => {
  document.getElementById("all-petsShow").classList.add("hidden");
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // const activeBtn = document.getElementById(`btn-${id}`);
      // activeBtn.classList.add("active");
      displayPets(data.data);
      // console.log(activeBtn);
    })
    .catch((error) => console.log(error));
  setTimeout(() => {
    document.getElementById("all-petsShow").classList.remove("hidden");
  }, 2000);
};

// Adopt button clicked
const adoptBtn = (btn) => {
  adoptModal.showModal();

  const countAdopt = document.getElementById("countAdot");
  const a = countAdopt.innerText;
  let x = parseInt(a);
  let y = setInterval(() => {
    x--;
    countAdopt.innerText = x;
    if (x <= 0) {
      clearInterval(y);
      adoptModal.close();
      countAdopt.innerText = a;
      btn.disabled = true;
      btn.innerText = "Adopted";
    }
  }, 1000);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-btn");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    // id="btn-(${item.id})" for active btn
    buttonContainer.innerHTML = `
      <button onclick="loadCategoryButton('${item.category}')"  class="btn  text-xl font-bold px-9 bg-white border-2 category-btn" >
      <img class="w-8 " src="${item.category_icon}" />
      ${item.category}
      </button>
    `;
    categoryContainer.appendChild(buttonContainer);
  });
};

// view button click
const viewMoreButton = document.getElementById("viewMoreBtn");
const petsSection = document.getElementById("all-petsShow");
viewMoreButton.addEventListener("click", () => {
  petsSection.scrollIntoView({ behavior: "smooth" });
});

// Sort button
// Sort pets by price and display

// const sortPetsByPrice = (price) => {
//   const sortedPets = [price].sort((a, b) => b.price - a.price); // Sort the pets data in descending order
//   displayPets(sortedPets); // Display sorted pets
// };

// // Add event listener to "Sort by price" button
// const sortPriceBtn = document.getElementById("sortPriceBtn");
// sortPriceBtn.addEventListener("click", sortPetsByPrice);

loadCategory();
loadPets();

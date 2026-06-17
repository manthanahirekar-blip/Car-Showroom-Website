const brandDropdown = document.getElementById("Brands");
const modelDropdown = document.getElementById("Models");
const carContainer = document.getElementById("car-container");

fetch("./cars.json")
    .then(response => response.json())
    .then(carData => {

        // Populate Brand Dropdown
        for (let brandName in carData) {

            const brandOption = document.createElement("option");

            brandOption.value = brandName;
            brandOption.textContent = brandName;

            brandDropdown.appendChild(brandOption);
        }

        let allCars = [];

        for (let brandName in carData) {

            carData[brandName].forEach(carDetails => {

                allCars.push({
                    ...carDetails,
                    brand: brandName
                });

            });
        }

        displayCars(allCars);


        brandDropdown.addEventListener("change", () => {

            const selectedBrand = brandDropdown.value;

            modelDropdown.innerHTML =
                `<option value="" selected disabled>Choose Model</option>`;

            carData[selectedBrand].forEach(carDetails => {

                const modelOption = document.createElement("option");

                modelOption.value = carDetails.model;
                modelOption.textContent = carDetails.model;

                modelDropdown.appendChild(modelOption);
            });

            const selectedBrandCars = carData[selectedBrand].map(carDetails => ({
                ...carDetails,
                brand: selectedBrand
            }));

            displayCars(selectedBrandCars);
        });



        modelDropdown.addEventListener("change", () => {

            const selectedBrand = brandDropdown.value;
            const selectedModel = modelDropdown.value;

            const filteredCars = carData[selectedBrand]
                .filter(carDetails => carDetails.model === selectedModel)
                .map(carDetails => ({
                    ...carDetails,
                    brand: selectedBrand
                }));

            displayCars(filteredCars);
        });

    })
    .catch(error => {
        console.log(error);
    });




function displayCars(carArray) {

    carContainer.innerHTML = "";

    carArray.forEach(carDetails => {

        const carCard = document.createElement("div");

        carCard.classList.add("car-card");

        carCard.innerHTML = `
            <img src="${carDetails.image}" alt="${carDetails.model}">

            <div class="car-info">

                <h2>${carDetails.brand} ${carDetails.model}</h2>

                <p><strong>Price:</strong> ${carDetails.price}</p>

                <p><strong>Power:</strong> ${carDetails.power}</p>

                <p><strong>Top Speed:</strong> ${carDetails.topSpeed}</p>

                <button>View Details</button>

            </div>
        `;

        carContainer.appendChild(carCard);
    });
}
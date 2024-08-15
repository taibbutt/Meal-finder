let nextbtn = document.querySelector(".rightbtn")
let prebtn = document.querySelector(".leftbtn")
let alldish = document.querySelectorAll(".dishes")
let searchinput = document.getElementById("search-input")
let searchbtn = document.getElementById("searchBtn")
let value = document.querySelectorAll(".dish")
let count = 0


window.onload = function () {
    const container = document.querySelector('.containor');
    container.classList.add('loaded');
};

const getData = async (value) => {
    try {
        let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
        let conjson = await datas.json();
        console.log(conjson.meals);
        document.querySelector(".showMeal").innerHTML = "";
        conjson.meals.forEach(function (data) {
            console.log(data)
            let div = document.createElement("div")
            div.classList.add("card")
            div.innerHTML = `
            <img src=${data.strMealThumb} alt="">
            <p>${data.strMeal}</p>
            <button>view more</button>
    `
            document.querySelector(".showMeal").appendChild(div);
        })
    } catch (error) {
        document.querySelector(".showMeal").innerHTML = "<h1>NOT FOUND</h1>"
    }

}

searchbtn.addEventListener('click', function () {
    let searchValue = searchinput.value;
    if (searchValue == "") {
        alert("first dish enter")
    }
    else {
        getData(searchValue);
    }
})

//    ...................slider
alldish.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`
})
function myfun() {
    alldish.forEach(function (curval) {
        curval.style.transform = `translateX(-${count * 100}%)`
    })
}

nextbtn.addEventListener("click", function () {
    count++;
    if (count == alldish.length) {
        count = 0
    }
    myfun();
})

prebtn.addEventListener("click", function () {
    count--;
    if (count == -1) {
        count = alldish.length - 1
    }
    myfun();
})





value.forEach(function (dishes) {
    dishes.addEventListener("click", function () {
        getData(dishes.value)
    })
})
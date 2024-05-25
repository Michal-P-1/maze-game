function setCurrentYear() {
    console.log("Ho");
    const currentYearElemennt = document.querySelector(".current-year");

    currentYearElemennt.textContent = new Date().getFullYear();
}

setCurrentYear();

//Función de utilidad
const $ = (selector) => document.querySelector(selector);

//Variables
const $navbarMenu = $(".navbar-menu");
const $btnBurger = $(".navbar-burger");
const $formFilters = $("#form-filters");
const $btnChangeFilters = $("#btn-change-filters");
const $btnBalance = $("#btn-balance");
const $btnCategories = $("#btn-categories");
const $btnReports = $("#btn-reports");
const $sectionBalance = $("#section-balance");
const $sectionCategories = $("#section-categories");
const $sectionReports = $("#section-reports");
const $sectionNewOperation = $("#section-new-operation");
const $btnNewOperation = $("#btn-new-operation")

//Eventos
//Menú hamburguesa
$btnBurger.addEventListener("click",()=>{
    $btnBurger.classList.toggle("is-active");
    $navbarMenu.classList.toggle("is-active");
});

//Ocultar mostrar filtros
$btnChangeFilters.addEventListener("click",()=>{
    $formFilters.classList.toggle("is-hidden");
    if($formFilters.classList.contains("is-hidden")){
        $btnChangeFilters.textContent="Mostrar filtros";
    }else{
        $btnChangeFilters.textContent="Ocultar filtros";
    }
});

//Flujo de pantallas
$btnBalance.addEventListener("click",()=>{
    $sectionBalance.classList.remove("is-hidden")
    $sectionCategories.classList.add("is-hidden")
    $sectionReports.classList.add("is-hidden")
    $sectionNewOperation.classList.add("is-hidden")
}); 


$btnCategories.addEventListener("click",()=>{
    $sectionCategories.classList.remove("is-hidden")
    $sectionBalance.classList.add("is-hidden")
    $sectionReports.classList.add("is-hidden")
    $sectionNewOperation.classList.add("is-hidden")
});

$btnReports.addEventListener("click",()=>{
    $sectionReports.classList.remove("is-hidden")
    $sectionBalance.classList.add("is-hidden")
    $sectionCategories.classList.add("is-hidden")
    $sectionNewOperation.classList.add("is-hidden")
});

$btnNewOperation.addEventListener("click",()=>{
    $sectionNewOperation.classList.remove("is-hidden")
    $sectionBalance.classList.add("is-hidden")
    $sectionCategories.classList.add("is-hidden")
    $sectionReports.classList.add("is-hidden")
});
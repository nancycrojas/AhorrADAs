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
const showSection=(sectionToShow)=> {
    const sections = [$sectionBalance, $sectionCategories, $sectionReports, $sectionNewOperation];
    sections.forEach(section =>{
        if(section === sectionToShow){
            section.classList.remove("is-hidden");
        }else{
            section.classList.add("is-hidden");
        }
    });
}

$btnBalance.addEventListener("click",()=>{
    showSection($sectionBalance)
});

$btnCategories.addEventListener("click",()=>{
    showSection($sectionCategories)
});

$btnReports.addEventListener("click",()=>{
    showSection($sectionReports)
});

$btnNewOperation.addEventListener("click",()=>{
    showSection($sectionNewOperation)
});
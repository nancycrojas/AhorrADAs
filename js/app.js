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
const $btnNewOperation = $("#btn-new-operation");
const $btnAddOperation = $("#btn-add-operation");
const $btnCancelOperation = $("#btn-cancel-operation");
const $operationDescription = $("#operation-description");
const $operationAmount = $("#operation-amount");
const $operationType = $("#operation-type");
const $operationCategory = $("#operation-category");
const $operationDate = $("#operation-date");
const $operations = $("#operations");
const $boxWithOperations = $("#box-with-operations");
const $boxWithoutOperations = $("#box-without-operations");

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
const showSection = (sectionToShow) => {
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

//Mostrar las operaciones en balance
const showingOperations = (arrayop) => {
    if(arrayop.length === 0){
        $boxWithOperations.classList.add("is-hidden");
        $boxWithoutOperations.classList.remove("is-hidden");
    }else{
        $boxWithOperations.classList.remove("is-hidden");
        $boxWithoutOperations.classList.add("is-hidden");
    }
};

let operations = [];

//Creo un objeto con la información obtenida del evento
$btnAddOperation.addEventListener("click",()=>{
    const newOperation = {
        descripcion : $operationDescription.value,
        monto: Number($operationAmount.value),
        tipo: $operationType.value,
        categoria: $operationCategory.value,
        fecha: $operationDate.value,
        id: uuid.v1()  
    };
    //Agrego el objeto a la lista operations y la guardo en el local storage
    operations.push(newOperation);
    localStorage.setItem("operationsStorage", JSON.stringify(operations));
    const getOperationsStorage = JSON.parse(localStorage.getItem("operationsStorage"));
});

//Generar operaciones en balance
const generateOperationsHtml = (operations) => {
    $operations.innerHTML = "";
    const $divContainer = document.createElement("div");
    for(const { descripcion, categoria, fecha, tipo, monto, id} of operations) {
        $divContainer.innerHTML += `
        <div class="columns is-mobile is-multiline">
            <div class="column has-text-weight-medium">${descripcion}</div>
            <div class="column">
                <span class="tag is-primary is-light is-rounded">${categoria}</span>
            </div>
            <div class="column is-hidden-mobile">${fecha}</div>
            <div class="column">
                <span class="${tipo=='gastos' ? 'has-text-danger' : 'has-text-success'} has-text-weight-medium">$${monto}</span>
            </div>
            <div class="column">
                <button class="button is-small is-ghost">Editar</button>
                <button class="button is-small is-ghost">Eliminar</button>
            </div>
        </div>
        `;
        $operations.appendChild($divContainer);
    }
};

operations = JSON.parse(localStorage.getItem("operationsStorage")) || [];
generateOperationsHtml(operations);
showingOperations(operations);
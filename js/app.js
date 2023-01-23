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
const $sectionEditOperation = $("#section-edit-operation");
const $editOperationDescription = $("#edit-operation-description");
const $editOperationAmount = $("#edit-operation-amount");
const $editOperationType = $("#edit-operation-type");
const $editOperationCategory = $("#edit-operation-category");
const $editOperationDate = $("#edit-operation-date");
const $btnEditOperation = $("#btn-edit-operation");
const $btnNewCategory = $("#btn-new-category");
const $inputCategory = $("#category-name");
const $listCategories = $("#list-categories");
const $sectionEditCategory = $("#section-edit-category");
const $inputEditCategory = $("#edit-category-name");
const $btnEditCategory = $("#btn-edit-category");
const $filtersCategory = $("#filters-category");
const $filterDate = $("#filter-date");
const $balanceTotal = $("#balance-total");
const $balanceGanancias = $("#balance-ganancias");
const $balanceGastos = $("#balance-gastos");
const $filterType = $("#filter-type");
const $filterSort = $("#sort-filter");

//Eventos
//Menú hamburguesa
$btnBurger.addEventListener("click",()=>{
    $btnBurger.classList.toggle("is-active");
    $navbarMenu.classList.toggle("is-active");
});

//Función date
const date = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  };

$operationDate.value = date();
$filterDate.value = date();

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
    const sections = [$sectionBalance, $sectionCategories, $sectionReports, $sectionNewOperation, $sectionEditOperation, $sectionEditCategory];
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

//Cancelar Nueva Operación
$btnCancelOperation.addEventListener("click",()=>{
    $sectionNewOperation.classList.add("is-hidden");
    $sectionBalance.classList.remove("is-hidden");
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

    if(newOperation.tipo == "gastos"){
        console.log("multiplicaaa");
        newOperation.monto = Number(newOperation.monto) * -1;
    }

    //Agrego el objeto a la lista operations y la guardo en el local storage
    operations.push(newOperation);
    localStorage.setItem("operationsStorage", JSON.stringify(operations));
    const getOperationsStorage = JSON.parse(localStorage.getItem("operationsStorage"));

    generateOperationsHtml(getOperationsStorage);
    showBalanceHtml(getOperationsStorage);
    filterOperations();
});

//Generar operaciones en balance
const generateOperationsHtml = (operations) => {
    showingOperations(operations);
    $operations.innerHTML = "";
    const $divContainer = document.createElement("div");
    for(const { descripcion, categoria, fecha, tipo, monto, id } of operations) {
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
                <button class="button is-small is-ghost" onclick="editOp('${id}')">Editar</button>
                <button class="button is-small is-ghost" onclick="deleteOp('${id}')">Eliminar</button>
            </div>
        </div>
        `;
        $operations.appendChild($divContainer);
    }
};

operations = JSON.parse(localStorage.getItem("operationsStorage")) || [];
generateOperationsHtml(operations);
showingOperations(operations);

//Mostrar Editar Operación
const showEditOpSection = () => {
    const sections = [$sectionCategories, $sectionReports, $sectionNewOperation, $sectionBalance];
    sections.forEach(section => section.classList.add("is-hidden"));
    $sectionEditOperation.classList.remove("is-hidden");
};

//Cancelar Editar Operacion
const showSectionOp = () => {
    const sections = [$sectionCategories, $sectionReports, $sectionNewOperation, $sectionEditOperation];
    sections.forEach(section => section.classList.add("is-hidden"));
    $sectionBalance.classList.remove("is-hidden");
};

//Editar Operación
let operationToEdit;

const editOp = (id) => {
    showEditOpSection();
    operationToEdit = operations.find((elemento) => elemento.id === id);
    $editOperationDescription.value = operationToEdit.descripcion;
    $editOperationAmount.value = operationToEdit.monto;
    $editOperationType.value = operationToEdit.tipo;
    $editOperationCategory.value = operationToEdit.categoria;
    $editOperationDate.value = operationToEdit.fecha;
    if($editOperationType.value == "gastos"){
        $editOperationAmount.value = Number(operationToEdit.monto) * -1;
    }
    return operationToEdit;
};

$btnEditOperation.addEventListener("click",()=>{
    operationToEdit.descripcion = $editOperationDescription.value;
    operationToEdit.monto = $editOperationAmount.value;
    operationToEdit.tipo = $editOperationType.value;
    operationToEdit.categoria = $editOperationCategory.value;
    operationToEdit.fecha = $editOperationDate.value;

    if(operationToEdit.tipo == "gastos"){
        operationToEdit.monto = Number($editOperationAmount.value) * -1;
    }

    localStorage.setItem("operationsStorage", JSON.stringify(operations));
    generateOperationsHtml(operations);
    showBalanceHtml(operations);
    filterOperations();
    showSectionOp();
});

//Eliminar Operación
const deleteOp = (id) => {
    const foundElement = operations.find((elemento) => elemento.id === id);
    if(foundElement){
        const index = operations.indexOf(foundElement);
        operations.splice(index,1);
        localStorage.setItem("operationsStorage", JSON.stringify(operations));
        generateOperationsHtml(operations);
        showBalanceHtml(operations);
        filterOperations();
    }
};

//Agregar nueva categoría
let categories = [
    {
        nombre: "Comida",
        id: 1
    },
    {
        nombre: "Servicios",
        id: 2
    },
    {
        nombre: "Salidas",
        id: 3
    },
    {
        nombre: "Educación",
        id: 4
    },
    {
        nombre: "Transporte",
        id: 5
    },
    {
        nombre: "Trabajo",
        id: 6
    }
]

$btnNewCategory.addEventListener("click",()=>{
    const newCategory = $inputCategory.value;
    categories.push({nombre: newCategory, id: uuid.v1()});

    localStorage.setItem("categoriesStorage", JSON.stringify(categories));
    const getCategoriesStorage = JSON.parse(localStorage.getItem("categoriesStorage"));
    generateCategoriesHtml(getCategoriesStorage);
    populateCategories(getCategoriesStorage);
    $inputCategory.value = "";
});

const hideOthersSections = () => {
    const sections = [$sectionBalance, $sectionCategories, $sectionReports, $sectionNewOperation];
    sections.forEach(section => section.classList.add("is-hidden"));
    $sectionEditCategory.classList.remove("is-hidden");
};

const showCategorySection = () => {
    const sections = [$sectionBalance, $sectionReports, $sectionNewOperation, $sectionEditCategory];
    sections.forEach(section => section.classList.add("is-hidden"));
    $sectionCategories.classList.remove("is-hidden");
};

//Editar categoría
let result;
const editcategory = (category) => {
    hideOthersSections();
    const foundCategory = categories.find((elemento) => elemento.id === category);
    if(foundCategory){
        $inputEditCategory.value = foundCategory.nombre;
        result = {valor: $inputEditCategory.value, i: categories.indexOf(foundCategory)};
    }
    return result;
};

$btnEditCategory.addEventListener("click",() => {
    categories[result.i].nombre = $inputEditCategory.value;
    localStorage.setItem("categoriesStorage", JSON.stringify(categories));
    generateCategoriesHtml(categories);
    populateCategories(categories);

    operations.forEach(() => {
        const i = i.find((operation) => operation.categoria === result.valor);
        if(i){
            i.categoria = $inputEditCategory.value;
            localStorage.setItem("operationsStorage", JSON.stringify(operations));
        }
        generateOperationsHtml(operations);
        showBalanceHtml(operations);
    });
    showCategorySection();
});

//Eliminar Categoría
const deleteCategory = (category) => {
    const selectedCategory = categories.find((elem) => elem.id === category);
    const value = categories.find((elem) => elem.id === category);
    if(value){
        categories.splice(categories.indexOf(value), 1);
        localStorage.setItem("categoriesStorage", JSON.stringify(categories));
        generateCategoriesHtml(categories);
        populateCategories(categories);
    }
    operations.forEach(() => {
        const foundCategory = operations.find((operation) => operation.categoria === selectedCategory.nombre);
        if(foundCategory){
            operations.splice(operations.indexOf(foundCategory), 1);
            localStorage.setItem("operationsStorage", JSON.stringify(operations));
        }
        generateOperationsHtml(operations);
        showBalanceHtml(operations);
    });
};

//Generar categorías en vista categoría
const generateCategoriesHtml = (categories) => {
    $listCategories.innerHTML = "";
    const $divCategory = document.createElement("div");
    for(const { nombre, id } of categories){
        $divCategory.innerHTML +=`
        <div class="columns is-mobile is-multiline">
            <div class="column">
                <span class="tag is-primary is-light is-rounded">${nombre}</span>
            </div>
            <div class="column has-text-right">
                <button class="button is-small is-ghost" onclick="editcategory('${id}')">Editar</button>
                <button class="button is-small is-ghost" onclick="deleteCategory('${id}')">Eliminar</button>
            </div>
        </div>
        `;
        $listCategories.appendChild($divCategory);
    }
};

//Llenar los selectores con las opciones de las categorías
const populateCategories = (categories) => {
    $operationCategory.innerHTML = "";
    $filtersCategory.innerHTML = `<option value="todas">Todas</option>`;
    for(const {nombre} of categories){
        const option = document.createElement("option");
        option.value = nombre;
        option.innerHTML = nombre;
        $operationCategory.appendChild(option);

        const option2 = document.createElement("option");
        option2.value = nombre;
        option2.innerHTML = nombre;
        $editOperationCategory.appendChild(option2);
        
        const option3 = document.createElement("option");
        option3.value = nombre;
        option3.innerHTML = nombre;
        $filtersCategory.appendChild(option3);
    }
};

categories = JSON.parse(localStorage.getItem("categoriesStorage")) || [];
generateCategoriesHtml(categories);
populateCategories(categories);

//Box balance
const calculateBalance = (operaciones) => {
    return operaciones.reduce(
        (balance, operacion) => {
            if(operacion.tipo == "ganancia"){
                return {
                    ...balance,
                    ganancias: Number(balance.ganancias) + Number(operacion.monto),
                    total: Number(balance.total) + Number(operacion.monto),
                };
            }
            if(operacion.tipo == "gastos"){
                return {
                    ...balance,
                    gastos: Number(balance.gastos) + Number(operacion.monto),
                    total: Number(balance.total) + Number(operacion.monto),
                };
            } 
        },
        {
            ganancias: 0,
            gastos: 0,
            total: 0,
        }
    );
};

//Mostrar en box balance
const showBalanceHtml = (operaciones) => {
    const balanceData = calculateBalance(operaciones);

    $balanceTotal.classList.remove("has-text-danger", "has-text-primary");

    if(balanceData.total > 0){
        console.log(balanceData);
        $balanceTotal.classList.add("has-text-primary");
    }
    if(balanceData.total < 0){
        $balanceTotal.classList.add("has-text-danger");
    }

    $balanceGanancias.innerText = `$${balanceData["ganancias"]}`;
    $balanceGastos.innerText = `$${balanceData["gastos"]}`;
    $balanceTotal.innerText = `$${balanceData["total"]}`;
};

//Filtros
//Tipo
const filterType = (tipo, operaciones) => 
    operaciones.filter((operacion) => operacion.tipo === tipo);

//Categoría
const filterCategory = (categoria, operaciones) => 
    operaciones.filter((operacion) => operacion.categoria === categoria);

//Desde
const filterDateGreaterOrEqual = (fecha, operaciones) => 
    operaciones.filter(
        (operacion) => new Date(operacion.fecha).getTime()>= new Date(fecha).getTime());

const sortMoreLeastRecent = (operaciones, orden) => {
    const newArray = [...operaciones];
    let resultado;
    if(orden === "ascendente"){
        resultado = newArray.sort((a,b) => (a.fecha > b.fecha ? 1 : -1));
    }else{
        resultado = newArray.sort((a,b) => (a.fecha < b.fecha ? 1 : -1));
    }
    return resultado;
};

//Ordenar por
const sortAmount = (operaciones, orden) => {
    const newArray = [...operaciones];
    let resultado;
    if(orden === "ascendente"){
        resultado = newArray.sort((a,b) =>
        Number(a.monto) > Number(b.monto) ? 1 : -1
        );
    }else{
        resultado = newArray.sort((a,b) =>
        Number(a.monto) < Number(b.monto) ? 1 : -1
        );
    }
    return resultado;
};

const orderAZ_ZA = (operaciones, orden) => {
    const newArray = [...operaciones];
    let resultado;
    if(orden === "A_Z"){
        resultado = newArray.sort((a,b) => (a.descripcion > b.descripcion ? 1 : -1));
    }else{
        resultado = newArray.sort((a,b) => (a.descripcion < b.descripcion ? 1 : -1));
    }
    return resultado;
};

const filterOperations = () => {
    const tipo = $filterType.value;
    const categoria = $filtersCategory.value;
    const fecha = $filterDate.value;
    const orden = $filterSort.value;

    let operaciones = operations;

    if(tipo !== "Todas"){
        operaciones = filterType(tipo, operaciones);
    }
    if(categoria !== "Todas"){
        operaciones = filterCategory(categoria, operaciones);
    }

    operaciones = filterDateGreaterOrEqual(fecha,operaciones);

    switch (orden) {
        case "Mas reciente":
            operaciones = sortMoreLeastRecent(operaciones, "descendente");
            break;
        case "Menos reciente":
            operaciones = sortMoreLeastRecent(operaciones, "ascendente");
            break;
        case "Mayor monto":
            operaciones = sortAmount(operaciones, "descendente");
            break;
        case "Menor monto":
            operaciones = sortAmount(operaciones, "ascendente");
            break;
        case "A/Z":
            operaciones = orderAZ_ZA(operaciones, "A-Z");
            break;
        case "Z/A":
            operaciones = orderAZ_ZA(operaciones, "Z-A");
            break;
            default:
                break;
    }
    generateOperationsHtml(operaciones);
    showBalanceHtml(operaciones);
};

$filterType.addEventListener("change", filterOperations);
$filtersCategory.addEventListener("change", filterOperations);
$filterDate.addEventListener("change", filterOperations);
$filterSort.addEventListener("change",filterOperations);
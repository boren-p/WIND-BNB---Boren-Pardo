/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */
import {stays} from "./stays.js"

/////////////////////////////  OPEN MODAL  /////////////////////////////////

let modal=document.getElementById("filterModal");
let searcher=document.getElementById("searcher");

searcher.addEventListener("click", ()=>{
    modal.classList.toggle("hidden");
})

/////////////////////////////  FILTERS  /////////////////////////////////

let locations=[];
let applyFilters =[];
stays.forEach(element => {
    if(!(locations.includes(element.city))){
    locations.push(element.city);
    }
});

let locationIn=document.getElementById("locationIn");
let locationDiv=document.getElementById("locationOptions")
let guestsIn=document.getElementById("guestsIn");
let adultN=document.getElementById("adultsNumber");
let childN=document.getElementById("childrenNumber");
let reset=document.getElementById("reset")
let notFound=document.getElementById("notFound");
let adultN2=0;
let childN2=0;

modal.addEventListener("click", (e)=>{
    switch(e.target.id){
        case "closeModal":
            modal.classList.toggle("hidden");
            locationDiv.classList.add("hidden");
            break;
        case "locationIn":
            id++
            locationDiv.classList.toggle("hidden");
            locationDiv.innerHTML = "";
            locations.forEach(element => {
                locationDiv.innerHTML+=`
                <div id="opt${id}" class="flex items-center w-full h-10 px-10 bg-white hover:bg-[#e77171] hover:text-white">${element}</div> 
                `
            });
            break;
        case "restAdult":
            if(adultN2 >0){
            adultN2--
            adultN.textContent = adultN2;
            guestsIn.value=adultN2+childN2;
            break;
            }else if (guestsIn.value <0){
                guestsIn.value="";
                adultN.textContent = 0;
                adultN2=0;
                break;
            }else{
                break;
            }
        case "addAdult":
            if(adultN2 >=0){
            adultN2++
            adultN.textContent = adultN2;
            guestsIn.value=adultN2+childN2;
            break;
            }else{
                guestsIn.value="";
                adultN.textContent = 0;
                adultN2=0;
                break;
            }
        case "restChild":
            if(childN2 >0){
            childN2--
            childN.textContent = childN2;
            guestsIn.value=adultN2+childN2;
            break;
            }else if (guestsIn.value <0){
                guestsIn.value="";
                childN.textContent = 0;
                childN2=0
                break;
            } else{
                break;
            }
        case "addChild":
            if(childN2 >=0){
            childN2++
            childN.textContent = childN2;
            guestsIn.value=adultN2+childN2;
            break;
            }else {
                guestsIn.value="";
                childN.textContent = 0;
                childN2=0
                break;
            }
        case "reset":
            locationIn.value="";
            guestsIn.value="";
            adultN.textContent = 0;
            childN.textContent = 0;
            break;
        case "searchFilters":
            searchFilters();
            modal.classList.toggle("hidden");
            locationDiv.classList.add("hidden");
            break;
}})

// altera un texto para indicar que tiene la opcion de reiniciar los filtros sin recargar la pagina
reset.addEventListener("mouseover", ()=>{
    reset.textContent="Reset your search"
})
reset.addEventListener("mouseleave", () => {
  reset.textContent = "Edit your search";
});

//este escuchador de eventos registra los datos de las ciudades en el input Location, me tocó sacarlo del switch case porque se estaba volviendo loco.
locationDiv.addEventListener("click", e=>{
                if(e.target.id.startsWith("opt")){
                    locationIn.value= e.target.textContent;
                    locationDiv.classList.toggle("hidden");
                }
            })

function searchFilters(){
    applyFilters = [];
    maya.innerHTML = "";
    let selectedLocation = locationIn.value.trim();
    let totalGuests = Number(guestsIn.value);

    stays.forEach(element => {
        if(element.city === selectedLocation && element.maxGuests >= totalGuests){
            applyFilters.push(element);
        }
    });

    applyFilters.forEach(element=>{
        id++
    maya.innerHTML+=`
    <div id="crd${id}" class="flex flex-col justify-between w-full h-90 gap-2 p-1 rounded-[28px] hover:border-2 hover:border-gray-300">
                <div style="background-image: url('${element.photo}')" class=" bg-no-repeat bg-cover w-full h-[80%] rounded-3xl"></div>
                <div class="flex flex-col justify-between w-full h-[17%] px-4 pb-2">
                    <div class="flex w-full justify-between">
                        <div class="flex items-center gap-2">
                        <div id="sh${id}" class="hidden items-center justify-center w-30 h-6 border border-gray-500 text-gray-500 rounded-2xl p-1 font-bold">SUPERHOST</div>
                        <h3>${element.type} <h3 id="bds${id}">. ${element.beds} beds </h3></h3>
                        </div>
                        <div class="flex items-center justify-end w-20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 fill-[#eb5757] mr-1">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                            <h3>${element.rating}</h3>
                        </div>
                    </div>
                    <h2 class="font-bold">${element.title}</h2>
                </div>
            </div>
    `
    let superhost=document.getElementById(`sh${id}`)
    if(element.superHost===true){
        superhost.classList.replace("hidden", "flex");
    }
    
    let beds=document.getElementById(`bds${id}`);
    if(element.beds==null){
        beds.classList.toggle("hidden");
    }
    })

    if(applyFilters.length < 1){
        notFound.classList.toggle("hidden");
        maya.classList.toggle("hidden");
    } else {
        notFound.classList.toggle("hidden");
        maya.classList.toggle("hidden");
    }

    //actualizar textos de la pagina
    document.getElementById("location").textContent=selectedLocation;
    document.getElementById("guests").textContent=`${totalGuests} guests`;
    document.getElementById("numberCards").textContent=`${applyFilters.length} stays`;
}

/////////////////////////////  CARDS GENERATE  /////////////////////////////////
let maya = document.getElementById("maya");
let id=0;

stays.forEach(element => {
    id++
    maya.innerHTML+=`
    <div id="crd${id}" class="flex flex-col justify-between w-full h-90 gap-2 p-1 rounded-[28px] hover:border-2 hover:border-gray-300">
                <div style="background-image: url('${element.photo}')" class=" bg-no-repeat bg-cover w-full h-[80%] rounded-3xl"></div>
                <div class="flex flex-col justify-between w-full h-[17%] px-4 pb-2">
                    <div class="flex w-full justify-between">
                        <div class="flex items-center gap-2">
                        <div id="sh${id}" class="hidden items-center justify-center w-30 h-6 border border-gray-500 text-gray-500 rounded-2xl p-1 font-bold">SUPERHOST</div>
                        <h3>${element.type} <h3 id="bds${id}">. ${element.beds} beds </h3></h3>
                        </div>
                        <div class="flex items-center justify-end w-20">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 fill-[#eb5757] mr-1">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                            </svg>
                            <h3>${element.rating}</h3>
                        </div>
                    </div>
                    <h2 class="font-bold">${element.title}</h2>
                </div>
            </div>
    `
    let superhost=document.getElementById(`sh${id}`)
    if(element.superHost===true){
        superhost.classList.replace("hidden", "flex");
    }
    
    let beds=document.getElementById(`bds${id}`);
    if(element.beds==null){
        beds.classList.toggle("hidden");
    }
});


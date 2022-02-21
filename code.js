var main = [1,2,4];
var hint = [9,5,6,8,7]
var name_index = 1;
var hint_index = 6;
var link_index = 3;
var json ;
let tableId = "";
let pages = [];
let currentPage = 0;

//GUI
function loadMain(json){
    json = json;
    //paginate();
    document.getElementsByTagName("BODY")[0].innerHTML = "";
    document.getElementsByTagName("BODY")[0].innerHTML += makeHeader();
    document.getElementsByTagName("BODY")[0].innerHTML += makeBody();
    //addPaginator();
    //showPage(0);
    fillTBody();
    //loadTable ();
    $("filter").DataTable();
}

function makeBody(){
    var body = `<main class="py-3">
    <div class="container-fluid">
        <div class="row ">`;

    body += makeProblemCard();
    body += makeHelpCard();

    body += `</div></div></main>`;
    return body;
}

function makeProblemCard(){
    var card = `<div class="col-xl-6">
            <div class="card">
                <div class="card-header">
                    Problems : <a href='https://forms.gle/9kszAVR29v9bvUoj6'>You can add more problems here</a>
                </div>
                <div class="card-body">`;

    
    card += makeTable();

    card += `   </div>
            </div>    
                 </div>`;
    return card;
}

function makeHeader(){
    return `<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="#">
                Competitive Programming Practice Problems by Gadz'It
            </a>
        </div>
    </nav>`;
}

function makeTable(json){
    var table = "";
    table = getTHead() + getTBody();

    return '<table id="filter" class="table table-hover ">' + table + '</table><div id="paginator"></div>'
}

function getTHead(){
    var row = "<th>#</th>";
    for(var i=0; i<main.length; i++) row += "<th>"+json["cols"][main[i]]["label"].split('(')[0]+"</th>";
    return '<thead class="thead-light"><tr>' + row + "</tr></thead>";
}

function getTBody(){
    return "<tbody id='tbody'></tbody>";
}

function fillTBody(){
    console.log(currentPage);
    var row = "";
    //for(var i=0; i<pages[currentPage].length; i++) row += getRow(pages[currentPage][i]);
    for(var i=0; i<json.rows.length; i++) row += getRow(i);
    document.getElementById("tbody").innerHTML = row;
}

function getRow(rowInd){
    var row = "<td>"+rowInd+"</td>";
    for(var i=0; i<main.length; i++) {
        if(main[i] != name_index) row += "<td>"+json["rows"][rowInd]["c"][main[i]]["v"]+"</td>";
        else row += '<td><a  target="_blank" href="'+json["rows"][rowInd]["c"][link_index]["v"]+'">'+json["rows"][rowInd]["c"][main[i]]["v"]+"</a></td>";;
    }
    return '<tr onclick="makeHelp('+rowInd+')">' + row + "</tr>";
}

function makeHelpCard(){
    var card = `<div class="col-xl-6">
    <div class="card">
        <div class="card-header" id="help_name">
            Help
        </div>
        <div class="card-body">`;


    card += '<div  class="accordion" id="help">Click on a problem to show help<div>';

    card += `   </div>
        </div>    
            </div>`;
    return card;
}

function makeHelp(id){
    document.getElementById("help_name").innerHTML = json.rows[id].c[name_index].v;
    document.getElementById("help").innerHTML = fillHelp(id);
}

function fillHelp(id){
    return makeOtherHelp(id);

}

function makeOtherHelp(id){
    var str ="";
    for(var i=0; i<hint.length; i++){
        if(hint[i]==hint_index) str+=makeHints(id);
        else if(json.rows[id].c[hint[i]] != null && json.rows[id].c[hint[i]].v!= null) str+=`<div class="card">
        <div class="card-header" id="OH`+i+`">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#h`+i+`" aria-expanded="false" aria-controls="hint`+i+`">
              `+json["cols"][hint[i]]["label"].split('(')[0]+`
            </button>
          </h2>
        </div>
    
        <div id="h`+i+`" class="collapse" aria-labelledby="OH`+i+`" data-parent="#help">
          <div class="card-body">
          `+json.rows[id].c[hint[i]].v+`
          </div>
        </div>
      </div>`;
    }
    return str;
}

function makeHints(id){
    var str ="";
    var hints = json.rows[id].c[hint_index].v.split(";");
    for(var i=0; i<hints.length; i++){
        str+=`<div class="card">
        <div class="card-header" id="Hhint`+i+`">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#hint`+i+`" aria-expanded="false" aria-controls="hint`+i+`">
              Hint #`+i+`
            </button>
          </h2>
        </div>
    
        <div id="hint`+i+`" class="collapse" aria-labelledby="Hhint`+i+`" data-parent="#help">
          <div class="card-body">
          `+hints[i]+`
          </div>
        </div>
      </div>`;
    }
    return str;
}


//search




//paging

// Generates a set of arrays representing the organized data
function paginate(){
    pages = [];
    let perPage = 1;
    let pageNumber = 0;

    for(var i =0; i<json.rows.length; i++){
        if(!pages[pageNumber]){
            pages[pageNumber] = [];
        }

        if(pages[pageNumber].length < perPage){
            pages[pageNumber].push(i);
            if(pages[pageNumber].length == perPage){
                pageNumber++
            }
        }
    };
    console.log(pages);
}

// Generates the buttons for switching between pages
function addPaginator(){
    const paginatorContainer = document.querySelector('#paginator');
    paginatorContainer.innerHTML = pages.length > 1 ? `<button onclick="previousPage()" class="paginator-button">&#10094</button>` : '';
    for(let i = 0; i < pages.length; i++){
        const paginatorButton = `<button onclick="showPage(${i})" class="paginator-button">${i+1}</button>`;
        paginatorContainer.innerHTML += paginatorButton;
    }
    paginatorContainer.innerHTML = pages.length > 1 ? `${paginatorContainer.innerHTML}<button onclick="nextPage()" class="paginator-button">&#10095</button>` : '';
}

const nextPage = () => {
    if(currentPage < pages.length-1){
        showPage(currentPage+1)
    }
}
const previousPage = () => {
    if(currentPage > 0){showPage(currentPage-1)}; 
}

// Populates the table with the visible rows
function showPage(page){
    // clears the records of the tbody and iterates the records of the selected page to add new rows

    // do nothing if no records
    if(pages.length < 1 || page >= pages.length) return;

    // adds a CSS class to the clicked page button
    const paginatorButtons = document.querySelectorAll('#paginator button');
    Array.from(paginatorButtons).forEach((button, index) => {
        if(index-1 == page){
            button.classList.add('btn-secondary');
        }else{
            button.classList.remove('btn-secondary');
        }
    });
    currentPage = page;
    fillTBody();

    if(pages.length > 1){
        paginatorButtons[pages.length+1].disabled = (page+1) == pages.length ? true : false;
        paginatorButtons[0].disabled = page == 0 ? true : false;
    }
    
}



//sort


var main = [1,2,4];
var hint = [9,5,6,8,7]
var name_index = 1;
var hint_index = 6;
var link_index = 3;
var json ;


function loadMain(json){
    json = json;
    document.getElementsByTagName("BODY")[0].innerHTML = "";
    document.getElementsByTagName("BODY")[0].innerHTML += makeHeader();
    document.getElementsByTagName("BODY")[0].innerHTML += makeBody();

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

    return '<table id="filter" class="table table-hover ">' + table + '</table>'
}

function getTHead(){
    var row = "<th>#</th>";
    for(var i=0; i<main.length; i++) row += "<th>"+json["cols"][main[i]]["label"].split('(')[0]+"</th>";
    return '<thead class="thead-light"><tr>' + row + "</tr></thead>";
}

function getTBody(){
    var row = "";
    for(var i=0; i<json["rows"].length; i++) row += getRow(i);
    return "<tbody>" + row + "</tbody>";
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

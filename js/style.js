var l = 1;

$(document).ready(function(){
    var interval;

    createTable();

    $(".bake-button").click(function(){
        clearInterval(interval);
        $(".item-container").css({"left":"50vw"});

        interval = setTimeout(hideItems, (2.5 * 1000));
    });
}); 

function hideItems() {

    setInterval(() => {
        let elem = '.'+(l);
        console.log(elem);
        $(elem).hide();
        l++;
    }, (1 * 500))
}

function createTable() {
    var qnt_var = 3;
    var var_pos = '+1';
    var var_neg = '-1';


    for (var i = 0; i < 2**qnt_var; i++) {
        let exp = createElem('div', 'exp'+(i+1))
        exp.innerText = i+1;



        document.body.appendChild(exp);
    }
}

function createElem(parent, element, className) {
    let elem = document.createElement(element);
    elem.classList.add(className);
    document.body.appendChild(elem);
}

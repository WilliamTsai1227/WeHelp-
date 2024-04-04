function openlist(){
    let cloMu = document.querySelector(".menu_icon");
    let clo = document.querySelector(".closelist");
    cloMu.className = "menu_close";
    clo.className="openlist";
}

function closelist(){
    let openMu = document.querySelector(".menu_close");
    let op = document.querySelector(".openlist")
    openMu.className = "menu_icon";
    op.className="closelist";
}


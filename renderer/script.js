function createElements() {
    var mainDiv = document.getElementById("controller");

    for (var i = 0; i < 3; i++) {
        var bankDiv = document.createElement("div");
        bankDiv.classList.add("bank");
        var rowCount = 0;
        for (var j = 0; j < 2; j++) {
            var buttonModuleDiv = document.createElement("div");
            buttonModuleDiv.classList.add("buttonModule");

            for (var k = 0; k < 5; k++) {
                var buttonDiv = document.createElement("div");
                buttonDiv.classList.add("button");
                buttonDiv.id = "b" + (rowCount * 15 + k + 1 + i * 5);
                buttonDiv.textContent = rowCount * 15 + k + 1 + i * 5;
                buttonModuleDiv.appendChild(buttonDiv);
            }
            rowCount++;
            bankDiv.appendChild(buttonModuleDiv);
        }

        var faderModuleDiv = document.createElement("div");
        faderModuleDiv.classList.add("faderModule");
        for (var j = 0; j < 5; j++) {
            var faderDiv = document.createElement("div");
            faderDiv.classList.add("fader");
            faderModuleDiv.appendChild(faderDiv);
        }
        bankDiv.appendChild(faderModuleDiv);

        for (var j = 0; j < 2; j++) {
            var buttonModuleDiv = document.createElement("div");
            buttonModuleDiv.classList.add("buttonModule");

            for (var k = 0; k < 5; k++) {
                var buttonDiv = document.createElement("div");
                buttonDiv.classList.add("button");
                buttonDiv.id = "b" + (rowCount * 15 + k + 1 + i * 5);
                buttonDiv.textContent = rowCount * 15 + k + 1 + i * 5;
                buttonModuleDiv.appendChild(buttonDiv);
            }
            rowCount++;
            bankDiv.appendChild(buttonModuleDiv);
        }

        mainDiv.appendChild(bankDiv);
    }
}

$(document).ready(function () {
    createElements();
});

$(document).ready(function () {
    let isSelecting = false;
    let startSelectionX, startSelectionY;

    $("#main").on("mousedown", function (event) {
        isSelecting = true;
        startSelectionX = event.clientX;
        startSelectionY = event.clientY;
    });

    $(document).on("mousemove", function (event) {
        if (isSelecting) {
            const selectionBox = $("#selection-box");

            var currentX;
            if (event.clientX < parseInt($("#main").css("width"))) {
                currentX = event.clientX;
            } else {
                currentX = parseInt($("#main").css("width"));
            }
            const minX = Math.min(startSelectionX, currentX);
            const width = Math.abs(currentX - startSelectionX);
            const currentY = event.clientY;
            const minY = Math.min(startSelectionY, currentY);
            const height = Math.abs(currentY - startSelectionY);

            selectionBox.css({
                left: minX,
                top: minY,
                width: width,
                height: height,
                border: "1px solid rgba(0, 0, 0, 0.5)",
            });

            selectElements(minX, minY, width, height);
        }
    });

    $(document).on("mouseup", function () {
        isSelecting = false;
        clearSelectionBox();
    });

    function selectElements(x, y, width, height) {
        // Implementa la logica per selezionare gli elementi desiderati
        // Puoi utilizzare ad esempio una funzione che controlla le coordinate degli elementi e aggiunge loro una classe "selezionato"
        $("#main")
            .find(".button")
            .each(function () {
                const elemento = $(this);
                const elementoX = elemento.offset().left;
                const elementoY = elemento.offset().top;
                const elementoWidth = elemento.outerWidth();
                const elementoHeight = elemento.outerHeight();

                if (
                    elementoX >= x &&
                    elementoY >= y &&
                    elementoX + elementoWidth <= x + width &&
                    elementoY + elementoHeight <= y + height
                ) {
                    elemento.addClass("selezionato");
                } else {
                    elemento.removeClass("selezionato");
                }
            });
    }

    function clearSelectionBox() {
        const selectionBox = $("#selection-box");
        selectionBox.css({
            width: 0,
            height: 0,
            border: 0,
        });
    }
});

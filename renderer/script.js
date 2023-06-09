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

function selectionListeners() {
    /* -------------------- single and multi select with ctrl ------------------- */
    $(".button").click(function (event) {
        if (event.ctrlKey) {
            $(this).toggleClass("selected");
        } else {
            $(".button").removeClass("selected");
            $(this).addClass("selected");
        }
    });

    /* ------------------------------ selectionbox ------------------------------ */
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
            var currentX, currentY;
            var maxWidth = parseInt($("#main").css("width"));
            var maxHeight = parseInt($("#main").css("height"));

            if (event.clientX < maxWidth) {
                currentX = event.clientX;
            } else {
                currentX = maxWidth;
            }
            if (event.clientY < maxHeight) {
                currentY = event.clientY;
            } else {
                currentY = maxHeight;
            }
            const minX = Math.min(startSelectionX, currentX);
            const width = Math.abs(currentX - startSelectionX);
            const minY = Math.min(startSelectionY, currentY);
            const height = Math.abs(currentY - startSelectionY);

            selectionBox.css({
                left: minX,
                top: minY,
                width: width,
                height: height,
                border: "1px solid rgba(0, 0, 0, 0.5)",
            });

            selectElements(minX, minY, width, height, event);
        }
    });

    $(document).on("mouseup", function (event) {
        isSelecting = false;
        clearSelectionBox();
    });

    function selectElements(x, y, width, height, event) {
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
                    elemento.addClass("selected");
                } else if (!event.ctrlKey) {
                    elemento.removeClass("selected");
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

    /* ------------------------ single click out deselect ----------------------- */

    let isHoverButtons = false;

    $(".button").on("mouseenter", function () {
        isHoverButtons = true;
    });

    $(".button").on("mouseleave", function () {
        isHoverButtons = false;
    });

    $(".main").on("mouseup", function (event) {
        console.log("Mouse up event triggered");
        console.log("Start Selection X:", startSelectionX);
        console.log("Start Selection Y:", startSelectionY);

        if (!isHoverButtons && !event.ctrlKey) {
            console.log("ctrlkey: " + event.ctrlKey);
            console.log("Mouse is not hovering over any button");
            console.log(
                "Button Width:",
                parseInt($(".button:first").css("width"))
            );
            console.log(
                "Button Height:",
                parseInt($(".button:first").css("height"))
            );

            if (
                Math.abs(event.clientX - startSelectionX) <
                    parseInt($(".button:first").css("width")) ||
                Math.abs(event.clientY - startSelectionY) <
                    parseInt($(".button:first").css("height"))
            ) {
                console.log("Mouse released outside the buttons");
                $(".button").removeClass("selected");
            }
        }
    });
}

$(document).ready(function () {
    createElements();
    selectionListeners();
});

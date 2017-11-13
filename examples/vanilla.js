function initializeNumericBoxes() {

    // using the constructor
    var num1 = new duna.ui.NumericBox(document.getElementById("numericBox1"));
    var num2 = new duna.ui.NumericBox(document.getElementById("numericBox2"), {
        scale: 2,
        format: "R$ n",
        thousandSeparator: ".",
        decimalSeparator: ","
    });

    // using the static method 'from'
    var num3 = duna.ui.NumericBox.from("#numericBox3", {
        format: ["My number is: (-@)", "My number is: @", "My number is zero!"],
        min: -100,
        max: 100,
        placeholder: "@"
    });
}

function initializeSearchBoxes() {
    duna.http.get("/data/users").then(response => {
        duna.ui.SearchBox.from("#searchBox1", {
            template: `
                        <div class="ui segments">
                            <div class="ui grid segment" dn-item style='margin-top: 0'>
                                <div class="three wide column">
                                    <img dn-src="\${picture}" />
                                </div>
                                <div class="thirteen wide column">
                                        <div>\${name} (\${age})</div>
                                        <div>\${email}</div>
                                        <div>\${company}</div>
                                        <small style="color: grey">\${id}</small>
                                </div>
                            </div>
                        </div>
                    `,
            noRecordsTemplate: "<div class='ui segment'><strong><em>Nothing here!</em></strong></div>",
            source: response.data,
            activeItemClass: "secondary",
            fieldTemplate: "${name}",
            matchesTemplate: "<span class='ui label yellow'>${0}</span>",
            searchFields: ["name", "company"],
            onRender: (sender, args) => {
                console.log(args);
            }
        });
    });

    duna.ui.SearchBox.from("#searchBox2", {
        template: `
                    <div class="ui vertical menu">
                        <div class="item" dn-item>\${name} \${dynamic}</div>
                    </div>
                `,
        source: "/data/countries/${query}",
        fieldTemplate: "${name}",
        noRecordsTemplate: "<div class='item'>No records</div>",
        onBeforeRequest: (sender, args) => {
            duna.dom.addClass(args.element.parentElement, "loading");
        },
        onAfterRequest: (sender, args) => {
            duna.dom.removeClass(args.element.parentElement, "loading");

            // here is the perfect moment for any changes that 
            // you want make in data before it is rendering on the page
            args.data.filter(p => p.name === "Brazil").forEach(p =>
                p.dynamic = "&nbsp; <em style='color: red'>(land of terrible politicians)</em>"
            );
        }
    });

    new duna.ui.SearchBox(document.getElementById("searchBox3"), {
        template: `
                    <div class="ui vertical menu">
                        <div class="item" dn-item>\${name} (\${age})</div>
                    </div>
                `,
        fieldTemplate: "${name}, age: ${age}",
        noRecordsTemplate: "<div class='item'>No records</div>",
        source: (query) => {
            return window.axios.get("/data/users/" + query);
        },
        onBeforeRequest(sender, args) {
            duna.dom.addClass(args.element.parentElement, "loading")
        },
        onAfterRequest(sender, args) {
            duna.dom.removeClass(args.element.parentElement, "loading")
        },
        onItemSelected(sender, args) {
            document.querySelector("#sbUserId").innerHTML = "USER ID: " + args.data.id;
        }
    });
}

function initializeMaskEdits() {
    duna.ui.MaskEdit.from("#maskEdit1", {
        format: "(99) 9 9999-9999"
    });
    duna.ui.MaskEdit.from("#maskEdit2", {
        format: "AAA-9999"
    });
    new duna.ui.MaskEdit(document.getElementById("maskEdit3"), {
        format: "99/99/9999 99:99"
    });
}

function initializeLimiters() {
    duna.ui.Limiter.from("#limiter1", {
        showOnFocus: true
    });
    duna.ui.Limiter.from("#limiter2", {
        template: "<span class='ui teal label'>${len} of ${max} / ${rem} remaining characters.</span>",
        position: "bottom left"
    });
    new duna.ui.Limiter(document.getElementById("limiter3"), {
        template: "<span class='ui green label'>${len}/${max}</span>",
        position: "right top",
        preserve: true,
        onCreate(sender, args) {
            args.tooltip.addEventListener("animationend", e => {
                if (e.animationName === "flyOutDown")
                    args.tooltip.style.display = "none"
            }, false);
        },
        onShow(sender, args) {
            args.tooltip.className = "ui green label animating transition jiggle";
        },
        onHide(sender, args) {
            args.tooltip.style.display = "";
            args.tooltip.className = "ui green label animating transition out fly down";
        }
    });
}

function initialize() {
    var items = document.querySelectorAll(".ui a.item");
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            changeTab(this);
        }, false);
    }
}

function changeTab(item) {
    var selectedItem = document.querySelector(".ui a.item.active");
    if (selectedItem !== item)
        duna.dom.removeClass(selectedItem, "active");

    duna.dom.addClass(item, "active");

    var samples = document.querySelectorAll("[data-sample]");
    samples.forEach(function (element) {
        element.style.display = (element.dataset.sample === item.innerText)
            ? "block"
            : "none";
    }, this);
}

function dispose(controlName) {
    var baseSelector = "[data-sample=" + controlName + "]";
    var controls = [].slice.call(document.querySelectorAll(baseSelector + " input[type=text]"));
    if (controlName === "Limiter")
        controls = controls.concat.apply(controls, [].slice.call(document.querySelectorAll(baseSelector + " textarea")));

    controls.forEach(function (element) {
        element.$duna[0].dispose();
    });
}

initializeNumericBoxes();
initializeSearchBoxes();
initializeMaskEdits();
initializeLimiters();
initialize();
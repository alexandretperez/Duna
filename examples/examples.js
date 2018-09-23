function dispose(controlName) {
    let controls = [].slice.call(document.querySelectorAll("[data-sample='" + controlName + "']"));
    controls.forEach(c => {
        c.$duna[0].dispose();
    });
}


// >>>>>>>>>>>>>>>>>>>>> NUMERIC BOX <<<<<<<<<<<<<<<<<<<<< //

(function initNumericBoxes() {

    // using constructor
    let nb_integer = new duna.ui.NumericBox(document.getElementById("nb_integer"));

    // using the static method 'from'
    let nb_currency = duna.ui.NumericBox.from("#nb_currency", {
        scale: 2,
        format: "R$ n",
        groupingSeparator: ".",
        decimalSeparator: ","
    });

    let nb_custom = duna.ui.NumericBox.from("#nb_custom", {
        format: ["My number is: (-@)", "My number is: @", "My number is zero!"],
        min: -100,
        max: 200,
        placeholder: "@"
    });
})();



// >>>>>>>>>>>>>>>>>>>>> SEARCH BOX <<<<<<<<<<<<<<<<<<<<< //

(function initSearchBoxes() {

    // raw
    let rawConfig = {
        template: `
                <div class="uk-card uk-card-default uk-card-body">
                    <ul class="uk-nav uk-nav-default">
                        <li dn-item><a href="#">\${0}</a></li>
                    </ul>
                </div>
            `,
        minLength: 1,
        noRecordsTemplate: '<li><a href="#">No records!</a></li>',
        source: [
            "Alligator", "Ant", "Bee", "Bird", "Cat", "Cow",
            "Dog", "Dove", "Eagle", "Elephant", "Fish", "Fox",
            "Giraffe", "Gorilla", "Horse", "Human"
        ],
        matchesTemplate: '<span style="border-bottom: 1px solid #1e87f0">${0}</span>'
    };

    new duna.ui.SearchBox(document.getElementById("sb_static_raw"), rawConfig);

    // json
    let usersConfig = {
        template: `
                    <div class="uk-card uk-card-default uk-card-body">
                        <ul class="uk-nav uk-nav-default">
                            <li dn-item>
                                <a href="#">
                                    <div uk-grid>
                                        <div><img class="uk-border-pill" dn-src="\${picture}" /></div>
                                        <div>
                                            <div><strong>\${name}</strong></div>
                                            <div>\${email}</div>
                                            <div>\${company}</div>
                                            <small><em>\${id}</em></small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                `,
        minLength: 1,
        noRecordsTemplate: '<li><a href="#">No records!</a></li>',
        matchesTemplate: '<span style="border-bottom: 1px solid #f0506e">${0}</span>',
        searchFields: ["name", "company"],
        fieldTemplate: "${name}"
    };

    duna.http.get("/data/users").then(response => {
        usersConfig.source = response.data;
        duna.ui.SearchBox.from("#sb_static_json", usersConfig);
    });

    // url
    duna.ui.SearchBox.from("#sb_url", {
        template: `
                <div class="uk-card uk-card-default uk-card-body">
                    <ul class="uk-nav uk-nav-default">
                        <li dn-item><a href="#">\${name} \${dynamic}</a></li>
                    </ul>
                </div>
            `,
        noRecordsTemplate: '<li><a href="#">No records!</a></li>',
        source: "/data/countries/${query}",
        fieldTemplate: "${name}",
        matchesTemplate: '<span style="border-bottom: 1px solid #1e87f0">${0}</span>',
        onBeforeRequest: (sender, args) => {
            document.getElementById("sb_url_spinner").style.display = "inline";
        },
        onAfterRequest: (sender, args) => {
            document.getElementById("sb_url_spinner").style.display = "none";

            // here is the perfect moment for any changes that 
            // you want make in data before it is rendering on the page
            args.data.filter(p => p.name === "Brazil").forEach(p => {
                p.dynamic =
                    "&nbsp; <img src='data:image/png;base64,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' />"
            });
        }
    });

    // custom handler
    duna.ui.SearchBox.from("#sb_url_custom", Object.assign(usersConfig, {
        source: (query) => {
            console.log("Searching for " + query + "...");
            return axios.get("/data/users/" + query);
        },
        onBeforeRequest: (sender, args) => {
            document.getElementById("sb_url_custom_spinner").style.display = "inline";
        },
        onAfterRequest: (sender, args) => {
            document.getElementById("sb_url_custom_spinner").style.display = "none";
        },
        onItemSelected: (sender, args) => {
            document.querySelector("#sb_url_custom_user_info").innerHTML = "USER ID: " + args.data.id;
        }
    }));

    // custom root position
    duna.ui.SearchBox.from("#sb_modal", Object.assign(rawConfig, {
        root: "#modal_search_box > .uk-modal-body"
    }));
})();



// >>>>>>>>>>>>>>>>>>>>> MASK EDIT <<<<<<<<<<<<<<<<<<<<< //

(function initMaskEdit() {
    new duna.ui.MaskEdit(document.getElementById("me_cellphone"), {
        format: "(99) 9 9999-9999"
    });

    duna.ui.MaskEdit.from("#me_carplate", {
        format: "AAA-9999",
        allowPartial: true,
        trim: true
    });

    duna.ui.MaskEdit.from("#me_datetime", {
        format: "99/99/9999 99:99"
    });

    duna.ui.MaskEdit.from("#me_custom", {
        format: "**** 9999",
        translation: {
            '*': {
                test: v => true
            }
        }
    });
})();



// >>>>>>>>>>>>>>>>>>>>> LIMITER <<<<<<<<<<<<<<<<<<<<< //

(function () {
    new duna.ui.Limiter(document.getElementById("li_default"), {
        showOnFocus: true
    });

    duna.ui.Limiter.from("#li_complete", {
        template: "<small>${len} of ${max} / <span class='uk-label'>${rem}</span> remaining characters.</small>",
        position: "bottom left"
    });

    duna.ui.Limiter.from("#li_stylish", {
        template: "<span class='uk-label uk-label-success'>${len}/${max}</span>",
        position: "right top",
        preserve: true,
        offsetY: 10,
        offsetX: -5,
        onShow(sender, args) {
            args.tooltip.className = "uk-label uk-label-success uk-animation-slide-right";
        },
        onHide(sender, args) {
            args.tooltip.style.display = "";
            args.tooltip.className =
                "uk-label uk-label-success uk-animation-slide-left uk-animation-reverse";
        },
        onCreate(sender, args) {
            args.tooltip.addEventListener("animationend", e => {
                if (e.animationName === "uk-fade-left")
                    args.tooltip.style.display = "none";
            }, false);
        }
    });

    duna.ui.Limiter.from("#li_modal", {
        showOnFocus: true,
        template: "<span class='uk-badge'>${len}</span>",
        offsetY: -10,
        offsetX: 10,
        root: "#modal_limiter > .uk-modal-body"
    });
})();
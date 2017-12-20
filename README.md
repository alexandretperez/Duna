# Duna.js <!-- markdownlint-disable MD033 -->

Duna offers a small collection of javascript controls.

## Installation

In-browser usage:

```html
<script src="duna.js" />
```

Through NPM:

```javascript
npm install dunajs --save-dev
```

## Usage

All current controls has two syntaxes of initialization:

```javascript
// by element
new duna.ui.[ControlName](element, options);

// by css selector
duna.ui.[ControlName].from(selector, options);
```

In-browser usage:

```html
<script src="duna.js" />
<script>
    new duna.ui.NumericBox(document.getElementById("some"), {...})
</script>
```

On NPM:

```javascript
import * as duna from 'dunajs';

// e.g. using the css selector
duna.ui.Limiter.from("[maxlength]", { ... })
```

It's also possible to load only what do you need:

```javascript
import SearchBox from 'dunajs/lib/ui/SearchBox';

new SearchBox(element, options);
```

## Build and Examples

Clone the project.

Run the follow command lines:

```sh
npm install
npm run build
npm start
```

Then navigate to *localhost:3000* to see usage examples of all available controls.

If the 3000 port is already in use you can change it in *server.js* file.

## Available Controls

Currently there are four available controls in the library.

- NumericBox
- SearchBox
- MaskEdit
- Limiter

## Documentation

Check out the wiki pages.

## Credits

The Duna.js project is in development by Alexandre T. Perez under [MIT License](LICENSE).

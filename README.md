# Duna.js

Duna offers a small collection of javascript controls.

## Installation

In-browser usage:

```html
<script src="duna.js"></script>
```

Through NPM:

```javascript
npm install dunajs
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
<script src="duna.js"></script>
<script>
    new duna.ui.NumericBox(document.getElementById("some"), {...})
</script>
```

On NPM:

```javascript
import duna from 'dunajs';

// e.g. using the css selector
duna.ui.Limiter.from("[maxlength]", { ... })
```

It's also possible to load only what do you need:

```javascript
import { SearchBox } from 'dunajs/ui/SearchBox';

new SearchBox(element, options);
```

## Build and Examples

Clone the project.

Run the follow command lines:

```sh
npm install
npm run dev
```

## Available Controls

Currently there are four available controls in the library.

-   NumericBox
-   SearchBox
-   MaskEdit
-   Limiter

## Documentation

Check out the [wiki pages](https://github.com/alexandretperez/Duna/wiki).

## Credits

The Duna.js project is in development by Alexandre T. Perez under [MIT License](LICENSE).

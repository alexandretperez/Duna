# Changelog <!-- markdownlint-disable MD024 -->

Changes on this project will be documented here.

## 1.1.3 (2018-09-29)

### Changed
- package.json update.

## 1.1.2 (2018-09-28)

### Changed
- package.json update.

## 1.1.1 (2018-09-28)

### Changed
- A few tweaks in the build process and the TypeScript's configuration

## 1.1.0 (2018-09-22)

Changes to the build process.

The module paths was simplified to a more convenient way.

### Changed

- Now the features are imported as '**dunajs/**...' instead of '**dunajs/lib/**...'.


```javascript
// version <= 1.0.3
import * as http from 'dunajs/lib/http';
import NumericBox from 'dunajs/lib/ui/NumericBox';

// now
import * as http from 'dunajs/http';
import NumericBox from 'dunajs/ui/NumericBox';
```


## 1.0.3 (2018-09-01)

### Changed
- Typescript was updated to most recent version.

### Added
- MaskEdit's now supports Ctrl+C, Ctrl+X and Ctrl+V.

### Fixed 
- SearchBox's bug when the search criteria has a escape char '\\'

## 1.0.2 (2017-11-27)

### Added

- SearchBox and Limiter has now the "root" option. Read more on the Wiki pages.

## 1.0.1 (2017-11-15)

### Added

- Added to the repository the compiled duna.js at "lib" folder.

### Fixed

- SearchBox control not showing the correct results when the source is an a array of strings.
- SearchBox.options.minLength was declared but not implemented.

### Changed

- An error will be throw when SearchBox.options.source is not set.
- SearchBox.options.onDataReady was removed due the onAfterRequest callback has the same purpose.
- SearchBox.options.onBeforeRequest and onAfterRequest callbacks signature has changed.
- MaskEdit.options.trim has no use and was removed.

## 1.0.0 (2017-11-13)

Initial commit.
# Changelog <!-- markdownlint-disable MD024 -->

The notable changes on this project will be documented here.

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
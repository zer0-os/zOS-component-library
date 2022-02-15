# zOS Component Library

This package is the component library for zOS, many of the components within have been migrated from [Zero Web](https://github.com/m3m3n70/zero-web).

Note: At the moment all styles are exported through the index.css file. If you are using/developing components outside of zOS, you will need to import that file, as well as ensure that the relevant theme variables are defined in your page.

### Contribute to the Platform
There is always work to be done on the core platform, so if you've noticed a bug or want to get involved at a deeper level, feel free to open a PR, or get in touch with the core team. Be sure to check out the [contributing guidelines](CONTRIBUTING.md) before opening a PR.

Note: If adding a new component, ensure that you add an `@import` to that file. For details on themeing, please refer to the [zOS-theme-engine](https://github.com/zer0-os/zOS-theme-engine). All colors should be handled by the theme, in addition to context-relevant values such as radius that are meant to update with the theme.

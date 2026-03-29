# Build Helpers

Shared build setup package for handlebars-template-based projects.

## Scope

Use this package only for projects aligned with `projects/_project-templates/handlebars-template`.

## Exports

- `createHandlebarsWebpackCommonConfig(options)`
- `createHandlebarsWebpackDevConfig(options)`
- `createHandlebarsWebpackProdConfig(options)`

Compatibility aliases are also exported:

- `createCommonConfig`
- `createDevConfig`
- `createProdConfig`

## Entry overrides

Default entry discovery:

- `src/scripts.js` -> `scripts`
- `src/styles.scss` -> `styles`

Override with `entry`:

```js
createHandlebarsWebpackCommonConfig({
    entry: {
        scripts: 'src/main.js',
        styles: 'src/theme.scss',
        vendor: 'src/vendor.js',
    },
});
```

Advanced override with `entryResolver`:

```js
createHandlebarsWebpackCommonConfig({
    entryResolver: (cwd) => ({
        scripts: `${cwd}/src/scripts.js`,
    }),
});
```

## Options

- `entry`: object map of webpack entry names to file paths.
- `entryResolver(cwd)`: function that returns a webpack entry object.
- `handlebars.helperDirs`: helper directories (relative to project root unless absolute).
- `handlebars.partialDirs`: partial directories (relative to project root unless absolute).
- `html.templateParameters`: `HtmlWebpackPlugin` template parameters callback.
- `copy.patterns`: copy-webpack-plugin patterns override.
- `dev.merge`: merge object appended to dev config.
- `prod.merge`: merge object appended to prod config.

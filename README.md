# postcss-dark-and-light

[PostCSS] plugin for lighten and darken css based on [TinyColor]
and on the lighten / darken algorithm on [MdigiTools].

[PostCSS]: https://github.com/postcss/postcss
[TinyColor]: https://github.com/bgrins/TinyColor
[MdigiTools]:  https://mdigi.tools/lighten-color

```css
.foo {
  /* Darken */
  background: darken(#c84754, 40%);

  /* Lighten */
  background: lighten(#c84754, 40%);
}
```

```css
.foo {
  /* Darken */
  background: #7d252e;

  /* Lighten */
  background: #de9198;

}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-dark-and-light
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-dark-and-light'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

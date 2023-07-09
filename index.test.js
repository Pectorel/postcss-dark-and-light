const postcss = require('postcss')
const dedent = require("dedent");
const postcssSimpleVars = require('postcss-simple-vars')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let { plugins, ...pluginOpts } = opts

  if (plugins === undefined) {
    plugins = [plugin(pluginOpts)];
  }

  let result = await postcss(plugins).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('parses a var darken call', async () => {
  await run(
    dedent`
    $primary-color: #c84754;

    td { background: darken($primary-color, 40%); }
    `,
    dedent`
    td { background: #7d252e; }
    `,
    {
      logLevel: 'debug',
      plugins: [postcssSimpleVars, plugin]
    }
  )
})

it('parses a var lighten call', async () => {
  await run(
    dedent`
    $primary-color: #c84754;

    td { background: lighten($primary-color, 40%); }
    `,
    dedent`
    td { background: #de9198; }
    `,
    {
      logLevel: 'debug',
      plugins: [postcssSimpleVars, plugin]
    }
  )
})

/* Write tests here

it('does something', async () => {
  await run('a{ }', 'a{ }', { })
})

*/

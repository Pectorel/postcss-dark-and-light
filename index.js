// Imports
const valueParser = require('postcss-value-parser')
const log = require('loglevel').getLogger('postcss-lighten-darken')
const tinycolor = require('tinycolor2')

// Logic

function argsFromNode(node) {
  return node.nodes.filter(function (node) {
    return node.type === 'word' || node.type === 'function';
  }).map(function (node) {
    return node.type === 'function' ? node : node.value;
  });
}

function lighten(value, percent) {
  // Calculation based on this tool : https://mdigi.tools/darken-color/
  percent = (percent*(1-tinycolor(value).toHsl().l)*100)/100;
  return tinycolor(value).lighten(percent).toHexString();
}

function darken(value, percent) {
  // Calculation based on this tool : https://mdigi.tools/lighten-color/
  percent = (percent*((tinycolor(value).toHsl().l)*100))/100;
  return tinycolor(value).darken(percent).toHexString();
}

function handleFunc(decl, postcss) {

  const value = valueParser(decl.value).walk(node => {
    if (node.type === 'function') {
      let result = null;
      //log.debug(node);

      const args = argsFromNode(node);

      const color = args[0];
      const percentage = Number(args[1].replace('%', ''));

      log.info("Initial color is :", color);

      switch (node.value) {
        case 'lighten':
          result = lighten(color, percentage);
          break;
        case 'darken':
          result = darken(color, percentage);
          //result = darken(decl, node, postcss);
          break;
        default:
          return;
      }

      if (!result) {
        log.info(`Exiting after bad result.`);
        return;
      }

      log.info("Return value is : ", result);

      node.value = result;
      node.nodes = null
    }
  }).toString();

  log.debug('Setting decl value', value);
  decl.value = value;

}

// Module export
module.exports = (opts = {}) => {
  opts = {
    logLevel: 'debug',
    ...opts
  }

  log.setLevel(opts.logLevel)
  return {
    postcssPlugin: 'postcss-dark-and-light',

    Declaration(decl, postcss) {
      if (!decl.value.includes('lighten') && !decl.value.includes('darken')) {
        return;
      }

      handleFunc(decl, postcss);
      //log.debug('decl = ', decl);

    }

  }
}

module.exports.postcss = true

const rule = require('../lib/rules/no-unchecked-define')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('no-unchecked-define', rule, {
  valid: [
    {
      code: 'if (!window.customElements.get("foo-bar")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } '
    },
    {
      code: 'if (!customElements.get("foo-bar")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } '
    },
    {
      code: 'if (customElements.get("foo-bar") == null) { window.customElements.define("foo-bar", class extends HTMLElement {}) } '
    },
    {
      code: 'if (customElements.get("foo-bar") == undefined) { window.customElements.define("foo-bar", class extends HTMLElement {}) } '
    },
    {
      code: 'if (!!!customElements.get("foo-bar")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } '
    }
  ],
  invalid: [
    {
      code: 'window.customElements.define("foo-bar", class extends HTMLElement {})',
      errors: [
        {
          message:
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'if (customElements.get("foo-bar")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } ',
      errors: [
        {
          message:
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'if (!customElements.get("bar-foo")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } ',
      errors: [
        {
          message:
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLElement {})',
      errors: [
        {
          message:
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'if (!!customElements.get("foo-bar")) { window.customElements.define("foo-bar", class extends HTMLElement {}) } ',
      errors: [
        {
          message:
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined',
          type: 'CallExpression'
        }
      ]
    }
  ]
})

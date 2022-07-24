# iban-format

React component to format an iban (International Bank Account Number)

## Usage

ES6

```jsx
import IbanInput from 'iban-format';
```

ES5

```javascript
const IbanInput = require('iban-format');
```

## Props

| Props       | Options                 | Default      | Description                                                                                                                   |
| ----------- | ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| ibanFormat  | string                  | required     | here we define the iban mask that we should follow. the first two letters reprsent the country code and they are irremovable. |
| placeholder | string                  | empty string | the placeholder                                                                                                               |
| style       | css inline style object | empty object | you can use it to style the component container                                                                               |

## Example

```jsx
import IbanInput from 'iban-format';

<IbanInput
  ibanFormat="GBXX XXXX XXXX XXXX XXXX XX"
  placeholder="iban input field"
/>;
```

## Notes

## License

MIT

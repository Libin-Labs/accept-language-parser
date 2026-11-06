# @lp-labs/accept-language-parser

Parses Accept-Language quality values and selects a supported language deterministically.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/accept-language-parser
```

## Working example

```js
import { negotiateLanguage } from '@lp-labs/accept-language-parser';
console.log(negotiateLanguage('fr-CA, en;q=0.8', ['en', 'fr']));
```

CommonJS: `const api = require('@lp-labs/accept-language-parser')`.

## Behavior, customization and limits

Parses bounded language tags and q weights, preserving source order for ties. Selection tries exact tags, then supported primary-language matches; wildcard selects the first supported language. It does not perform full BCP 47 negotiation.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface LanguagePreference {
  readonly tag: string;
  readonly quality: number;
  readonly order: number;
}
export declare function parseAcceptLanguage(header: string): LanguagePreference[];
export declare function negotiateLanguage(
  header: string,
  supported: readonly string[],
): string | null;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.

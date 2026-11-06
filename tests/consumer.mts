import * as api from '@lp-labs/accept-language-parser';
import { negotiateLanguage } from '@lp-labs/accept-language-parser';
console.log(negotiateLanguage('fr-CA, en;q=0.8', ['en', 'fr']));
// @ts-expect-error invalid argument must be rejected by declarations
api.negotiateLanguage('en', [4]);

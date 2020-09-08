import Fuse from 'fuse.js';
import User from '@entities/User';

export const paramMissingError = 'One or more of the required parameters was missing.';
export const userNotFoundError = 'The user not found.';
export const queryParamMissingError = 'One or more of the required query parameters was missing.';


/**
 * The options to use for suggestion.
 * @reference https://fusejs.io/api/options.html
 */
export const fuseOptions: Fuse.IFuseOptions<User> = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    // includeMatches: false,
    findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ['login'],
};
import * as data from './config.json';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: data.google_api_key,
    authDomain: data.auth_domain,
    databaseURL: data.databaseURL,
    projectId: data.projectId,
    storageBucket: '',
    messagingSenderId: data.messagingSenderId
  }
};

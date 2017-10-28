[**WARNING**]: README file is currently in process of rewrite and will be released soon.

# jwt-authenticate

**jwt-authenticate** is easily configurable and **framework free** solution that provides local login/registration as well as Social login using Github, Facebook, Google and other OAuth providers.


The best part about this library is that it is not strictly coupled to one request handling library like [axios](https://github.com/axios/axios). You will be able to use it with different libraries. 



This library was created out of [vue-authenticate](https://github.com/dgrubelic/vue-authenticate) in order to be used in any JavaScript application no matter the framework.

## Supported OAuth providers and configurations

1. [Facebook](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L70)
2. [Google](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L83)
3. [Github](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L98)
4. [Instagram](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L110)
5. [Twitter](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L122)
6. [Bitbucket](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L131)
7. [LinkedIn](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L143)
8. [Microsoft Live](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L156)
9. [OAuth 1.0](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L169)
10. [OAuth 2.0](https://github.com/dgrubelic/jwt-authenticate/blob/master/src/options.js#L178)

## Installation
```bash
npm install jwt-authenticate

yarn add jwt-authenticate

bower install jwt-authenticate
```

## Usage

### Import package

CommonJS
```javascript
var JwtAuthenticate = require('jwt-authenticate');
var axios = require('axios');
```

ES2015
```javascript
import JwtAuthenticate from 'jwt-authenticate'
import axios from 'axios';
```

Browser
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/jwt-authenticate/dist/jwt-authenticate.min.js"></script>
```

### Create JwtAuthenticate instance
```javascript
var jwtAuth = new JwtAuthenticate({
  /**
   * Your API domain if you have providers that require server side implementation.
   * This is the case when you setup that your OAuth 2.0 provider has `responseType = 'code'`
   */
  baseUrl: 'http://localhost:3000',
  
  providers: {
    github: {
      clientId: '',
    }
  }
}, { $http: axios });
```

### Email & password login and registration
```javascript
jwtAuth.login({ email, password }).then(function () {
  // Execute application logic after successful login
})

jwtAuth.register({ name, email, password }).then(function () {
  // Execute application logic after successful registration
})
```



### Social account authentication

```javascript
jwtAuth.authenticate('github').then(res => console.log(res))
jwtAuth.authenticate('facebook').then(res => console.log(res))
jwtAuth.authenticate('google').then(res => console.log(res))
jwtAuth.authenticate('twitter').then(res => console.log(res))
// you see where this is going...
```


### Custom request and response interceptors

You can easily setup custom request and response interceptors if you use different request handling library.
In this example I used axios again, but you can use whatever request library you want as long as it can send request
like this:

```javascript
$http(requestConfig);

// ...or like this:
$http.post(requestConfig);
```

**Important**: You must set both `request` and `response` interceptors at all times using `bindRequestInterceptor` and `bindResponseInterceptor` configuration functions.

```javascript

/**
* This is example for request and response interceptors for axios library
*/
const jwtAuth = new VueAuthenticate({
  /**
   * @param {JwtAuthenticate} $auth
   */
  bindRequestInterceptor: function ($auth) {
    $auth.$http.interceptors.request.use((config) => {
      if ($auth.isAuthenticated()) {
        config.headers['Authorization'] = [
          $auth.options.tokenType, $auth.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  /**
   * @param {JwtAuthenticate} $auth
   */
  bindResponseInterceptor: function ($auth) {
    $auth.$http.interceptors.response.use((response) => {
      $auth.setToken(response)
      return response
    })
  }
}, { $http: axios })
```

If you use Vue.js and VueResource for handling requests, you can setup your interceptors like this

## License

The MIT License (MIT)

Copyright (c) 2017 Davor Grubelić

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

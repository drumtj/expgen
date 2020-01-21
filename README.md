# expgen

[![npm version](https://img.shields.io/npm/v/@drumtj/task-queue.svg?style=flat)](https://www.npmjs.com/package/@drumtj/expgen)
[![license](https://img.shields.io/npm/l/@drumtj/expgen.svg)](#)

easy javascript regular expression

## Features

* wildcard # @ ? ! (number, not number, single character that may or may not exist, a single character that must exist)
* preset in characterset (korean, alphabet, alphabet-lowercase, alphabet-uppercase, alphabet+number, number, hex, symbol)
* preset (number, email, domain, image file extension, hexadecimal, rgb, rgba)
* automatic backslash in characterset
* getter {}
* extends method (wrap, unwrap, get, getAll)

## Installing

Using npm:

```bash
$ npm install @drumtj/expgen
```

Using cdn:

```html
<script src="https://unpkg.com/@drumtj/expgen@1.0.9/dist/expgen.js"></script>
```

Using amd, commonjS Module

```js
const expgen = require('@drumtj/expgen');
```

```js
import expgen from '@drumtj/expgen';
```

## How To

### characterset []

```js
// native regular expression


// Alphabet lowercase
expgen("[a-z]"); // /^[a-z]$/
expgen("[&en]"); // /^[a-z]$/
// not
expgen("[^&en]"); // /^[^a-z]$/

// Alphabet uppercase
expgen("[A-Z]"); // /^[A-Z]$/
expgen("[&EN]"); // /^[A-Z]$/
// not
expgen("[^&EN]"); // /^[^A-Z]$/

// Alphabet all
expgen("[a-zA-Z]"); // /^[a-zA-Z]$/
expgen("[&en&EN]"); // /^[a-zA-Z]$/
expgen("[&a]"); // /^[a-zA-Z]$/
// not
expgen("[^&a]"); // /^[^a-zA-Z]$/

// Number 0~9
expgen("[0-9]"); // /^[0-9]$/
expgen("[&d]"); // /^[0-9]$/
expgen("\\d"); // /^\d$/
// not Number
expgen("[^&d]"); // /^[^0-9]$/

// Alphabet + 0~9
expgen("[a-zA-Z0-9]"); // /^[a-zA-Z0-9]$/
expgen("[&en&EN&d]"); // /^[a-zA-Z0-9]$/
expgen("[&w]"); // /^[a-zA-Z0-9]$/
expgen("\\w"); // /^\w$/
// not Alphabet + 0~9
expgen("[^&w]"); // /^[^a-zA-Z0-9]$/

// Korean
expgen("[ㄱ-힣]"); // /^[ㄱ-힣]$/
expgen("[&ko]"); // /^[ㄱ-힣]$/
// not Korean
expgen("[^&ko]"); // /^[^ㄱ-힣]$/

// Hexa Decimal
expgen("[0-9a-fA-F]"); // /^[0-9a-fA-F]$/
expgen("[&h]"); // /^[0-9a-fA-F]$/
// not
expgen("[^&h]"); // /^[0-9a-fA-F]$/

// Special Characters
expgen(`[-\\'\\"!@#$%^&*(){},.+~:;_|\\/?<>\\[\\]\`]`); // /^[-\'\"!@#\$%^&\*\(\)\{\},\.\+~:;_\|\/\?<>\[\]`]$/
expgen("[&sb]"); // /^[\-\'\"!@#\$%\^&\*\(\)\{\},\.\+~:;_\|\/\?\<\>\[\]`\\]$/
// not
expgen("[^&sb]"); // /^[^\-\'\"!@#\$%\^&\*\(\)\{\},\.\+~:;_\|\/\?\<\>\[\]`\\]$/


///// test example /////
expgen("[&a][&a][&a]").test("aA0"); // true
expgen("0x[&h][&h][&h][&h][&h][&h]").test("0xa8f4e3"); // true
expgen("0x[&h][&h][&h][&h][&h][&h]").test("0xg8f4e3"); // false
```

### group, or : (), |
```js
expgen("i like (apple|banana)").test("i like apple"); // true
expgen("i like (apple|banana)").test("i like banana"); // true
```

### character, characterset, group repeat : {n,n}, +, *
```js
//fixed length
expgen("a{2}");   // 'aa'
expgen("abc{2}");  // 'abcc'

//range
expgen("a{0,2}"); // '' ~ 'aa'
expgen("a{1,2}"); // 'a' ~ 'aa'

//same 1
expgen("a{0,}"); // '' ~ 'aaaaaaaaaa...'
expgen("a*");    // '' ~ 'aaaaaaaaaa...'

//same 2
expgen("a{1,}"); // 'a' ~ 'aaaaaaaaaa...'
expgen("a+");    // 'a' ~ 'aaaaaaaaaa...'

expgen("(ab)+");    // 'ab' ~ 'abababab...'
expgen("(ab)*");    // '' ~ 'abababab...'
expgen("(ab){1,}");    // 'ab' ~ 'abababab...'
expgen("[ab]{1,}");    // 'aa' ~ 'aaaaaaaa...',  'bb' ~ 'bbbbb...',  'ab' ~ 'bbabbababbbb...'


///// test example /////
expgen("[&a]{3}").test("aA0"); // true
expgen("0x[&h]{6}").test("0xa8f4e3"); // true
```

### getter {}
```js
expgen("i like {(apple|banana)}").get("i like banana"); // ["banana"]

///// test example /////
expgen("0x{[&h]{6}}").get("0xa8f4e3"); // ["a8f4e3"]
```

### wildcard [? ! @ #]
```js

// any character
expgen("."); // /^.$/

// with or without character (a-z, A-Z, 0-9, korean)
expgen("?"); // /^(?:[a-zA-Z0-9ㄱ-힣]?)$/

// One character that must be (a-z, A-Z, 0-9, korean)
expgen("!"); // /^[a-zA-Z0-9ㄱ-힣]$/

// without number
expgen("@"); // /^\D$/

// number character
expgen("#"); // /^\d$/

expgen("[&EN]-###-[&EN]####").test("A-384-F0909"); // true
expgen("[&EN]-###-[&EN]####").test("$-384-F0909"); // false
expgen("[&EN]-###-[&EN]####").test("1-384-F0909"); // false
expgen("@-###-@####").test("A-384-F0909"); // true
expgen("@-###-@####").test("$-384-F0909"); // true
expgen("@-###-@####").test("1-384-F0909"); // false
expgen("!-###-!####").test("A-384-F0909"); // true
expgen("!-###-!####").test("$-384-F0909"); // false
expgen("!-###-!####").test("1-384-F0909"); // true

expgen("???[.]txt").test("ab.txt"); // true
expgen("???[.]txt").test("abc.txt"); // true
expgen("???[.]txt").test("abcd.txt"); // false

expgen("!!![.]txt").test("ab.txt"); // false
expgen("!!![.]txt").test("abc.txt"); // true
expgen("!!![.]txt").test("abcd.txt"); // false
// ex) 3~6 character(a-zA-Z0-9)
expgen("!!!???").test("aa"); // false
expgen("!!!???").test("aaa"); // true
expgen("!!!???").test("aaaaaa"); // true
expgen("!!!???").test("aaaaaaa"); // false
// same
expgen("[a-zA-Z0-9]{3,6}");


////////// use getter ///////////

// get character at
expgen("??{?}?").get("abcde"); // [""]
expgen("??{?}?").get("abcde"); // ["c"]
expgen("??{?}?").get("bcde"); // ["d"]
expgen("??{?}?").get("cde"); // ["e"]
expgen("??{?}?").get("de"); // [""]

// ex) file validation
expgen("thumb-?*[.](png|jpg)").test("thumb-content.jpg"); // true
// ex) extract file extension
expgen("thumb-?*[.]{(png|jpg)}").get("thumb-content.jpg"); // ["jpg"]
// ex) extract part of the file name
expgen("thumb-{?*}[.](png|jpg)").get("thumb-content.jpg"); // ["content"]
// ex) fullname, ext
expgen("{thumb-?*[.]{(png|jpg)}}").get("thumb-content.jpg"); // ["thumb-content.jpg", "jpg"]

// '?' Wildcards play a different role when used with groups or charactersets.
expgen("(aaa)?"); // /^(?:aaa)?$/
expgen("(aaa)?").test("aaa"); // true
expgen("(aaa)?").test(""); // true

expgen("[abc]?"); // /^[abc]?$/
// like a
expgen("(a|b|c)?"); // /^(?:a|b|c)?$/

// wrong example
expgen("{###}?"); // /^(\d\d\d)(?:[a-zA-Z0-9ㄱ-힣]?)$/
// correct example
expgen("{(###)?}"); // /^((?:\d\d\d)?)$/


expgen("i(phone|pot|pad)").test("ipad"); // true
expgen("i(phone|pot|pad)").test("iphone"); // true
expgen("(android|i(phone|pot|pad))").test("iphone"); // true
expgen("(android|i(phone|pot|pad))").test("android"); // true
expgen("(!!droid|i(phone|pot|pad))").test("AAdroid"); // true
expgen("(!+droid|i(phone|pot|pad))").test("Adroid"); // true
expgen("(!+droid|i(phone|pot|pad))").test("ABCDdroid"); // true


expgen("######-#######").test("841122-1234567"); // true
expgen("#{6}-#{7}").test("841122-1234567"); // true

expgen("{######}-{#######}").get("841122-1234567"); // ["841122", "1234567"]
expgen("{#{6}}-{#{7}}").get("841122-1234567"); // ["841122", "1234567"]


expgen("{##}{##}{##}-{#}######").get("841122-1234567"); // ["84", "11", "22", "1"]

expgen("######-#######").getAll("aaaaa841122-1234567bbbb861222-2234567kkkkk871002-1111567xxxx"); // ["841122-1234567", "861222-2234567", "871002-1111567"]
expgen("{##}{##}{##}-{#}######").getAll("aaaaa841122-1234567bbbb861222-2234567kkkkk871002-1111567xxxx");
// [
//   //year, month, date, gender
//   ["84", "11", "22", "1"],
//   ["86", "12", "22", "2"],
//   ["87", "10", "02", "1"]
// ]
expgen("{{##}{##}{##}}-{{#}######}").getAll("aaaaa841122-1234567bbbb861222-2234567kkkkk871002-1111567xxxx");
// [
//   ["841122", "84", "11", "22", "1234567", "1"],
//   ["861222", "86", "12", "22", "2234567", "2"],
//   ["871002", "87", "10", "02", "1111567", "1"]
// ]


expgen("010-####-####").test("010-1234-5678"); // true
expgen("01[016789]-###(#)?-####").test("011-123-4567"); // true
expgen("01[016789]-###(#)?-####").test("010-1234-5678"); // true
expgen("01[016789]-#{3,4}-#{4}").test("010-1234-5678"); // true
expgen("\\(#{2,3}\\)#{3,4}-####").test("(031)123-4567"); // true
expgen("\\(#{2,3}\\) #{3,4}-####").test("(031) 123-4567"); // true
expgen("\\(#{2,3}\\) #{3,4}-####").test("(031)123-4567"); // false
expgen("\\(#{2,3}\\)[ ]?#{3,4}-####").test("(031) 123-4567"); // true
expgen("\\(#{2,3}\\)[ ]?#{3,4}-####").test("(031)123-4567"); // true

expgen("###-####-####"); // /^\d{1,3}\-\d{1,4}\-\d{1,4}$/

expgen("010-####-####").test("000-1111-2222"); // false

expgen("01[0156789]-###(#)?-####").test("000-000-0000"); // true
var exp = expgen("01[0156789]@###(#)?@####")
exp.test("000-000-0000"); // true
exp.test("000.000.0000"); // true

var exp = expgen("01[0156789](@)?###(#)?(@)?####")
exp.test("000-000-0000"); // true
exp.test("0000000000"); // true

expgen("###-###[6]?-####").test("000-000-0000"); // true
expgen("###-###[6]?-####").test("000-0001-0000"); // false
expgen("###-###[6]?-####").test("000-0006-0000"); // true

expgen("###-###(6|7)-####").test("000-0000-0000"); // false
expgen("###-###(6|7)-####").test("000-0006-0000"); // true
expgen("###-###(6|7)-####").test("000-0007-0000"); // true

expgen("###-###(#)?-####").test("000-000-0000"); // true
expgen("###-###(#)?-####").test("000-0000-0000"); // true
expgen("###-###(#)?-####").test("000-00000-0000"); // false

expgen("\\(###\\)###-####-####").test("(031)657-1234-5678"); // true

expgen("(\\(###\\))?###-####-####").test("657-1234-5678"); // true
expgen("[(###)]?###-####-####").test("(031)657-1234-5678"); // true

expgen("[(###)|###)]?[ ]?###-####-####").test("657-1234-5678"); // true
expgen("[(###)|###)]?[ ]?###-####-####").test("031)657-1234-5678"); // true
expgen("[(###)|###)]?[ ]?###-####-####").test("031) 657-1234-5678"); // true
expgen("[(###)|###)]?[ ]?###-####-####").test("(031)657-1234-5678"); // true
expgen("[(###)|###)]?[ ]?###-####-####").test("(031) 657-1234-5678"); // true

expgen("###-####-{####}").get("000-123-4567"); // [4567]
expgen("{###}-{####}-{####}").get("000-123-4567"); // [000, 123, 4567]
expgen("{###}-{{####}-{####}}").get("000-123-4567"); // ["000", "123-4567", "123", "4567"]

```

### presets
```js

// you can access and editing presets via the 'presets' attribute.
console.log(expgen.presets);

// email validation
expgen("&email"); // /^([a-zA-Z][a-zA-Z0-9-_]*\@[a-zA-Z][a-zA-Z0-9-_]*(?:\.[a-zA-Z]+){1,2})$/
expgen("&email").test("test@google.com"); // true
expgen("&email").test("test1@google.com"); // true
expgen("&email").test("1test@google.com"); // false
expgen("&email").test("test@google1.com"); // true
expgen("&email").test("test@1google.com"); // false
expgen("&email").test("test@google.com1"); // false
expgen("&email").test("test@google.1com"); // false
expgen("&email").test("test@test.co.kr"); // true
expgen("&email").test("test@test.aa.co.kr"); //false
expgen("&email").get("test@test.co.kr"); // ["test@test.co.kr", "test", "test.co.kr"]

// number validation
expgen("&number"); // /^([-\+]?[0-9]+(?:[\.][0-9]+)?(?:e[\+][0-9]+)?)$/
expgen("&number").test("19"); // true
expgen("&number").get("19"); // ["19", "", "19", undefined, undefined]
expgen("&number").test("+19"); // true
expgen("&number").get("+19"); // ["+19", "+", "19", undefined, undefined]
expgen("&number").test("-19.55"); // true
expgen("&number").get("-19.55"); // ["-19.55", "-", "19", "55", undefined]
expgen("&number").test("-5.555555555555555e+33"); // true
expgen("&number").get("-5.555555555555555e+33"); // ["-5.555555555555555e+33", "-", "5", "555555555555555", "e+33"]
// hexadecimal validation
expgen("&hex"); // /^((?:0x|\#)((?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})))$/
expgen("&hex").test("#1f1f1f");
expgen("&hex").test("0x1f1f1f");
expgen("&hex").get("0x1f1f1f"); // ["0x1f1f1f", "1f1f1f"]

// rgb validation
expgen("&rgb"); // /^(rgb\(([0-9]+), *([0-9]+), *([0-9]+)\))$/
expgen("&rgb").test("rgb(123,123,123)"); // true
expgen("&rgb").test("rgb(123, 123, 123)"); // true
expgen("&rgb").get("rgb(123, 123, 123)"); // ["rgb(123, 123, 123)", "123", "123", "123"]

// rgba validation
expgen("&rgba"); // /^(rgba\(([0-9]+), *([0-9]+), *([0-9]+), *([0-9]+(?:[\.][0-9]+)?)\))$/
expgen("&rgba").test("rgba(111,111,222,0.1)"); // true
expgen("&rgba").test("rgba(111, 111, 222, 1)"); // true

// symbol validation
expgen("&symbol"); // /^([\-\'\"!@#\$%\^&\*\(\)\{\},\.\+~:;_\|\/\?\<\>\[\]`\\]+)$/
expgen("&symbol").test("%"); // true
expgen("&symbol").test("f"); // false

// image file extension name validation
expgen("&imgext"); // /^((?:png|jpg|jpeg|gif|tif|bmp|ai|svg|jpe|jfif|jp2|j2c|psd|tga|taga))$/
expgen("&imgext").test("png"); // true
expgen("&imgext").test("tif"); // true
expgen("[-&w]*[.]&imgext").test("thumb-content.jpeg"); // true

// domain validation
expgen("&domain").test("http://test.domain.net"); // true
expgen("&domain").get("http://test.domain.net"); // ["http://test.domain.net", "http", "test.domain.net"]

```

### RegExp extends function
```js
expgen("hi"); // /^hi$/
expgen("hi").unwrap(); // /hi/
expgen("hi").unwrap().wrap(); // /^hi$/

expgen("&number").get("234.23"); // ["234.23", "", "234", "23", undefined]
expgen("&number").getAll("234.23-453,343aaaa-1.4444444444e+2;;;444");
// [
//   ["234.23", "", "234", "23", undefined]
//   ["-453", "-", "453", undefined, undefined]
//   ["343", "", "343", undefined, undefined]
//   ["-1.4444444444e+2", "-", "1", "4444444444", "e+2"]
//   ["444", "", "444", undefined, undefined]
// ]

expgen("{010##}").getAll("sdfsdf01055sefse01022sfsdf01033");
// [
//   ["01055"],
//   ["01022"],
//   ["01033"]
// ]

// remove Special character
var text = `sdfawsef@#$%DFGSDfgd,.?L<;ksdf|}A{Ss$T@!@\`312"`;
var result = text.replace(expgen("&symbol", "g").unwrap(), ''); // "sdfawsefDFGSDfgdLksdfASsT312"
```

### Advanced example
```js
window.fetch("https://www.google.com")
  .then(res=>res.text())
  .then(data=>{
    console.error("used hexadecimal list", expgen("&hex").getAll(data));
    return data;
  })
  .then(data=>{
    console.error("used rgba list", expgen("&rgba").getAll(data));
    return data;
  })
  .then(data=>{
    console.error("found email format", expgen("&email").getAll(data));
    return data;
  })
  .then(data=>{
    console.error("found image url", expgen("&img").getAll(data));
    return data;
  })
  .then(data=>{
    console.error("found domain format", expgen("&domain").getAll(data));
    return data;
  })
  .then(data=>{
    console.error("remove symbol", data.replace(expgen("&symbol", "g").unwrap(), ''));
    return data;
  })
```


## License

MIT

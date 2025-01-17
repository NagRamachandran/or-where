# orWhere
orWhere is a Laravel inspired filter builder for Javascript arrays. It allows the dynamic building of complex filters using the `where`, `orWhere`, `whereIncludes`, `whereIn` and `whereContains` methods.

## Example
orWhere allows the writing of more user-friendly code when filtering through a large arrays of Objects (e.g. information from a database). Here's an example without and with orWhere:

### Without orWhere
```javascript
users.filter(user => {
    return (user.name == 'Angus' || user.name == 'Jess' || user.name == 'Aaron') && user.age >= 25;
});

```

### With orWhere
```javascript
filter = new Builder(users);
filter.whereIn('name', ['Angus', 'Jess', 'Aaron'])
      .where('age', '>=', 25)
      .get()
```

## Installation

```shell
npm i --save or-where
```
or
```shell
yarn add or-where
```

## Setup

To set up use of orWhere's `Builder` your file may look like the following

```javascript
//CommonJS
var Builder = require('or-where');
var builder = new Builder(data);

//ES6+
import Builder from 'or-where';
let builder = new Builder(data);
```

## Methods

In order to provide a bit of context I'll be using the following dataset all examples 

```javascript
const data = [
    {
        name: 'Angus',
        age: 24,
        hobbies: [
            {name: 'swimming', hoursNeeded: 2},
            {name: 'running', hoursNeeded: 1}
        ]
    },
    {
        name: 'Jess',
        age: 25,
        hobbies:[
            {name: 'swimming', hoursNeeded: 2},
            {name: 'reading', hoursNeeded: 3},
        ]
    },
    {
        name: 'Aaron',
        age: 25,
        hobbies:[
            {name: 'go-karting', hoursNeeded: 3}
            {name: 'reading', hoursNeeded: 1}
        ]
    }
];
```

### where
The `where` method is the most basic filter. It matches an object based on the parameters you pass to it. When you chain `where` calls they act as an `and`(`&&`) operator between conditions. You can use `where` in four different ways.

```javascript
where(keyName)
```
This usage checks that the value in the assigned keyname evaluates to true. e.g. `where('name').get()` would check that the name value in the object is not falsy (false, 0, "", null, undefined)

```javascript
builder.where(keyName, value)
```
This usage assumes that the operation that the user wants is `===`. Therefore `where('name', 'Angus).get()` would check that the name value in the object is equal to `'Angus'`.

```javascript
builder.where(keyName, operation, value)
```
This allows the user to specify the `keyName`, `operator`, and `value`. e.g `where('age', '>=', 25).get()` would return only the objects in the array with a `age` key which has a value greater than or equal to `25`.

```javascript
builder.where(query => {});
```
This allows the user to scope conditions so that they only compare with the other conditions in the closure. See the example below for more detail.

```javascript
builder.where(query => {
    query.where('name', 'Angus')
         .orWhere('name', 'Jess')
})
.where('age', '>=', 25)
.get();
```
This would filter out any items where then name is neither `Angus` nor `Jess` and the age is under 25. so 
```javascript
[{name: 'Jess', age: 25, ...truncated}]
```
would be returned.

### orWhere
This can be used in the exact same way as `where()` however it acts as an `or` (` || `) operator rather than an `and`(`&&`).

### whereIncludes / orWhereIncludes
The `whereIncludes` method is useful when you need to check if an object property that is an array contains a certain value. The `whereIncludes` method takes 2 or 3 parameters.
```javascript
builder.whereIncludes(key, keyToFind, value)
```
The best way to show this is with an example:
```javascript
/** 
* Returns the following
*    [{
*        name: 'Angus',
*        age: 24,
*        hobbies: [
*            {name: 'swimming', hoursNeeded: 2},
*            {name: 'running', hoursNeeded: 1}
*        ]
*    },
*    {
*        name: 'Jess',
*        age: 25,
*        hobbies:[
*            {name: 'swimming', hoursNeeded: 2},
*            {name: 'reading', hoursNeeded: 3},
*        ]
*    }]
*/
builder.whereIncludes('hobbies', 'name', 'swimming').get();
```
The alternate option is that you can use `whereIncludes` with only two parameters. The `key` and the `value`. This is ideal for checking that simple arrays (e.g ['swimming', 'cycling', 'diving']) contain a value.

```javascript
builder.whereIncludes(key, value)
```
If we imagine that `hobbies` is an array of strings rather than objects
```javascript
// Returns the objects`Jess` and `Aaron`.
builder.whereIncludes('hobbies', 'reading').get()
```

### whereIn / orWhereIn
Runs a check to see whether the `value` of the object is contained within the array provided. Useful to shorten multiple `orWhere` checks on the same `key`

```javascript
// Returns the objects for `Angus` and `Jess`
builder.whereIn('name', ['Angus', 'Jess']).get()
```


### whereContains / orWhereContains
Runs a case insensitive check to see if the `value` in the object contains the given string. Useful with search.

```javascript
// Returns the objects for `Angus` and `Aaron`
builder.whereContains('name', 'a').get()
```

### Get
The `get` method is vital in all uses of the `Builder`. All the `where` methods build a query and the `get` method runs the filter and returns the value of the filtered data.

```javascript
// Returns an instance of the builder object
builder.where('name', 'Angus')

// Returns the filtered data
builder.where('name', 'Angus').get()
```

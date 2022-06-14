const {
  flow,
  map,
  pick,
  filter,
  sortBy,
  groupBy,
  mapValues,
} = require('lodash/fp');

export default class FilterBuilder {
  constructor() {
    this.resetQuery();
  }

  select(keys) {
    // this.flow.push(map((x) => pick(keys)(x)));
    this.selectKeys = [...new Set([...this.selectKeys, ...keys])];
    return this;
  }

  where(...query) {
    this.makeAnd();
    if (typeof query[0] === 'function') {
      this.query += '(';
      query[0](this);
      this.query += ')';
    } else {
      if (query.length === 1) {
        this.query += `(item.${query[0]})`;
      } else if (query.length === 2) {
        this.query += `(item.${query[0]} == ${
          typeof query[1] === 'string' ? '"' + query[1] + '"' : query[1]
        })`;
      } else if (query.length === 3) {
        this.query += `(item.${query[0]} ${query[1]} ${
          typeof query[2] === 'string' ? '"' + query[2] + '"' : query[2]
        })`;
      }
    }
    return this;
  }

  orWhere(...query) {
    this.query += ' || ';
    return this.where(...query);
  }

  whereIncludes(list, key, value = null) {
    this.makeAnd();
    if (value == null) {
      this.query += `(item.${list} ? item.${list}.includes('${key}') : false)`;
      return this;
    }
    this.query += `(item.${list} ? item.${list}.some(element => element.${key} === '${value}') : false)`;
    return this;
  }

  orWhereIncludes(list, key, value = null) {
    this.query += ' || ';
    this.whereIncludes(list, key, value);
    return this;
  }

  whereContains(key, value) {
    this.makeAnd();
    this.query += `(item.${key} ? item.${key}.toLowerCase().includes('${value.toLowerCase()}') : false)`;
    return this;
  }

  orWhereContains(key, value) {
    this.query += ' || ';
    this.whereContains(key, value);
    return this;
  }

  whereIn(key, list) {
    this.makeAnd();
    this.query += `(item.${key} ? ["${list.join(
      '", "',
    )}"].includes('' + item.${key}) : false)`;
    return this;
  }

  orWhereIn(key, list) {
    this.query += ' || ';
    this.whereIn(key, list);
    return this;
  }

  makeAnd() {
    if (this.query.slice(-1).includes(')')) {
      this.query += ' && ';
    }
  }

  sort(keys) {
    // this.flow.push(sortBy(keys));
    this.sortKeys = [...new Set([...this.sortKeys, ...keys])];
    return this;
  }

  group(keys) {
    this.groupKeys = [...new Set([...this.groupKeys, ...keys])];
    return this;
  }

  #nest = (key) => (array) => {
    if (!key.length) return array;
    const first = key[0];
    const rest = key.slice(1);
    return mapValues((x) => this.#nest(rest)(x))(groupBy(first)(array));
  };

  #stripEmpties() {
    this.query = this.query.replace(/&& \(\)/g, '');
    this.query = this.query.replace(/\(\)\s\s&&/g, '');
    this.query = this.query.replace(/\(\)\s&&/g, '');
  }

  get(data) {
    this.#stripEmpties();
    return flow(
      filter((item) => new Function('item', `'use strict';return ${this.query};`)(item)),
      map((x) => pick(this.selectKeys)(x)), // this for select
      sortBy(this.sortKeys), // this for sort
      this.#nest(this.groupKeys), // this for group
    )(data);
  }

  resetQuery() {
    this.query = '';
    this.selectKeys = [];
    this.sortKeys = [];
    this.groupKeys = [];
  }
}

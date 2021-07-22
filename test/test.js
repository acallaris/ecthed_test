import { describe, it } from 'mocha';
import { model, etch } from '@etchedjs/etched';
import type, * as types from '@etchedjs/type';

describe('@etchedjs/etched, @etchedjs/type', () => {
  it('model(), etch()', () => {
    const token = model({
      set type(x) {
        if (typeof x !== 'string' || !x.length) {
          throw new Error('Invalid value')
        }
      },
      set value(x) {
        if (typeof x !== 'string' || !x.length) {
          throw new Error('Invalid value')
        }
      }
    });

    let string = etch(token, {
      type: 'string',
      value: 'hello world'
    });

    console.assert(string.type === 'string');
    console.assert(string.value === 'hello world');

    string = etch(string, {
      value: '123'
    });

    console.assert(string.type === 'string');
    console.assert(string.value === '123');
  });

  it('model(), type()', () => {
    const user = model({
      set name(value) {
        if (!value.length) throw new Error('Invalid username');
      },

      set id(value) {
        if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid ID');
      }
    });

    model(
      user,
      type('name', types.string, e => e()),
      type('id', types.number, e => e()),
    );
  });
});
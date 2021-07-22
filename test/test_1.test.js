import { describe, it } from 'mocha';
import { model, etch } from '@etchedjs/etched';

describe('@etchedjs/etched - Test 1', () => {
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
});
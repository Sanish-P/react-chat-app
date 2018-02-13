import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const sessionStorageMock = {
  store: {},
  getItem: function (key) {
    return this.store[key]
  },
  setItem: function (key, value) {
    this.store[key] = value;
  }
}

global.sessionStorage = sessionStorageMock;

configure({ adapter: new Adapter()})

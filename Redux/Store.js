import { legacy_createStore as createStore} from 'redux';
import reducer from './Reducer';

const store = createStore(reducer);

export default store;

store.subscribe(() => console.log("Store updated: ", store.getState().REQUESTS)); // Log the updated store state

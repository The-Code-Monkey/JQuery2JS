export const CONVERTED = 'convert/CONVERTED';
export const UPDATE_VANILLA = 'convert/UPDATE_VANILLA';

const initialState = {
  converted: null,
  vanillaJS: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VANILLA: {
      return {
        ...state,
        vanillaJS: action.payload
      }
    }
    case CONVERTED: {
      return {
        ...state,
        converted: action.payload
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export const clearConverted = () => dispatch => {
  dispatch({
    type: CONVERTED,
    payload: null
  });
  dispatch({
    type: UPDATE_VANILLA,
    payload: ''
  })
};

export const convert = data => dispatch => {
  const jQuery = data.data;
  let newStr = '';
  const jQuerySplit = data.data.split(/(?<!['"])\./g);
  jQuerySplit.forEach((item, i) => {
    switch (true) {
      case item === 'show()': {
        console.log('matched show()');
        const newItem = `style.display = "";`;
        dispatch(updateVanillaJS(newItem));
        break;
      }
      case item === 'hide()': {
        console.log('matched hide()');
        const newItem = `style.display = none;`;
        dispatch(updateVanillaJS(newItem));
        break;
      }
      case item.match(/^\$\("#[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementById');
        const newItem = `document.getElementById('${item.split('"')[1].substring(1, item.split('"')[1].length)}')`;
        dispatch(updateVanillaJS(newItem));
        break;
      }
      case item.match(/^\$\("\.[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementsByClassName');
        const newItem = `document.getElementsByClassName('${item.split('"')[1].substring(1, item.split('"')[1].length)}')`;
        dispatch(updateVanillaJS(newItem));
        break;
      }
      case item.match(/^\$\("[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementsByTagName');
        const newItem = `document.getElementsByTagName('${item.split('"')[1]}')`;
        dispatch(updateVanillaJS(newItem));
        break;
      }
      default: {
        console.log('matched nothing');
        dispatch(updateVanillaJS(item));
      }
    }
  });
};

export const updateVanillaJS = string => (dispatch, getState) => {
  let vanillaJS = getState().convert.vanillaJS;
  console.log(vanillaJS.substring(vanillaJS.length - 1));
  if (vanillaJS === '') {
    vanillaJS = `${string}`;
  } else if (vanillaJS.substring(vanillaJS.length - 1) === ';') {
    vanillaJS = `${vanillaJS} ${string}`;
  } else {
    vanillaJS = `${vanillaJS}.${string}`;
  }
  dispatch({
    type: UPDATE_VANILLA,
    payload: vanillaJS
  });
  dispatch({
    type: CONVERTED,
    payload: vanillaJS
  });
};
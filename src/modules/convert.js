export const convert = data => {
  let toReturn = '';

  const jQuery = data;
  const jQuerySplit = jQuery.split(/(?<!['"])\./g);
  jQuerySplit.forEach((item, i) => {
    switch (true) {
      case item === 'show()': {
        console.log('matched show()');
        const newItem = `style.display = "";`;
        toReturn = updateVanillaJS(newItem);
        break;
      }
      case item === 'hide()': {
        console.log('matched hide()');
        const newItem = `style.display = none;`;
        toReturn = updateVanillaJS(newItem);
        break;
      }
      case item.match(/^\$\("#[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementById');
        const newItem = `document.getElementById('${item.split('"')[1].substring(1, item.split('"')[1].length)}')`;
        toReturn = updateVanillaJS(newItem);
        break;
      }
      case item.match(/^\$\("\.[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementsByClassName');
        const newItem = `document.getElementsByClassName('${item.split('"')[1].substring(1, item.split('"')[1].length)}')`;
        toReturn = updateVanillaJS(newItem);
        break;
      }
      case item.match(/^\$\("[a-zA-z0-9]+?"\)$/g) !== null: {
        console.log('matched document.getElementsByTagName');
        const newItem = `document.getElementsByTagName('${item.split('"')[1]}')`;
        toReturn = updateVanillaJS(newItem);
        break;
      }
      case item.match(/^extend\([,:{}A-z0-9 ]+(, *[,:{}A-z0-9 ]+)+\)$/g) !== null: {
        console.log('matched object.assign');
        const newItem = item.replace("extend", "Object.assign");
        toReturn = updateVanillaJS(newItem);
        break;
      }
      default: {
        console.log('matched nothing');
        toReturn = updateVanillaJS(item);
      }
    }
  });

  return toReturn;
};

let vanillaJS = '';

export const updateVanillaJS = string => {
  console.log(vanillaJS.substring(vanillaJS.length - 1));
  if (vanillaJS === '') {
    vanillaJS = `${string}`;
  } else if (vanillaJS.substring(vanillaJS.length - 1) === ';') {
    vanillaJS = `${vanillaJS} ${string}`;
  } else {
    vanillaJS = `${vanillaJS}.${string}`;
  }

  console.log(vanillaJS);

  return vanillaJS;
};

export const clearVanillaJS = () => {
  vanillaJS = '';
}
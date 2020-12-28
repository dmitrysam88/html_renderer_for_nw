This package can help you to create html page.
You can use js to create dynamic html page.
End you can use it with Web2Executable.

Simple example:
```
import Renderer from 'html_renderer_for_nw';
 
const r = new Renderer('app');

function onChangeText(event) {
  r.store = { ...r.store, inputText: event.target.value };
}

window.onload = function () {
  r.render(() => r.$('div', { class: 'div' },
    r.$('p', { class: 'p' }, 'some'),
    r.$('p', { class: 'p' }, 'text'),
    r.$('input', { class: 'input', type: 'text', onChange: onChangeText, value: r.store.inputText }),
    r.$('p', { class: 'p' }, r.store.inputText), 
  ));
};
```

Create new object which class is Renderer.

```
const r = new Renderer('app');
```
Where 'app' is class of main doom element (div);

`r.store` - is store where you can ceep data, which can rerender page content.
`r.render` - is function which gets another function as argument with html render elements.
`r.$` - is function which returns you new doom element, gets type as first argument, object of html arguments where key is name of argument and value is value, and children elements like another arguments.

Example:
```
r.$('div', { class: 'div' },
  r.$('p', { class: 'p' }, 'some'),
  r.$('p', { class: 'p' }, 'text'),
);
```

module.exports = class Renderer {

    constructor(rootElementID) {
      this.innerStore = {};
      this.rootElementID = rootElementID;
      this.rootElement = document.getElementById(rootElementID);
    }
  
    set store(val) {
      let oldStore = { ...this.innerStore };
      this.innerStore = val;
      this.reRender();
      if (typeof(this.updateListener) === 'function')
        this.updateListener(oldStore);
    }
  
    get store() {
      return this.innerStore;
    }
    
    setUpdateListener(func) {
      this.updateListener = func;
    }
  
    getChildrenByArgs(args = []) {
      if (args.find((el) => typeof (el) === 'object'))
        return args.filter((el) => typeof (el) === 'object').flat(Infinity);
      else
        return args.reduce((accum, el) => el != null ? accum + el : "", "");
    }
  
    $(type, options) {
      let args = [...arguments].slice(2);
      let newElement = document.createElement(type);
      const regExpEvents = /^on[^ ].*/;
      if (options) {
        for (let key in options) {
          if (regExpEvents.test(key))
            newElement.addEventListener(key.replace('on', '').toLowerCase(), options[key]);
          else
            newElement.setAttribute(key, key === 'value' && options[key] == null ? "" : options[key]);
        }
      }
  
      let children = this.getChildrenByArgs(args);
  
      if (Array.isArray(children))
        for (let child of children)
          newElement.appendChild(child);
      else
        newElement.innerHTML = children;
  
      return newElement;
    }
  
    reRender() {
      this.rootElement.removeChild(this.drawnElements);
      this.render(this.drowFunction);
    }
  
    render(drowFunction) {
      this.drowFunction = drowFunction;
      this.drawnElements = drowFunction();
      this.rootElement.appendChild(this.drawnElements);
    }
  
  }
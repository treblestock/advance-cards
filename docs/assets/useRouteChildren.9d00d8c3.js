import{z as s}from"./index.2300a498.js";function i(r,t){const n=s(),o=n.getRoutes();r||(r=n.currentRoute.value.name);const u=o.find(e=>e.name===r);return t?u.children.map(e=>e[t]):u.children}export{i as u};

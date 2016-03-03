
;(function () {//new syntax for iife
  'use strict';

  const ws = io.connect()//io comes from script in index.jade

  //might need to run this through babel compiler;

  ws.on('connect', () => {
    console.log("socket connected");
  })

  ws.on('receiveChat', msg => {
    console.log("received chat");
    displayChat(msg.name, msg.text);
  })

  const form = document.querySelector('form')//returns first of element it sees as object. querySelectorAll would return a nodelist object
  //would need Array.prototype.forEach.call(li)
  const name = document.querySelector("input[name='name']")
  const text = document.querySelector("input[name='text']")
  const ul = document.querySelector('ul')
  //look up node lists!!

  form.addEventListener('submit', () => {
    const[n, t] = [name.value, text.value];

    ws.emit('sendChat', {
      name: n,
      text: t
    })
    console.log(name.value, text.value);
    displayChat(n, t);
    // ws.emit('sendChat', {
    //   name: name.value, text: text.value
    // })
    text.value = '';

    event.preventDefault();
  })

  function displayChat (name, text) {
    const li = generateLI(name, text); //this actually touches the DOM

    ul.appendChild(li);
    // debugger;
  }

  function generateLI (name, text) {
    const li = document.createElement('li');//creating node elements in memory. Doesn't have any sideaffects. can run this over and
    //over and have the same result; Can't run displayChat function and get same result; It will manipulate DOM in different ways.
    const textNode = document.createTextNode(`${name}: ${text}`)

    li.appendChild(textNode);
    return li;
  }

}());

import React, { useEffect, useState } from 'react';
import Card from './Card';
import Node from './Node';
import Export from './Export';
import Import from './Import';

function App() {
  const [arr, setState] = useState([]);

  useEffect(() => {
    console.log(arr);
  },);

  const addCard = () => {
    let parent;
    let level=1;

    if(arr.length != 0) {
      parent = arr[arr.length-1].parent;
    } else {
      parent = new Node("-1", null);
    }

    let node = new Node("", parent);
    node.level = level;

    if(parent.name != "-1") {
      node.level = arr[arr.length-1].level;
      parent.children.push(node);
    }

    setState([
      ...arr,
      node
    ]);

  }

  const handleChange = (text, node) => {
     node.name = text;
     setState([...arr]);
  }

  const getIndexTillDelete = (node, index) => {
    let i;
    let j = node.parent.children.indexOf(node);
    node.parent.children.splice(j, 1);

    for( i=index+1 ; i<arr.length ; i++)
    {
      if(arr[i].level <= node.level) {
        break;
      }
      else if(arr[i].parent.name != "-1"){
        j = arr[i].parent.children.indexOf(arr[i]);
        arr[i].parent.children.splice(j, 1);
      }
    }
    return i-1;
  }

  const handleDelete = (node) => {
    let index = arr.indexOf(node);
    console.log(index);
    
    let indexTillDelete = getIndexTillDelete(node, index);
    let noOfElements = indexTillDelete-index+1;
    console.log(noOfElements);
    arr.splice(index, noOfElements);

    setState([...arr]);
  }

  const handleOutdent = (node) => {
    let index = arr.indexOf(node);

    if(index == 0) {
      return;
    }
    if(node.level == arr[index-1].level+1) {
      return;
    }

    //removing from the prev parent's children array if existed
    if(node.parent.name != "-1") {
      let i = node.parent.children.indexOf(node);
      node.parent.children.splice(i, 1);
    }

    //finding the index of above node with same level
    let i;
    for(i=index-1 ; i>=0 ; i--) {
      if(arr[i].level == node.level) {
        break;
      }
    }

    //setting the new parent and children and increasing the level
    node.parent = arr[i];
    arr[i].children.push(node);
    node.level++;

    setState([
      ...arr
    ]);

  }

  const handleIndent = (node) => {
    let index = arr.indexOf(node);

    if(node.level === 1) {
      return;
    }

    //setting level as current parent's level
    let currParent = node.parent;
    node.level = currParent.level;

    //deleting node from current parent
    let i = currParent.children.indexOf(node);
    currParent.children.splice(i, 1);

    //setting new parent and adding the node to new parent's children
    node.parent = currParent.parent;
    node.parent.children.push(node);

    setState([
      ...arr
    ]);
  }

  return (
    <div className="App">
      {/* <div id="importexport">
            <Export data={arr}></Export>
            <Import onImport={(importedData) => setState(importedData)}></Import>
      </div> */}
      <h1>Mathematics</h1>
      <hr></hr>

      <div id="instructions">
        <div id="left-ins">
          <h2>Actions</h2>
          <p>Move, Indent, Outdent, Delete</p>
        </div>

        <div id="right-ins">
          <h2>Standard</h2>
          <p>The text of the standard</p>
        </div>
      </div>
      <hr></hr>

      <div id="cards">
      {
        arr.map((node, index) => (
          <Card 
            node={node}
            key={index}
            handleChange={(text) => handleChange(text, node)}
            handleDelete={handleDelete}
            handleOutdent={handleOutdent}
            handleIndent={handleIndent}
            />
        ))
      }
      </div>
      <button id="add-btn" onClick={addCard}>Add a Standard</button>

    </div>
  );
}

export default App;

// a
//  b
//   c
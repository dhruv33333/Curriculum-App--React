import React, { useEffect, useState } from 'react';
import Card from './Card';
import Node from './Node';
import Export from './Export';
import Import from './Import';

function App() {
  const [arr, setState] = useState([]);

  useEffect(() => {
    console.log(arr);
  });

  const addCard = () => {
    let parent;
    let level = 1;

    //setting the parent
    if (arr.length != 0) {
      parent = arr[arr.length - 1].parent;
    } else {
      parent = new Node("-1", null);
    }

    //creating the node
    let node = new Node("", parent);

    //setting the level
    node.level = level;

    if (parent.name != "-1") {
      node.level = arr[arr.length - 1].level;
    }

    //updating the state
    setState([
      ...arr,
      node
    ]);

  }

  const handleChange = (text, node) => {
    //updating the text of the node and updating the state
    node.name = text;
    setState([ ...arr ]);
  }

  const getIndexTillDelete = (node, index) => {
    let i;

    for (i = index + 1; i < arr.length; i++) {
      if (arr[i].level <= node.level) {
        break;
      }
    }
    return i - 1;
  }

  const handleDelete = (node) => {
    let index = arr.indexOf(node);

    let indexTillDelete = getIndexTillDelete(node, index);
    let noOfElements = indexTillDelete - index + 1;

    arr.splice(index, noOfElements);

    setState([ ...arr ]);
  }

  const handleIndent = (node) => {
    let index = arr.indexOf(node);

    //can't indent if first element
    if (index == 0) {
      return;
    }
    //a
    // b
    //checking if we can give more indentation or not
    if (node.level == arr[index - 1].level + 1) {
      return;
    }

    //finding the index of above node with same level
    let i;
    for (i = index - 1; i >= 0; i--) {
      if (arr[i].level == node.level) {
        break;
      }
    }

    //setting the new parent and children and increasing the level
    node.parent = arr[i];
    node.level++;

    setState([ ...arr ]);

  }

  const handleOutdent = (node) => {
    let index = arr.indexOf(node);

    //cannot outdent if level is 1
    if (node.level === 1) {
      return;
    }

    //setting level as current parent's level
    let currParent = node.parent;
    node.level = currParent.level;

    //setting new parent 
    node.parent = currParent.parent;

    setState([ ...arr ]);
  }

  const handleUp = (node) => {
    let index = arr.indexOf(node);

    //finding index to swap
    let i, j;
    for(i=index-1 ; i>=0 ; i--) {
      if(arr[i].level < node.level) {
        return;
      }
      if(arr[i].level === node.level) {
        break;
      }
    }
    if(i == -1) {
      return;
    }

    //no of elements of the array above to be swapped
    let noOfElements = index - i;
    //no of elements of curr arr
    for(j=index+1 ; j<arr.length ; j++) {
      if(arr[j].level <= node.level) {
        break;
      }
    }
    j--;
 
    let tempArr = arr.splice(i, noOfElements);
    arr.splice(index-noOfElements + (j-index+1), 0, ...tempArr);

    setState([ ...arr ]);
  }

  const handleDown = (node) => {
    let index = arr.indexOf(node);

    //finding index till the end of array
    let i, j;
    for(i=index+1 ; i<arr.length ; i++) {
      if(arr[i].level < node.level) {
        return;
      }
      if(arr[i].level === node.level) {
        break;
      }
    }
    if(i == arr.length) {
      return;
    }

    //no of elements of the curr array 
    let noOfElements = i - index;

    //no of elements of below arr
    for(j=i+1 ; j<arr.length ; j++) {
      
      if(arr[j].level <= node.level) {
        break;
      }
    }
    j--;

    let tempArr = arr.splice(index, noOfElements);
    arr.splice(index + (j-i+1), 0, ...tempArr);

    setState([ ...arr ]);
  }

  return (
    <div className="App">
      <div id="importexport">
        <Export data={arr}></Export>
        <Import onImport={(importedData) => setState(importedData)}></Import>
      </div>
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
              handleUp={handleUp}
              handleDown={handleDown}
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
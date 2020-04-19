import React, { useState, useEffect } from 'react';
import users from "./users.json";

function App() {

  var [filterValue, setFilterValue] = useState("");
  var [newlist, setNewlist] = useState([]); 
  var [sortlink, setSortlink] = useState('id');

  useEffect( function(){
    setNewlist(users)
  }, [] ); // this will be called first time (at Mount)
  
  
  // function setFilterValueWrapper(input){
  //   filterValue = input;
  //   console.log("FFFFFFF");
  //   setFilterValue("input"); // if you have anything to do make a wrapper function and inside it call the real setter!
  // }

  function changefilter(event){
      const newInput = event.target.value;
      
      //setFilterValueWrapper(newInput);
      setFilterValue(newInput);

      // LESSON : Why these two are not same ? because setter will be called after render finishes!
      console.log("new Input length: " + newInput.length + " and new input: " + newInput);
      console.log("filter value length is: " + filterValue.length + " and filter new value: "+filterValue); 
      console.log("---------------------");

    if (event.target.value.length > 1) {
      setNewlist(users.filter(item=>item.username.toLowerCase().indexOf(event.target.value.toLowerCase())===0))
    } else { setNewlist(users); }

  }


  function sortTable(event){
    if (event.target.dataset.sort=='username'){
      newlist.sort(compareValues('username'));
      setSortlink('username')
    }

    if (event.target.dataset.sort=='fullname'){
      newlist.sort(compareValues('name'));
      setSortlink('fullname')
    }

    if (event.target.dataset.sort=='id'){
      newlist.sort(compareValues('id'));
      setSortlink('id')
    }
  }


  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      console.log("Test");
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  return (
      <div>
        <p></p>
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <label for="usernameF">Filter by UserName : </label>
                  <input type="text" id="usernameF" value={filterValue} onChange={changefilter} autofocus="true"></input>
                </div>
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"><a href="#" onClick={sortTable} data-sort='id'>Id</a></th>
                  <th scope="col"><a href="#" onClick={sortTable} data-sort='username'>Username</a></th>
                  <th scope="col"><a href="#" onClick={sortTable} data-sort='fullname'>Fullname</a></th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {newlist.map( user =>
                    <tr><th scope="row">{user.id}</th>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td></tr> 
                )}
              </tbody>
            </table>

            {/*newlist.map( user=><li key={user.id} {...user}>{user.username}</li>) */}
            
      </div>
    );
}

export default App;

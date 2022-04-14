import React, { useState, useEffect, useRef } from 'react'
import List from './List'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    // if there is a list (it's true) then get the list, parse it
    // and get the list array
    return JSON.parse(localStorage.getItem('list'))
  } else {
    // if there is no list (it's false) return an empty array
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  // track the name of the item being added to the list
  const [list, setList] = useState(getLocalStorage())
  // track the list made up of the items
  const [isEditing, setIsEditing] = useState(false)
  // determine whether the user is editing an item on the list
  const [editId, setEditId] = useState(null)
  // the id for the item being edited so it can be tracked
  const refContainer = useRef(null)

  const handleSubmit = (e) => {
    // takes in the event (click)
    e.preventDefault()
    // this prevents the browser from rerendering when its loaded
    if (name && isEditing) {
      // if the name exists and isEditing is true
      // update the list my mapping over the items and sending it
      // setList to update list
      setList(
        list.map((item) => {
          if (item.id == editId) {
            // after mapping, if the item id matches the id of the item
            // being edited, return all key/value pairs for the item object
            // listed above (item)
            return { ...item, title: name }
          }
          // if it's not true, just return the item
          return item
        })
      )
      setName('')
      // set the name back to a blank string (safeguard)
      setEditId(null)
      // set the id for the editing item back to null
      setIsEditing(false)
      // set isEditing back to false
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name }
      // otherwise, if the item doesn't exist, create a new item
      setList([...list, newItem])
      // the item object will have id = current time (just to save time)
      // and a title key of name

      // sets the list state to include all existing list items, and
      // add the new item entered
      setName('')
      // set the name back to a blank string (safeguard)
    }
  }

  const clearList = () => {
    setList([])
    // this just sets the list back to an empty array (safeguard)
  }

  const removeItem = (id) => {
    // uses the setList function and grabs the list, then filters
    // and creates a new array of items
    // if the id being passed to the filter function does not match
    // it will be put into the new array. if it DOES match, it will
    // not be returned in the array that is then set to setList
    setList(list.filter((item) => item.id !== id))
    // this is to return a new array without the items where the id
    // matched. ie the item being removed from the list
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id == id)
    // to get a specific item, find an item where the id matches the
    // id of the item in the list
    setIsEditing(true)
    // set isEditing to true
    setEditId(id)
    // set the editing id to the id being passed
    setName(specificItem.title)
    // set the name of the new item on the list to the specificItem's title
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    // setting local storage to the item list by taking it in and
    // passing it a list key and a json.stringify list value
  }, [list])
  // this effect should run everytime [list] changes

  useEffect(() => {
    refContainer.current.focus()
  })

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            ref={refContainer}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          {/* items, removeItem, etc are props. they are passed from the App.js component to the List.js component */}
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App

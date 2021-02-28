import { useState } from 'react'
import axios from 'axios'

const AddTask = ({
  onAdd
}) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault()


    if (!text) {
      alert('Please add a task')
      return

    }
    onAdd({
      text,
      day,
      reminder
    })

    axios.post('https://sheet.best/api/sheets/c1846bb7-484c-4302-94e2-6667774f246f', {
      text,
      day,
      reminder
    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
    console.log(error);
  });

    setText('')
    setDay('')
    setReminder(false)

  }

  return ( <form className = 'add-form'
    onSubmit = {
      onSubmit
    } >
    <div className = 'form-control' >
    <label > Task < /label> <
    input type = 'text'
    placeholder = 'Add Task'
    value = {
      text
    }
    onChange = {
      (e) => setText(e.target.value)
    }
    /> <
    /div>

    <
    div className = 'form-control' >
    <
    label > Day & Time < /label> <
    input type = 'text'
    placeholder = 'Add Day & Time'
    value = {
      day
    }
    onChange = {
      (e) => setDay(e.target.value)
    }
    /> <
    /div>

    <
    div className = 'form-control form-control-check' >
    <
    label > Set Reminder < /label> <
    input type = 'checkbox'
    checked = {
      reminder
    }
    value = {
      reminder
    }
    onChange = {
      (e) => setReminder(e.currentTarget.checked)
    }
    /> <
    /div>

    <
    input type = 'submit'
    value = 'Save Task'
    className = 'btn btn-block' / >
    <
    /form>
  )
}

export default AddTask

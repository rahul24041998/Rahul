import React, { useState } from "react";
import './App.css';
import { useForm } from 'react-hook-form';
function App() {
  const [fields, setFields] = useState([{ value: null }]);
  const { register,handleSubmit,errors } = useForm(); 
  const onSubmit = (values,fields) => {
    console.log(values,fields);
    
  };

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    console.log(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    console.log(values);
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>FORM VALIDATION</h1>
      Name:<br/>
      <input name="firstname" ref={register} />  <br/>
      Age:<br/>
      <input name="age" ref={register({ pattern: /\d+/ })} />
      {errors.age && 'Please enter number for age.'}<br/><br/>
      {fields.map((field, idx) => {
        return (
          
          <div key={`${idx}`}>
             <label>{`Item ${idx+ 1}`}</label>
            <input
              type="text"
              // placeholder="item"
              value={field.value || ""} name="item"
              onChange={e => handleChange(idx, e)} ref={register({pattern:/\d+/})}/>
            {errors.item && 'enter only numbers'}
            <button type="button" onClick={() => handleAdd()}>
       Add
      </button>

            <button type="button" onClick={() => handleRemove(idx)}>
              Remove
            </button>
          </div>
        );
      })}
       <input type="submit" />
    </form>
  );
}

export default App;
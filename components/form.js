import React, {useState, useEffect} from 'react'

function Form(){
    const [formData, setFormData] = useState({})

    function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setFormData({...formData, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
        if (formData){
            console.log(formData.comment)
            fetch(`https://radiant-oasis-70177.herokuapp.com/reviews`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }).then((r) => r.json())
                .then((data) => getReview(data))
                .catch((error) => {
                    console.error('Error message:', error);
                  })
            }
    }


    return(
        <form onSubmit={handleSubmit}>
            <label for="first">Notification Title:</label>
            <input type="text" name="title" onChange={handleChange} required/>
            <label for="last">Notification Message:</label>
            <input type="text" name="body" onChange={handleChange} required/>
            <label for="last">Notification Image:</label>
            <input type="text" name="image" onChange={handleChange} required/>
            <label for="last">Notification URL:</label>
            <input type="text" name="url" onChange={handleChange} required/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
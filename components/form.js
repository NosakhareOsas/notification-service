import React, {useState, useEffect} from 'react'
import {Button, Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import '../style/App.css';

function Form(){
    const [formData, setFormData] = useState({})

    function handleComment(e){
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
        <Card style={{width: '70%'}}>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select aria-label="Default select example" name='user_id' onChange={handleComment}>
                        <option>WHO ARE YOU?</option>
                        {options}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        What are your thoughts?
                    </Form.Text>   
                    <FloatingLabel label={`Review ${city.name}`}>
                        <Form.Control
                            as="textarea"
                            placeholder={`Review ${city.name}`}
                            onChange={handleComment} 
                            name='comment'
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                        Everyone can see your comment
                    </Form.Text>
                    <Form.Select aria-label="Default select example" name='traffic' onChange={handleComment} style={{marginBottom:'10px'}}>
                        <option>How would you rate the traffic in {city.name}</option>
                        <option value="1">bad</option>
                        <option value="2">fair</option>
                        <option value="3">good</option>
                        <option value="4">great</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example" name='night_life' onChange={handleComment}>
                        <option>How would you rate the night life in {city.name}</option>
                        <option value="1">bad</option>
                        <option value="2">fair</option>
                        <option value="3">good</option>
                        <option value="4">great</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example" name='friendly_to_foreigner' onChange={handleComment}>
                        <option>How would you rate the friendliness to foreigners in {city.name}</option>
                        <option value="1">bad</option>
                        <option value="2">fair</option>
                        <option value="3">good</option>
                        <option value="4">great</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example" name='places_to_work_from' onChange={handleComment}>
                        <option>How would you rate the places to work from in {city.name}</option>
                        <option value="1">bad</option>
                        <option value="2">fair</option>
                        <option value="3">good</option>
                        <option value="4">great</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example" name='quality_of_internet' onChange={handleComment}>
                            <option>How would you rate the quality of internet in {city.name}</option>
                            <option value="1">bad</option>
                            <option value="2">fair</option>
                            <option value="3">good</option>
                            <option value="4">great</option>
                            <option value="5">Excellent</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" name='quality_of_healthcare' onChange={handleComment}>
                            <option>How would you rate the quality of healthcare in {city.name}</option>
                            <option value="1">bad</option>
                            <option value="2">fair</option>
                            <option value="3">good</option>
                            <option value="4">great</option>
                            <option value="5">Excellent</option>
                    </Form.Select>

                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form> 
        </Card>
    );
}

export default Form;
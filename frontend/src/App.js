import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = JSON.parse(jsonInput);
            const apiResponse = await axios.post('https://api-nv0i.onrender.com/bfhl', parsedInput); // Calls the backend API
            setResponse(apiResponse.data);
        } catch (error) {
            alert('Invalid JSON input or error with API call.');
            console.error(error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const selectedData = selectedOptions.reduce((acc, option) => {
            acc[option.value] = response[option.value];
            return acc;
        }, {});

        return (
            <div>
                {Object.keys(selectedData).map(key => (
                    <div key={key}>
                        <h3>{key}:</h3>
                        <p>{JSON.stringify(selectedData[key])}</p>
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        document.title = '21BEC1529'; 
    }, []);

    return (
        <div className="App">
            <h1>Enter The Api Input</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON like {"data": ["A", "C", "z"]}'
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <>
                    <h2>Select Data to Display</h2>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedOptions}
                    />
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;

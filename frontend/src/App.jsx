import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Error from './components/Error';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState('');

  const handleJsonSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setParsedData(null); // Reset previous data

    // Validate JSON syntax before making API call
    let parsedInput;
    try {
      parsedInput = JSON.parse(jsonInput); // Attempt to parse JSON input
    } catch (err) {
      console.log(err);
      setError('Invalid JSON format. Please correct it and try again.');
      toast.error('Invalid JSON format!');
      return;
    }

    // If JSON is valid, make API request
    try {
      const response = await axios.post('/api/validate-json', parsedInput);
      setParsedData(response.data.data);
      toast.success('Parsed data successfully');
    } catch (err) {
      console.log(err);
      setError('Validation failed or server error occurred');
      toast.error('Something went wrong!');
    }
  };

  // Automatically remove error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000); // 2 seconds timeout

      return () => clearTimeout(timer); // Cleanup on component unmount or before the next effect
    }
  }, [error]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-200 mb-6 font-mono mt-6">Clinical Trial JSON Viewer</h1>

        <form onSubmit={handleJsonSubmit} className="w-full max-w-xl flex flex-col items-center">
          <textarea
            placeholder="Paste your JSON here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="10"
            className="w-full textarea textarea-accent"
          />
          <button
            type="submit"
            className={`btn btn-active btn-ghost mt-6 ${!jsonInput ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!jsonInput}  // Disable button if jsonInput is empty
          >
            Submit
          </button>
        </form>

        {error && (
          <Error message={error}/>
        )}

        {parsedData && (
          <div className="mt-6 p-4 rounded-lg shadow-lg w-full max-w-4xl border-gray-600 border-2">
            <h2 className="text-4xl font-extrabold mb-4 text-teal-500 font-mono">Parsed JSON Data:</h2>
            <pre className="text-left text-sm p-4 rounded-lg overflow-auto font-mono">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault(); // Prevents the form from refreshing the page

    const url = process.env.REACT_APP_API_URL + '/transaction';

    // Extract the price from the name (assuming the first part is the price)
    const pricePart = name.split(' ')[0];
    const price = parseFloat(pricePart) || 0; // Convert to number or use 0

    // Extract the transaction name after the price
    const transactionName = name.substring(pricePart.length).trim();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: transactionName,
        description,
        datetime,
        price,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setName('');
        setDescription('');
        setDatetime('');
        setTransactions([...transactions, json]); // Update the transactions state with the new transaction
      })
      .catch((error) => {
        console.error('Error:', error); // Handle any errors
      });
  }

  // Calculate balance
  let balance = transactions.reduce((acc, transaction) => {
    return acc + (parseFloat(transaction.price) || 0); // Ensure price is a number
  }, 0);

  return (
    <main>
      <h1>Rs. {balance.toFixed(2)}</h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={'+200 new Samsung TV'}
          />
          <input
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            type="datetime-local"
          />
        </div>
        <div className='description'>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder={'Description'}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div className='transaction' key={index}>
              <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
              </div>
              <div className='right'>
                <div className={`price ${transaction.price < 0 ? 'red' : 'green'}`}>
                  {transaction.price < 0 ? '-' : '+'}Rs. {Math.abs(parseFloat(transaction.price)).toFixed(2)}
                </div>
                <div className="datetime">{new Date(transaction.datetime).toLocaleString()}</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;

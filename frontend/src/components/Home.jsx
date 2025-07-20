




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoinChart from './CoinChart';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState(null);

  const fetchCoins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/coins');
      console.log('Fetched coins:', response.data);
      setCoins(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (!sortKey) return 0;

    let valA = a[sortKey];
    let valB = b[sortKey];

    // Handle numeric sorting
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }

    // Handle string sorting
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(() => {
      console.log('Auto-refreshing dashboard...');
      fetchCoins();
    }, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedCoinId) return;
      setChartLoading(true);
      setChartError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/history/${selectedCoinId}`);
        setHistoricalData(response.data);
        console.log('Fetched historical data:', response.data);
        setChartLoading(false);
      } catch (err) {
        setChartError(err.message);
        setChartLoading(false);
      }
    };
    fetchHistoricalData();
  }, [selectedCoinId]);

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Cryptocurrency Dashboard
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by coin name or symbol"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Coin Name
                      {sortKey === 'name' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('symbol')}
                    >
                      Symbol
                      {sortKey === 'symbol' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('price_usd')}
                    >
                      Price (USD)
                      {sortKey === 'price_usd' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('market_cap')}
                    >
                      Market Cap
                      {sortKey === 'market_cap' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('change_24h_pct')}
                    >
                      24h % Change
                      {sortKey === 'change_24h_pct' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('timestamp')}
                    >
                      Last Updated
                      {sortKey === 'timestamp' && (
                        <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {sortedCoins.map((coin) => (
                    <tr
                      key={coin._id}
                      className="hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedCoinId(coin.coin_id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {coin.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {coin.symbol.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${coin.price_usd.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${coin.market_cap.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          coin.change_24h_pct >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {coin.change_24h_pct.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(coin.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedCoinId && (
          <div className="mt-8">
            {chartLoading && (
              <div className="flex justify-center items-center text-white">
                Loading chart data...
              </div>
            )}
            {chartError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                Error loading chart: {chartError}
              </div>
            )}
            {!chartLoading && !chartError && historicalData.length > 0 && (
              <CoinChart
                historicalData={historicalData}
                coinName={coins.find((c) => c.coin_id === selectedCoinId)?.name}
              />
            )}
            {!chartLoading && !chartError && historicalData.length === 0 && (
              <div className="text-white text-center">
                No historical data available for this coin.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

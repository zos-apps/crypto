import React, { useState } from 'react';

interface Coin {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: string;
  icon: string;
}

const Crypto: React.FC = () => {
  const [coins] = useState<Coin[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 2.5, marketCap: '$847B', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 2280.00, change24h: 1.8, marketCap: '$274B', icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', price: 98.50, change24h: -1.2, marketCap: '$42B', icon: '◎' },
    { symbol: 'AVAX', name: 'Avalanche', price: 35.20, change24h: 3.1, marketCap: '$13B', icon: '🔺' },
    { symbol: 'LUX', name: 'Lux', price: 12.80, change24h: 5.2, marketCap: '$1.2B', icon: '✦' },
  ]);
  const [activeTab, setActiveTab] = useState<'prices' | 'portfolio'>('prices');

  const totalValue = 125420.50;
  const totalChange = 2.4;

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="text-sm text-gray-400">Portfolio Value</div>
        <div className="text-4xl font-bold">${totalValue.toLocaleString()}</div>
        <div className={`text-lg ${totalChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalChange >= 0 ? '▲' : '▼'} {Math.abs(totalChange)}% (24h)
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {(['prices', 'portfolio'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center capitalize ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'prices' && (
          <div>
            {coins.map(coin => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between px-4 py-4 border-b border-gray-800 hover:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-xl">
                    {coin.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-sm text-gray-400">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${coin.price.toLocaleString()}</div>
                  <div className={`text-sm ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="p-4">
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Holdings</span>
                <span className="font-semibold">${totalValue.toLocaleString()}</span>
              </div>
              {coins.slice(0, 3).map(coin => (
                <div key={coin.symbol} className="flex justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span>{coin.icon}</span>
                    <span>{coin.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div>${(coin.price * (Math.random() * 2 + 0.5)).toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{(Math.random() * 2).toFixed(4)} {coin.symbol}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Crypto;

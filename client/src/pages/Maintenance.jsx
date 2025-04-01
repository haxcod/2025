import { useState, useEffect } from 'react';
import { AlertTriangle, Settings} from 'lucide-react';
import Logo from '/logo-rounded.png'

export default function TradeXMaintenancePage() {
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-11 h-11 bg-green-600 p-[1px] rounded-full flex items-center justify-center mr-2">
              {/* <ArrowUpRight className="text-white" size={20} /> */}
              <img src={Logo} alt='logo'/>
            </div>
            <h1 className="text-2xl font-bold">TradeX</h1>
          </div>
          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <AlertTriangle size={16} className="mr-1" />
            Maintenance
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Settings className="mr-2 text-green-600" size={24} />
            <h2 className="text-xl font-bold">System Maintenance</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            We're currently upgrading our trading platform to bring you enhanced features and improved performance. Thank you for your patience.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Estimated time remaining:</h3>
            <div className="flex justify-center space-x-4">
              <div className="bg-green-600 text-white rounded-lg p-4 w-20 text-center">
                <div className="text-2xl font-bold">{formatTime(countdown.hours)}</div>
                <div className="text-xs">HOURS</div>
              </div>
              <div className="bg-green-600 text-white rounded-lg p-4 w-20 text-center">
                <div className="text-2xl font-bold">{formatTime(countdown.minutes)}</div>
                <div className="text-xs">MINUTES</div>
              </div>
              <div className="bg-green-600 text-white rounded-lg p-4 w-20 text-center">
                <div className="text-2xl font-bold">{formatTime(countdown.seconds)}</div>
                <div className="text-xs">SECONDS</div>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-green-600 pl-4 mb-6">
            <h3 className="font-semibold mb-2">Updates being implemented:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                Enhanced security protocols
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                Real-time market data improvements
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                New trading instruments and features
              </li>
            </ul>
          </div>
          
          {/* <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center">
            <RefreshCw className="mr-2" size={18} />
            Refresh Status
          </button> */}
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold mb-4">Alternative ways to reach us:</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">@</span>
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-500">support@tradex.com</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-lg">📱</span>
              </div>
              <div>
                <p className="font-medium">Customer Service</p>
                <p className="text-sm text-gray-500">+1 (800) 555-TRADE</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      {/* <footer className="mt-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <Clock size={14} className="mr-1" />
          <span>Maintenance started: April 1, 2025 at 09:00 UTC</span>
        </div>
        <p>© 2025 TradeX Trading Platform. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
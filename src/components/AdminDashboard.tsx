"use client";
import { 
  Truck, Package, Users, DollarSign, TrendingUp, 
  LayoutDashboard, Settings, LogOut, Bell, 
  ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Apex Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-2 bg-blue-600 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Truck size={20} /> Fleet
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Package size={20} /> Bookings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Users size={20} /> Customers
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <a href="/" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} /> Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between z-10">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <Bell className="text-gray-500 hover:text-gray-800" size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Revenue', value: '$45,231', icon: DollarSign, trend: '+20.1%', up: true },
              { title: 'Active Shipments', value: '124', icon: Truck, trend: '+5.4%', up: true },
              { title: 'Pending Quotes', value: '32', icon: Package, trend: '-2.3%', up: false },
              { title: 'Total Customers', value: '1,429', icon: Users, trend: '+12.5%', up: true },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                  <span className={`flex items-center text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                    {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} /> Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Requested a quote for moving 3BR house from NY to FL', time: '2 hours ago', status: 'Pending' },
                { user: 'Sarah Smith', action: 'Shipment #1042 delivered successfully', time: '5 hours ago', status: 'Completed' },
                { user: 'Mike Johnson', action: 'Updated tracking info for Shipment #1045', time: '1 day ago', status: 'In Transit' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      activity.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {activity.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
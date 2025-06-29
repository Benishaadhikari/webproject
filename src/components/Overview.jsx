import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  Eye,
  Calendar,
  BarChart3
} from 'lucide-react';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,230',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Orders',
    value: '1,234',
    change: '+8.2%',
    changeType: 'increase',
    icon: ShoppingBag,
  },
  {
    name: 'Customers',
    value: '856',
    change: '+5.1%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Products',
    value: '127',
    change: '-2.3%',
    changeType: 'decrease',
    icon: Package,
  },
];

const recentOrders = [
  {
    id: '#12345',
    customer: 'Sarah Johnson',
    product: 'Luxury Face Cream',
    amount: '$89.99',
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: '#12346',
    customer: 'Emily Chen',
    product: 'Vitamin C Serum',
    amount: '$45.50',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: '#12347',
    customer: 'Maria Garcia',
    product: 'Beauty Gift Set',
    amount: '$125.00',
    status: 'shipped',
    date: '2024-01-14',
  },
  {
    id: '#12348',
    customer: 'Jennifer Brown',
    product: 'Moisturizing Mask',
    amount: '$32.99',
    status: 'completed',
    date: '2024-01-14',
  },
];

const topProducts = [
  {
    name: 'Luxury Face Cream',
    sales: 89,
    revenue: '$2,134',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  },
  {
    name: 'Vitamin C Serum',
    sales: 67,
    revenue: '$1,823',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  },
  {
    name: 'Moisturizing Mask',
    sales: 54,
    revenue: '$1,456',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">Last 30 days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              View report
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${(product.sales / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
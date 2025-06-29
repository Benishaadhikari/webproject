import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Plus,
  Minus
} from 'lucide-react';

const initialInventory = [
  {
    id: '1',
    productName: 'Luxury Face Cream',
    sku: 'LFC-001',
    category: 'Skincare',
    currentStock: 45,
    minStockLevel: 20,
    maxStockLevel: 100,
    reorderPoint: 25,
    unitCost: 35.00,
    sellingPrice: 89.99,
    supplier: 'Beauty Supply Co.',
    lastUpdated: '2024-01-15',
    status: 'in-stock',
  },
  {
    id: '2',
    productName: 'Vitamin C Serum',
    sku: 'VCS-002',
    category: 'Skincare',
    currentStock: 15,
    minStockLevel: 20,
    maxStockLevel: 80,
    reorderPoint: 25,
    unitCost: 18.50,
    sellingPrice: 45.50,
    supplier: 'Wellness Beauty',
    lastUpdated: '2024-01-14',
    status: 'low-stock',
  },
  {
    id: '3',
    productName: 'Moisturizing Mask',
    sku: 'MM-003',
    category: 'Skincare',
    currentStock: 0,
    minStockLevel: 15,
    maxStockLevel: 60,
    reorderPoint: 20,
    unitCost: 12.99,
    sellingPrice: 32.99,
    supplier: 'Natural Beauty Ltd.',
    lastUpdated: '2024-01-10',
    status: 'out-of-stock',
  },
  {
    id: '4',
    productName: 'Lip Balm Set',
    sku: 'LBS-004',
    category: 'Makeup',
    currentStock: 150,
    minStockLevel: 30,
    maxStockLevel: 120,
    reorderPoint: 40,
    unitCost: 8.99,
    sellingPrice: 24.99,
    supplier: 'Cosmetic Supplies Inc.',
    lastUpdated: '2024-01-16',
    status: 'overstock',
  },
];

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      case 'overstock':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-stock':
        return <Package className="h-4 w-4" />;
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'out-of-stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'overstock':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleStockUpdate = (id, change) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.currentStock + change);
        let newStatus = 'in-stock';
        
        if (newStock === 0) {
          newStatus = 'out-of-stock';
        } else if (newStock <= item.minStockLevel) {
          newStatus = 'low-stock';
        } else if (newStock >= item.maxStockLevel) {
          newStatus = 'overstock';
        }
        
        return {
          ...item,
          currentStock: newStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitCost), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Inventory
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock Value</p>
              <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-purple-600">
                {[...new Set(inventory.map(item => item.category))].length}
              </p>
            </div>
            <Filter className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="overstock">Overstock</option>
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Hair Care">Hair Care</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Levels
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{item.currentStock}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleStockUpdate(item.id, -1)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleStockUpdate(item.id, 1)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900">Min: {item.minStockLevel}</div>
                      <div className="text-gray-900">Max: {item.maxStockLevel}</div>
                      <div className="text-gray-500">Reorder: {item.reorderPoint}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900">Cost: ${item.unitCost.toFixed(2)}</div>
                      <div className="text-gray-900">Price: ${item.sellingPrice.toFixed(2)}</div>
                      <div className="text-green-600 font-medium">
                        Margin: {(((item.sellingPrice - item.unitCost) / item.sellingPrice) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStockUpdate(item.id, item.reorderPoint)}
                        className="text-blue-600 hover:text-blue-900 text-xs bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                        disabled={item.currentStock >= item.reorderPoint}
                      >
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-sm font-medium text-red-800">
              Low Stock Alert: {lowStockItems.length} item{lowStockItems.length !== 1 ? 's' : ''} need attention
            </h3>
          </div>
          <div className="mt-2">
            <div className="text-sm text-red-700">
              {lowStockItems.map(item => item.productName).join(', ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
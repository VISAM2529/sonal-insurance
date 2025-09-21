"use client"
import { useState, useEffect } from 'react';
import { LayoutDashboard, Shield, CreditCard, BarChart3, Users, Settings, Plus, Edit, Trash2, Eye, Folder, FolderOpen, ChevronRight, ChevronDown, Bell, Search, User, LogOut, Home, Menu, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServicesList from '@/components/admin/ServicesList';
import LoansList from '@/components/admin/LoansList';
import ApplicationsList from '@/components/admin/ApplicationsList';
import StatsOverview from '@/components/admin/StatsOverview';
import ServiceCategoriesList from '@/components/admin/ServiceCategoriesList';
import LoanCategoriesList from '@/components/admin/LoanCategoriesList';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalServices: 0,
    totalLoans: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchOverviewStats();
  }, []);

  const fetchOverviewStats = async () => {
    try {
      const [servicesRes, loansRes, applicationsRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/loan-products'),
        fetch('/api/admin/loan-applications')
      ]);

      const services = await servicesRes.json();
      const loans = await loansRes.json();
      const applications = await applicationsRes.json();

      setStats({
        totalServices: services.data?.length || 0,
        totalLoans: loans.data?.length || 0,
        totalApplications: applications.data?.applications?.length || 0,
        pendingApplications: applications.data?.applications?.filter(app => app.status === 'pending').length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StatsOverview stats={stats} />;
      case 'services':
        return <ServicesList />;
      case 'service-categories':
        return <ServiceCategoriesList />;
      case 'loans':
        return <LoansList />;
      case 'loan-categories':
        return <LoanCategoriesList />;
      case 'applications':
        return <ApplicationsList />;
      default:
        return <StatsOverview stats={stats} />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'services', 
      label: 'Insurance Services', 
      icon: Shield,
      submenu: [
        { id: 'services', label: 'All Services', icon: Shield },
        { id: 'service-categories', label: 'Categories', icon: Folder }
      ]
    },
    { 
      id: 'loans', 
      label: 'Loan Products', 
      icon: CreditCard,
      submenu: [
        { id: 'loans', label: 'All Products', icon: CreditCard },
        { id: 'loan-categories', label: 'Categories', icon: FolderOpen }
      ]
    },
    // { 
    //   id: 'applications', 
    //   label: 'Applications', 
    //   icon: Users,
    //   badge: stats.pendingApplications > 0 ? stats.pendingApplications : null
    // },
    // { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const [expandedMenus, setExpandedMenus] = useState({
    services: false,
    loans: false
  });

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else {
      setActiveTab(item.id);
      if (item.id.includes('service')) {
        setExpandedMenus(prev => ({ ...prev, services: true }));
      } else if (item.id.includes('loan')) {
        setExpandedMenus(prev => ({ ...prev, loans: true }));
      }
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  const handleSubmenuClick = (itemId) => {
    setActiveTab(itemId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
        `}>
          {/* Sidebar Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Sonal Admin</h1>
                <p className="text-xs text-gray-500">Insurance Platform</p>
              </div>
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3">
            {menuItems.map((item) => (
              <div key={item.id} className="mb-1">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-colors ${
                    (activeTab === item.id || (item.submenu && item.submenu.some(sub => sub.id === activeTab)))
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        (activeTab === item.id || (item.submenu && item.submenu.some(sub => sub.id === activeTab)))
                          ? 'bg-white/20 text-white'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.submenu && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        expandedMenus[item.id] ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </button>
                {item.submenu && expandedMenus[item.id] && (
                  <div className="mt-1 ml-6 space-y-1">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubmenuClick(subItem.id)}
                        className={`w-full flex items-center px-3 py-2 text-left text-sm rounded-md transition-colors ${
                          activeTab === subItem.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <subItem.icon className="h-4 w-4 mr-2" />
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </button>
          </div>
        </div>

        {/* Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Top Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                className="md:hidden text-gray-600 hover:text-gray-800"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Admin</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {(() => {
                    switch (activeTab) {
                      case 'overview':
                        return 'Dashboard';
                      case 'services':
                        return 'Insurance Services';
                      case 'service-categories':
                        return 'Service Categories';
                      case 'loans':
                        return 'Loan Products';
                      case 'loan-categories':
                        return 'Loan Categories';
                      case 'applications':
                        return 'Applications';
                      case 'analytics':
                        return 'Analytics';
                      default:
                        return 'Dashboard';
                    }
                  })()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
                {stats.pendingApplications > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
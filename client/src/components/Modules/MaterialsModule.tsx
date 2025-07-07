import React, { useState } from 'react';
import { Package, Plus, Edit, AlertTriangle, CheckCircle, XCircle, Wrench, Truck } from 'lucide-react';
import { mockMaterials } from '../../data/mockData';
import { Material } from '../../types';

interface MaterialsModuleProps {
  isDarkMode: boolean;
}

export default function MaterialsModule({ isDarkMode }: MaterialsModuleProps) {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'disponible':
        return {
          badge: isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800',
          icon: CheckCircle,
          text: 'Disponible'
        };
      case 'stock-faible':
        return {
          badge: isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800',
          icon: AlertTriangle,
          text: 'Stock Faible'
        };
      case 'rupture':
        return {
          badge: isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800',
          icon: XCircle,
          text: 'Rupture'
        };
      case 'maintenance':
        return {
          badge: isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-800',
          icon: Wrench,
          text: 'Maintenance'
        };
      default:
        return {
          badge: isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800',
          icon: Package,
          text: 'Inconnu'
        };
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Produits Chimiques': 'from-blue-500 to-indigo-600',
      'Équipements': 'from-emerald-500 to-teal-600',
      'Véhicules': 'from-purple-500 to-pink-600',
      'Outils': 'from-orange-500 to-red-600',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Véhicules':
        return Truck;
      case 'Équipements':
        return Wrench;
      default:
        return Package;
    }
  };

  const getStockLevel = (quantity: number, minStock: number) => {
    const percentage = (quantity / (minStock * 2)) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gestion des Matériels
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Suivez et gérez vos équipements et fournitures de nettoyage
          </p>
        </div>
        <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouveau Matériel</span>
        </button>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Total Articles
              </p>
              <p className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {materials.length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Disponibles
              </p>
              <p className="text-2xl font-bold text-emerald-500">
                {materials.filter(m => m.status === 'disponible').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Stock Faible
              </p>
              <p className="text-2xl font-bold text-yellow-500">
                {materials.filter(m => m.status === 'stock-faible').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Maintenance
              </p>
              <p className="text-2xl font-bold text-purple-500">
                {materials.filter(m => m.status === 'maintenance').length}
              </p>
            </div>
            <Wrench className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => {
          const statusInfo = getStatusInfo(material.status);
          const StatusIcon = statusInfo.icon;
          const CategoryIcon = getCategoryIcon(material.category);
          const stockLevel = getStockLevel(material.quantity, material.minStock);
          
          return (
            <div key={material.id} className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/20' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(material.category)} rounded-lg flex items-center justify-center`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {material.name}
                    </h3>
                    <span className={`text-sm transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      {material.category}
                    </span>
                  </div>
                </div>
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-blue-400' 
                    : 'text-gray-400 hover:text-blue-600'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Statut
                  </span>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className="w-4 h-4" />
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.badge}`}>
                      {statusInfo.text}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      Quantité
                    </span>
                    <span className={`font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {material.quantity} {material.unit} / {material.minStock} min
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        stockLevel > 50 ? 'bg-emerald-500' : 
                        stockLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stockLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`pt-4 border-t space-y-2 transition-colors ${
                  isDarkMode ? 'border-slate-700' : 'border-gray-100'
                }`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      Fournisseur
                    </span>
                    <span className={`transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {material.supplier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      Dernière MAJ
                    </span>
                    <span className={`transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {new Date(material.lastUpdated).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 px-3 py-2 text-blue-500 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                  Mettre à Jour
                </button>
                <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm">
                  Voir Détails
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Overview */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Vue d'ensemble par Catégorie
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Produits Chimiques', 'Équipements', 'Véhicules', 'Outils'].map((category) => {
            const categoryMaterials = materials.filter(m => m.category === category);
            const availableCount = categoryMaterials.filter(m => m.status === 'disponible').length;
            const totalQuantity = categoryMaterials.reduce((sum, m) => sum + m.quantity, 0);
            const CategoryIcon = getCategoryIcon(category);
            
            return (
              <div key={category} className={`p-4 border rounded-lg transition-colors ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg flex items-center justify-center mb-3`}>
                  <CategoryIcon className="w-4 h-4 text-white" />
                </div>
                <h4 className={`font-semibold mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {category}
                </h4>
                <div className={`space-y-1 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <p>{categoryMaterials.length} articles</p>
                  <p>{availableCount} disponibles</p>
                  <p>{totalQuantity} unités total</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
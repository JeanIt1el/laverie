import  { useState } from 'react';
import { Package, Plus, Edit, AlertTriangle, CheckCircle, XCircle, Wrench, Truck } from 'lucide-react';
import { mockMaterials } from '../../data/mockData';
import { Material } from '../../types';

export default function MaterialsModule() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'disponible':
        return {
          badge: 'bg-emerald-100 text-emerald-800',
          icon: CheckCircle,
          text: 'Disponible'
        };
      case 'stock-faible':
        return {
          badge: 'bg-yellow-100 text-yellow-800',
          icon: AlertTriangle,
          text: 'Stock Faible'
        };
      case 'rupture':
        return {
          badge: 'bg-red-100 text-red-800',
          icon: XCircle,
          text: 'Rupture'
        };
      case 'maintenance':
        return {
          badge: 'bg-purple-100 text-purple-800',
          icon: Wrench,
          text: 'Maintenance'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800',
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
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des Matériels
          </h2>
          <p className="text-gray-600">
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
        <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Articles
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {materials.length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Disponibles
              </p>
              <p className="text-2xl font-bold text-emerald-500">
                {materials.filter(m => m.status === 'disponible').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Stock Faible
              </p>
              <p className="text-2xl font-bold text-yellow-500">
                {materials.filter(m => m.status === 'stock-faible').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
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
            <div key={material.id} className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(material.category)} rounded-lg flex items-center justify-center`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {material.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {material.category}
                    </span>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
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
                    <span className="text-sm text-gray-600">
                      Quantité
                    </span>
                    <span className="font-semibold text-gray-900">
                      {material.quantity} {material.unit} / {material.minStock} min
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2 bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all ${stockLevel > 50 ? 'bg-emerald-500' :
                          stockLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${stockLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Fournisseur
                    </span>
                    <span className="text-gray-900">
                      {material.supplier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Dernière MAJ
                    </span>
                    <span className="text-gray-900">
                      {new Date(material.lastUpdated).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 px-3 py-2 text-blue-500 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
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
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Vue d'ensemble par Catégorie
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Produits Chimiques', 'Équipements', 'Véhicules', 'Outils'].map((category) => {
            const categoryMaterials = materials.filter(m => m.category === category);
            const availableCount = categoryMaterials.filter(m => m.status === 'disponible').length;
            const totalQuantity = categoryMaterials.reduce((sum, m) => sum + m.quantity, 0);
            const CategoryIcon = getCategoryIcon(category);

            return (
              <div key={category} className="p-4 border rounded-lg border-gray-200">
                <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg flex items-center justify-center mb-3`}>
                  <CategoryIcon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold mb-2 text-gray-900">
                  {category}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
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

import React, { useState } from 'react';
import { UserCheck, Plus, Edit, Trash2, Mail, Calendar, Filter, Phone, MapPin } from 'lucide-react';
import { mockEmployees } from '../../data/mockData';
import { Employee } from '../../types';

interface EmployeesModuleProps {
  isDarkMode: boolean;
}

export default function EmployeesModule({ isDarkMode }: EmployeesModuleProps) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const filteredEmployees = employees.filter(employee => 
    filterDepartment === 'all' || employee.department === filterDepartment
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'actif':
        return `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`;
      case 'conge':
        return `${baseClasses} ${isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`;
      case 'inactif':
        return `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
      default:
        return `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Nettoyage Hôtels': 'from-purple-500 to-purple-600',
      'Nettoyage Terrains': 'from-emerald-500 to-teal-600',
      'Nettoyage Bureaux': 'from-blue-500 to-indigo-600',
      'Maintenance': 'from-orange-500 to-red-600',
    };
    return colors[department as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const calculateTenure = (hireDate: string) => {
    const hire = new Date(hireDate);
    const now = new Date();
    const years = now.getFullYear() - hire.getFullYear();
    const months = now.getMonth() - hire.getMonth();
    
    if (years > 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    } else {
      return `${months} mois`;
    }
  };

  const formatSalary = (salary: number) => {
    return `${salary.toLocaleString()} Ar`;
  };

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gestion des Employés
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Gérez votre équipe et les informations du personnel
          </p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouvel Employé</span>
        </button>
      </div>

      {/* Employee Stats */}
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
                Total Employés
              </p>
              <p className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {employees.length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-emerald-500" />
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
                Actifs
              </p>
              <p className="text-2xl font-bold text-emerald-500">
                {employees.filter(e => e.status === 'actif').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-emerald-500" />
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
                Départements
              </p>
              <p className="text-2xl font-bold text-purple-500">{departments.length}</p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-500" />
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
                En Congé
              </p>
              <p className="text-2xl font-bold text-yellow-500">
                {employees.filter(e => e.status === 'conge').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-4">
          <Filter className={`w-4 h-4 transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`} />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <option value="all">Tous les Départements</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/20' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${getDepartmentColor(employee.department)} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-semibold text-lg">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {employee.name}
                  </h3>
                  <p className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {employee.role}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-emerald-400' 
                    : 'text-gray-400 hover:text-emerald-600'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-red-400' 
                    : 'text-gray-400 hover:text-red-600'
                }`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className={`flex items-center space-x-2 text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <Mail className="w-4 h-4" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <UserCheck className="w-4 h-4" />
                <span>{employee.department}</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <Calendar className="w-4 h-4" />
                <span>Embauché il y a {calculateTenure(employee.hireDate)}</span>
              </div>
            </div>

            {/* Specializations */}
            <div className={`mt-4 pt-4 border-t transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className="mb-2">
                <span className={`text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Spécialisations:
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {employee.specialization.map((spec, index) => (
                  <span key={index} className={`px-2 py-1 text-xs rounded transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-slate-400' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className={getStatusBadge(employee.status)}>
                    {employee.status}
                  </span>
                  <span className={`text-sm mt-1 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Salaire: {formatSalary(employee.salary)}
                  </span>
                </div>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                  Voir Profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Overview */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Vue d'ensemble par Département
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {departments.map((department) => {
            const deptEmployees = employees.filter(e => e.department === department);
            const activeCount = deptEmployees.filter(e => e.status === 'actif').length;
            const avgSalary = deptEmployees.reduce((sum, e) => sum + e.salary, 0) / deptEmployees.length;
            
            return (
              <div key={department} className={`p-4 border rounded-lg transition-colors ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <div className={`w-8 h-8 bg-gradient-to-r ${getDepartmentColor(department)} rounded-lg flex items-center justify-center mb-3`}>
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
                <h4 className={`font-semibold mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {department}
                </h4>
                <div className={`space-y-1 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <p>{deptEmployees.length} employés</p>
                  <p>{activeCount} actifs</p>
                  <p>Salaire moy: {formatSalary(Math.round(avgSalary))}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
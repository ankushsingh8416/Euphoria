"use client"
import React, { useState, useEffect } from 'react'
import { Trash2, Edit2, RefreshCw } from 'lucide-react'

const Customer = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users')
        
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      setError(error.message)
    }
  }

  const ShimmerLoading = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              User Management
            </h1>
            
            <div className="flex gap-2">
              <button 
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                onClick={() => window.location.reload()}
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
          
          {/* Table */}
          {loading ? (
            <ShimmerLoading />
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-6 text-center border-l-4 border-red-500">
              <p>Error: {error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {users.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow">
                            <img 
                              className="h-full w-full object-cover" 
                              src={user.profileImage || "/images/profile.webp"} 
                              alt={`${user.name}'s profile`} 
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{user._id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                              title="Edit user"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                              title="Delete user"
                              onClick={() => handleDeleteUser(user._id)} // Add onClick handler
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No users found</div>
                </div>
              )}
            </div>
          )}
          
          {/* Footer without pagination */}
          <div className="border-t border-gray-100 px-6 py-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{users.length}</span> users
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customer
// src/hooks/useCrud.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';

const useCrud = (api, initialFilters = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityToDelete, setEntityToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Helper: get correct ID field (id or _id)
  const getEntityId = (entity) => entity?.id || entity?._id;

  // Load data from API
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.list(filters);
      // Ensure data is always an array
      const list = Array.isArray(response) ? response : response?.data || [];
      setData(list);
    } catch (error) {
      console.error('Error loading data:', error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [api, filters]);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filtered = [...data];

    // Search
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    return filtered;
  }, [data, searchQuery, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // CRUD handlers
  const handleSearch = (query) => setSearchQuery(query);
  const handleFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleAdd = () => {
    setSelectedEntity(null);
    setMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (entity) => {
    setSelectedEntity(entity);
    setMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (entity) => {
    setSelectedEntity(entity);
    setMode('view');
    setIsModalOpen(true);
  };

  const handleDelete = (entity) => {
    setEntityToDelete(entity);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!entityToDelete) return;
    setActionLoading(true);
    try {
      const id = getEntityId(entityToDelete);
      if (!id) throw new Error('No valid ID found for delete');
      await api.delete(id);
      await loadData();
      setIsAlertOpen(false);
      setEntityToDelete(null);
      return Promise.resolve();
    } catch (error) {
      console.error('Delete failed:', error);
      return Promise.reject(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async (entity) => {
    setActionLoading(true);
    try {
      if (selectedEntity) {
        const id = getEntityId(selectedEntity);
        if (!id) throw new Error('No valid ID found for update');
        await api.update(id, entity);
      } else {
        await api.create(entity);
      }
      await loadData();
      setIsModalOpen(false);
      setMode(null);
      return Promise.resolve();
    } catch (error) {
      console.error('Save failed:', error);
      return Promise.reject(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEntity(null);
    setMode(null);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setEntityToDelete(null);
  };

  return {
    data,
    filteredData,
    isLoading,
    searchQuery,
    filters,
    selectedEntity,
    entityToDelete,
    isModalOpen,
    isAlertOpen,
    mode,
    actionLoading,
    handleSearch,
    handleFilter,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleDeleteConfirm,
    handleSave,
    handleCloseModal,
    handleCloseAlert,
    loadData,
  };
};

export default useCrud;

import { useState, useEffect, useCallback } from 'react';

const useCrud = (api, initialFilters = {}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityToDelete, setEntityToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  // Filter data for search and filters
  const filterData = useCallback(() => {
    if (!Array.isArray(data)) return setFilteredData([]);

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

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    setFilteredData(filtered);
  }, [data, searchQuery, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    filterData();
  }, [filterData]);

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
    setMode(entity ? 'view' : null);
    setIsModalOpen(!!entity && entity.mode !== 'view');
  };
  const handleDelete = (entity) => {
    setEntityToDelete(entity);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!entityToDelete) return;
    setActionLoading(true);
    try {
      await api.delete(entityToDelete.id);
      await loadData();
      setIsAlertOpen(false);
      setEntityToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async (entity) => {
    setActionLoading(true);
    try {
      if (selectedEntity) {
        await api.update(entity.id, entity);
      } else {
        await api.create(entity);
      }
      await loadData();
      setIsModalOpen(false);
      setMode(null);
    } catch (error) {
      console.error('Save failed:', error);
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

// src/hooks/useCrud.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';

const deepSearch = (obj, query) => {
  if (!obj) return false;

  if (typeof obj === 'string' || typeof obj === 'number') {
    return obj.toString().toLowerCase().includes(query.toLowerCase());
  }

  if (Array.isArray(obj)) {
    return obj.some((el) => deepSearch(el, query));
  }

  if (typeof obj === 'object') {
    return Object.values(obj).some((val) => deepSearch(val, query));
  }

  return false;
};

const useCrud = (api, initialFilters = {}, options = {}) => {
  const { transformData } = options;
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

  const loadData = useCallback(async () => {
    setData([]);
    setIsLoading(true);
    try {
      const response = await api.list(filters);
      let list = [];
      if (transformData) {
        list = transformData(response.data);
      } else {
        list = Array.isArray(response) ? response : response?.data || [];
      }
      setData(Array.isArray(list) ? list : []);
      // console.log('Data loaded:', list);
    } catch (error) {
      console.error('Error loading data:', error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [api, filters, transformData]);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let filtered = [...data];

    if (searchQuery) {
      filtered = filtered.filter((item) => deepSearch(item, searchQuery));
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter((item) => item[key] === value);
      }
    });

    // console.log('Filtered data for table:', filtered);
    return filtered;
  }, [data, searchQuery, filters]);

  useEffect(() => {
    // console.log('useEffect triggered. Calling loadData...');
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
    setActionLoading,
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

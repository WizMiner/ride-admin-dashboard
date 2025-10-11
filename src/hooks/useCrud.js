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

  // Helper: get correct ID field (id or _id) - Stable function
  const getEntityId = useCallback((entity) => entity?.id || entity?._id, []);

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

  // Live update helpers (stable deps)
  const upsertEntity = useCallback(
    (entity) => {
      const id = getEntityId(entity);
      if (!id) return;
      setData((prev) => {
        const exists = prev.some((item) => getEntityId(item) === id);
        if (exists) {
          const updatedData = prev.map((item) =>
            getEntityId(item) === id ? entity : item
          );
          // Update selectedEntity if matching
          if (selectedEntity && getEntityId(selectedEntity) === id) {
            setSelectedEntity(entity);
          }
          return updatedData;
        } else {
          return [...prev, entity];
        }
      });
    },
    [selectedEntity, getEntityId]
  );

  const addEntity = useCallback(
    (entity) => {
      const id = getEntityId(entity);
      if (!id) return;
      setData((prev) => [...prev, entity]);
    },
    [getEntityId]
  );

  const updateEntity = useCallback(
    (entity) => {
      const id = getEntityId(entity);
      if (!id) return;
      setData((prev) =>
        prev.map((item) => (getEntityId(item) === id ? entity : item))
      );
      // Update selectedEntity if matching
      if (selectedEntity && getEntityId(selectedEntity) === id) {
        setSelectedEntity(entity);
      }
    },
    [selectedEntity, getEntityId]
  );

  const removeEntity = useCallback(
    (id) => {
      if (!id) return;
      setData((prev) => prev.filter((item) => getEntityId(item) !== id));
      // Clear selected if matching
      if (selectedEntity && getEntityId(selectedEntity) === id) {
        setSelectedEntity(null);
      }
      // Clear delete if matching
      if (entityToDelete && getEntityId(entityToDelete) === id) {
        setEntityToDelete(null);
      }
    },
    [selectedEntity, entityToDelete, getEntityId]
  );

  // CRUD handlers
  const handleSearch = useCallback((query) => setSearchQuery(query), []);
  const handleFilter = useCallback(
    (key, value) => setFilters((prev) => ({ ...prev, [key]: value })),
    []
  );

  const handleAdd = useCallback(() => {
    setSelectedEntity(null);
    setMode('add');
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((entity) => {
    setSelectedEntity(entity);
    setMode('edit');
    setIsModalOpen(true);
  }, []);

  const handleView = useCallback((entity) => {
    setSelectedEntity(entity);
    setMode('view');
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((entity) => {
    setEntityToDelete(entity);
    setIsAlertOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!entityToDelete) return;
    setActionLoading(true);
    try {
      const id = getEntityId(entityToDelete);
      if (!id) throw new Error('No valid ID found for delete');
      await api.delete(id);
      removeEntity(id);
      setIsAlertOpen(false);
      setEntityToDelete(null);
      return Promise.resolve();
    } catch (error) {
      console.error('Delete failed:', error);
      return Promise.reject(error);
    } finally {
      setActionLoading(false);
    }
  }, [entityToDelete, api, removeEntity, getEntityId]);

  const handleSave = useCallback(
    async (entity) => {
      setActionLoading(true);
      try {
        let savedEntity;
        if (selectedEntity) {
          const id = getEntityId(selectedEntity);
          if (!id) throw new Error('No valid ID found for update');
          const response = await api.update(id, entity);
          savedEntity = response?.data || response;
          updateEntity(savedEntity);
        } else {
          const response = await api.create(entity);
          savedEntity = response?.data || response;
          addEntity(savedEntity);
        }
        setIsModalOpen(false);
        setMode(null);
        return Promise.resolve(savedEntity);
      } catch (error) {
        console.error('Save failed:', error);
        return Promise.reject(error);
      } finally {
        setActionLoading(false);
      }
    },
    [selectedEntity, api, updateEntity, addEntity, getEntityId]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEntity(null);
    setMode(null);
  }, []);

  const handleCloseAlert = useCallback(() => {
    setIsAlertOpen(false);
    setEntityToDelete(null);
  }, []);

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
    // Live updates
    upsertEntity,
    addEntity,
    updateEntity,
    removeEntity,
  };
};

export default useCrud;

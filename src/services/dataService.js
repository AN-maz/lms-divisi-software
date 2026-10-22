// Cache for fetched data to avoid duplicate requests
const dataCache = new Map();

// Unified fetch function with error handling and caching
export const fetchData = async (path, cacheKey = null) => {
  const key = cacheKey || path;
  
  // Return cached data if available
  if (dataCache.has(key)) {
    return dataCache.get(key);
  }
  
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
    }
    
    // Handle JSON response
    const data = await response.json();
    
    // Cache the data
    dataCache.set(key, data);
    
    return data;
    
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error;
  }
};

// Specialized data loaders for different data types
export const dataLoaders = {
  silabus: (cacheKey = 'silabus') => fetchData('/silabus.json', cacheKey),
  mentors: (cacheKey = 'mentors') => fetchData('/data/mentors.json', cacheKey),
  quizzes: (cacheKey = 'quizzes') => fetchData('/data/quizzes.json', cacheKey),
  raw: fetchData,
};

// Utility to extract all modules from silabus
export const extractAllModules = (silabusData) => {
  if (!silabusData) return [];
  return silabusData.flatMap(group => group.modules || []);
};

// Utility to find module by ID across silabus
export const findModuleById = (silabusData, moduleId) => {
  if (!silabusData) return null;
  const allModules = extractAllModules(silabusData);
  return allModules.find(module => module.id === parseInt(moduleId, 10)) || null;
};

// Clear data cache (useful for testing or fresh loads)
export const clearDataCache = () => {
  dataCache.clear();
};
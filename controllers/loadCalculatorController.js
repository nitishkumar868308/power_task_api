const LoadPlan = require("../models/LoadPlan");

// Container Types API (Example: 20ft, 40ft, etc.)
const getContainerTypes = async (req, res) => {
  const containerTypes = [
    { name: "20ft", length: 589, width: 235, height: 239 },
    { name: "40ft", length: 1200, width: 235, height: 239 },
    // More container types...
  ];

  res.json(containerTypes);
};

// Calculate Load API
const calculateLoad = async (req, res) => {
  const { items, containerType } = req.body;

  // Check if items is defined and is an array
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Items should be an array" });
  }

  // Check if items array is empty
  const totalItems = items.length;

  if (totalItems === 0) {
    return res.status(400).json({ error: "No items provided" });
  }

  // Get container type details
  const containerTypes = [
    { name: "20ft", length: 589, width: 235, height: 239 },
    { name: "40ft", length: 1200, width: 235, height: 239 },
  ];

  const container = containerTypes.find((type) => type.name === containerType);

  if (!container) {
    return res.status(400).json({ error: "Invalid container type" });
  }

  // Calculate load based on item dimensions and container size
  let totalVolume = 0;
  let totalWeight = 0;

  items.forEach((item) => {
    const volume = item.length * item.width * item.height * item.quantity;
    totalVolume += volume;
    totalWeight += item.weight * item.quantity;
  });

  // Example: Calculating number of containers based on volume
  const containerVolume = container.length * container.width * container.height;
  const totalContainers = Math.ceil(totalVolume / containerVolume);

  const layout = [
    { containerType, totalContainers, totalVolume, totalWeight },
    // Other layout details can go here
  ];

  res.json({ totalContainers, layout });
};

// Save Load Plan (Optional)
const saveLoadPlan = async (req, res) => {
  const { userId, containerType, items, layout } = req.body;

  const loadPlan = new LoadPlan({
    userId,
    containerType,
    items,
    layout,
  });

  await loadPlan.save();
  res.status(201).json({ message: "Load plan saved" });
};

module.exports = { getContainerTypes, calculateLoad, saveLoadPlan };

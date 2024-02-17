const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');

const getItemById = async (itemId) => {
  return await Item.findById(itemId);
};

const createItem = async (itemBody) => {
  return await Item.create(itemBody);
};

const listItems = async () => {
  return await Item.find({});
};

const getItem = async (itemId) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  return item;
};

const getPopularItems = async () => {
  return await Item.find({}).sort({ votesCount: -1, recommendationsCount: -1 });
};

const getRecommendedItems = async () => {
  return await Item.find({}).sort({ recommendationsCount: -1, votesCount: -1 });
};

const updateItem = async (itemId, itemBody) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  Object.assign(item, itemBody);
  item.save();
  return item;
};

const deleteItem = async (itemId) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  item.remove();
  return item;
};

const createURL = async (itemId, createBody) => {
  const item = await getItem(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  const updatedItem = await Item.findOneAndUpdate({ _id: itemId }, { $push: { purchaseSites: createBody } }, { new: true });
  return updatedItem;
};

const updateURL = async (itemId, siteId, updateBody) => {
  const item = await getItem(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  const updatedItem = await Item.findOneAndUpdate(
    { _id: itemId, 'purchaseSites._id': siteId },
    { $set: { 'purchaseSites.$': updateBody } },
    { new: true }
  );
  return updatedItem;
};

// User.findOneAndUpdate(
//     {  _id: "Manasa" },
//     { $push: { "sensors.$[outer].measurements": { "time": req.body.time } } }
//     { "arrayFilters:" [{"outer._id": ObjectId("57da0a4bf3884d1fb2234c74")}]
// );

const deleteURL = async (itemId, siteId) => {
  const item = await getItem(itemId);
  console.log(item);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  const updatedItem = await Item.findOneAndUpdate(
    { _id: itemId, 'purchaseSites._id': siteId },
    { purchaseSites: { $pull: { 'purchaseSites._id': siteId } } }, //
    { new: true }
  );

  console.log(updatedItem);
  return updatedItem;
};

const getURLS = async (itemId) => {
  const item = await getItem(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found!');
  }
  return item.purchaseSites;
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  listItems,
  getPopularItems,
  getRecommendedItems,
  getItem,
  createURL,
  updateURL,
  deleteURL,
  getURLS,
};

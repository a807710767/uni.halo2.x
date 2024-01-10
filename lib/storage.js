
function get(key) {
  if (!key || !_has(key)) {
    return '';
  }
  return uni.getStorageSync(key)
}

function all() {
  return uni.getStorageInfoSync()
}

function set(key, data) {
  if (!key) {
    return;
  }
  uni.setStorageSync(key, data)
}

function remove(key) {
  if (!key || !_has(key)) {
    return;
  }
  uni.removeStorageSync(key)
}

function clearAll() {
  const res = uni.getStorageInfoSync();
  res.keys.map((item) => {
    if (item == 'redirect' || item == 'spread') {
      return
    }
    remove(item)
  })
  console.log(res)
  // debugger
  // uni.clearStorageSync()
}

function _has(key) {
  if (!key) {
    return
  }
  let value = uni.getStorageSync(key)
  if (value) {
    return true
  }
  return false
}

export default {
  get,
  all,
  set,
  remove,
  clearAll,
  has: _has
};

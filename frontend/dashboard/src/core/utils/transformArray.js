function transformArrayToObj(arr) {
  // Create a result object instead of an array
  let result = {};

  // Iterate over the input array
  arr.forEach((item) => {
      // Find or create the group in the result object
      if (!result[item.group]) {
          result[item.group] = {};
      }

      // Find or create the category in the group
      if (!result[item.group][item.category]) {
          result[item.group][item.category] = [];
      }

      const itemObj = {
          component: item.component,
          variations: item.variations,
          version: item.version,
      };

      if(item.hide) {
            itemObj.hide = item.hide;
      }

      // Add the component to the category
      result[item.group][item.category].push(itemObj);
  });

  return result;
}

export default transformArrayToObj;
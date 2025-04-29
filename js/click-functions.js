import Requests from "./api.js";
import { updateWeather } from "./helper-functions.js";

export const fetchByUnitOption = ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    Requests.setApiSettings({ units: target.dataset.option });
    updateWeather(Requests.apiSettings);
  }
};

// export const removeActiveOnBlur = ({ target }) => {
//   const isSelectionContainer = target === unitSelectionContainer;
//   if (!isSelectionContainer) removeActive(unitSelectionContainer);
// };

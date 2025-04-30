import Requests from "./api.js";
import { setActive, updateWeather } from "./helper-functions.js";

export const fetchByUnitOption = ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    Requests.setApiSettings({ units: target.dataset.option });
    updateWeather(Requests.apiSettings);
  }
};

export const setUnitOption = ({ target }) => {
  const unitOption = "unit-option";
  const isUnitOption = target.classList.contains("unit-option");
  if (isUnitOption) {
    setActive(target, `.${unitOption}`);
    Requests.setApiSettings({ units: target.id });
    updateWeather(Requests.apiSettings);
  }
};

// export const removeActiveOnBlur = ({ target }) => {
//   const isSelectionContainer = target === unitSelectionContainer;
//   if (!isSelectionContainer) removeActive(unitSelectionContainer);
// };

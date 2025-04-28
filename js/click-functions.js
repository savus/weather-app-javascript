import Requests from "./api.js";
import {
  removeActive,
  toggleActive,
  updateWeather,
} from "./helper-functions.js";
import { searchBox, unitSelectionContainer } from "./index.js";

export const fetchByCityName = () => {
  console.log("success");
  Requests.setApiSettings({ cityName: searchBox.value });
  updateWeather(Requests.apiSettings);
};

export const toggleUnitsContainer = ({ target }) => {
  toggleActive(target);
};

export const fetchByUnitOption = ({ target }) => {
  const isOption = target.dataset.option;
  if (isOption) {
    Requests.apiSettings.units = target.dataset.option;
    updateWeather(Requests.apiSettings);
  }
};

export const removeActiveOnBlur = ({ target }) => {
  const isSelectionContainer = target === unitSelectionContainer;
  if (!isSelectionContainer) removeActive(unitSelectionContainer);
};

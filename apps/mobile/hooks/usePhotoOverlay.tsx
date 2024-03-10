import {useRecoilState} from "recoil";
import {
  showDateDefaultState,
  showLocationDefaultState,
  showLogoDefaultState,
  showTimeDefaultState,
  textBackgroundColourState,
  textColourState
} from "../state/atoms";

export const usePhotoOverlayDefaults = () => {
  const [showDateDefault, setShowDateDefault] = useRecoilState(showDateDefaultState);
  const [showLocationDefault, setShowLocationDefault] = useRecoilState(showLocationDefaultState);
  const [showTimeDefault, setShowTimeDefault] = useRecoilState(showTimeDefaultState);
  const [showLogoDefault, setShowLogoDefaultState] = useRecoilState(showLogoDefaultState);
  const [textBackgroundColourDefault, setTextBackgroundColourDefault] = useRecoilState(textBackgroundColourState);
  const [textColourDefault, setTextColourDefault] = useRecoilState(textColourState);


  const toggleDate = () => setShowDateDefault(!showDateDefault);
  const toggleTime = () => setShowTimeDefault(!showTimeDefault);
  const toggleLocation = () => setShowLocationDefault(!showLocationDefault);
  const toggleLogo = () => setShowLogoDefaultState(!showLogoDefault);

  return {
    toggleLogo,
    toggleDate,
    toggleTime,
    toggleLocation,
    setTextBackgroundColourDefault,
    setTextColourDefault,
    showDateDefault,
    showLogoDefault,
    showTimeDefault,
    showLocationDefault,
    textColourDefault,
    textBackgroundColourDefault
  };
};
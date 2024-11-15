import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const BlueStar = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    fill="none"
    {...props}
  >
    <Path
      fill="#00F"
      d="m78.8 0 35.9 67.2h2l30.4-45.6-3.4 33.3 15.8-8.5-9.6 22.3 37.9 1.7-40.4 20L200 110l-51.2 12.6 10.6 21.4 10.7 16-3.9-2.2 6.8 13.7-31.8-16.4-3.6 34.8-18.6-40.2L95.3 200l-9-47.7L48 194l4.4-39.3L48 157l5-7.7 2.6-22.1-41-5.6 23-13.4L0 104.3l66.2-28L50.7 55l7.5 2.8L49 42l21.6 13.6L78.8 0Z"
    />
  </Svg>
);
export default BlueStar;

import { TweenLite, gsap } from "gsap";
gsap.registerPlugin(TweenLite);

const DEFAULT_DURATION = 3;

export const hideElement = (el: any, speed = DEFAULT_DURATION) => {
  const oldSpacing: any = { height: el.clientHeight };
  const newSpacing: any = { height: 0 };
  const additionalSpacingProperties = [
    "paddingTop",
    "paddingBottom",
    "marginTop",
    "marginBottom"
  ];

  additionalSpacingProperties.forEach((property: any) => {
    const value = window.getComputedStyle(el)[property];
    if (value !== "0px") {
      oldSpacing[property] = value;
      newSpacing[property] = 0;
    }
  });

  el.showHideProps = oldSpacing;
  TweenLite.to(el, speed, {
    overflow: "hidden",
    ease: "power4",
    ...newSpacing,
  });
};

export const showElement = (el: any, speed = DEFAULT_DURATION) => {
  const showHideProps = el.showHideProps || {};
  TweenLite.to(el, speed, {
    ease: "power4",
    clearProps: "all",
    ...showHideProps
  });
};

export default { showElement, hideElement };
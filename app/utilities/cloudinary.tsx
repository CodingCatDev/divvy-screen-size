import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
import { fill, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";

// Import required qualifiers.
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { northEast, northWest } from "@cloudinary/url-gen/qualifiers/compass";
import { colorize } from "@cloudinary/url-gen/actions/effect";
import { ColorizeEffectAction } from "@cloudinary/url-gen/actions/effect/Colorize";

// Create and configure your Cloudinary instance.
const cld = new Cloudinary({
  cloud: {
    cloudName: "ajonp",
  },
});

export const getCloudinaryImage = ({
  menuBarHeight,
  width,
  height,
  getScreenHeight,
  getScreenMargin,
  getBoxSize,
  rows,
  columns,
  shrink,
}: {
  menuBarHeight: number;
  width: number;
  height: number;
  getScreenHeight: () => number;
  getScreenMargin: () => number;
  getBoxSize: () => { width: number; height: number };
  rows: number;
  columns: number;
  shrink?: number;
}) => {
  // Use the image with public ID, 'front_face'.
  const myImage = cld.image("main-codingcatdev-photo/16x9");
  const screenMargin = getScreenMargin();
  const screenHeight = getScreenHeight();
  const box = getBoxSize();
  const boxWidth = Math.round(box.width);
  const boxHeight = Math.round(box.height);

  let reducedMenuBarHeight;
  let reducedWidth;
  let reducedHeight;
  let reducedScreenMargin;
  let reducedScreenHeight;
  let reducedBoxWidth;
  let reducedBoxHeight;

  if (shrink) {
    reducedMenuBarHeight = Math.round(menuBarHeight / shrink);
    reducedWidth = Math.round(width / shrink);
    reducedHeight = Math.round(height / shrink);
    reducedScreenMargin = Math.round(screenMargin / shrink);
    reducedScreenHeight = Math.round(screenHeight / shrink);
    reducedBoxWidth = Math.round(boxWidth / shrink);
    reducedBoxHeight = Math.round(boxHeight / shrink);
  } else {
    reducedMenuBarHeight = menuBarHeight;
    reducedWidth = width;
    reducedHeight = height;
    reducedScreenMargin = screenMargin;
    reducedScreenHeight = screenHeight;
    reducedBoxWidth = boxWidth;
    reducedBoxHeight = boxHeight;
  }

  // Apply the transformation.
  myImage
    // Crop the image.
    .resize(thumbnail().width(reducedWidth).height(reducedHeight))
    //Menu Bar
    .overlay(
      source(
        image(`1`).transformation(
          new Transformation()
            .resize(
              fill()
                .width(Math.round(reducedWidth))
                .height(Math.round(menuBarHeight))
            )
            .effect(new ColorizeEffectAction().color("#391").level("colorize"))
        )
      ).position(new Position().gravity(compass(northWest())))
    )
    //Margin left
    .overlay(
      source(
        image(`1`).transformation(
          new Transformation()
            .resize(
              fill()
                .width(Math.round(reducedScreenMargin / 2))
                .height(Math.round(reducedScreenHeight))
            )
            .effect(new ColorizeEffectAction().color("red").level("colorize"))
        )
      ).position(
        new Position()
          .gravity(compass(northWest()))
          .offsetY(reducedMenuBarHeight)
      )
    )
    .overlay(
      source(
        image(`1`).transformation(
          new Transformation()
            .resize(
              fill()
                .width(Math.round(reducedScreenMargin / 2))
                .height(Math.round(reducedScreenHeight))
            )
            .effect(new ColorizeEffectAction().color("red").level("colorize"))
        )
      ).position(
        new Position()
          .gravity(compass(northEast()))
          .offsetY(reducedMenuBarHeight)
      )
    );

  /*
   * TODO: Can't currently go above about 6x6.
   * Possibly could create 2 rows and make those repeat?
   */
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const rowColor = (row + 1 + column + 1) % 2 == 0 ? "#666" : "#333";

      const offsetY = Math.round(
        reducedMenuBarHeight + Math.round(reducedBoxHeight * row)
      );
      const offsetX = Math.round(
        reducedScreenMargin / 2 + Math.round(reducedBoxWidth * column)
      );

      myImage.overlay(
        source(
          image(`1`).transformation(
            new Transformation()
              .resize(fill().width(reducedBoxWidth).height(reducedBoxHeight))
              .effect(
                new ColorizeEffectAction().color(rowColor).level("colorize")
              )
          )
        ).position(
          new Position()
            .gravity(compass(northWest()))
            .offsetY(offsetY)
            .offsetX(offsetX)
        )
      );
    }
  }
  return myImage;
};

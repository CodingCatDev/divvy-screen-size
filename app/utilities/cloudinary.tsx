import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";

// Import required qualifiers.
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";

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
    .resize(fill().width(reducedWidth).height(reducedHeight))
    //Menu Bar
    .overlay(
      source(
        text("a", new TextStyle("arial", 1))
          .textColor("#321")
          .backgroundColor("#321")
          .transformation(
            new Transformation().resize(
              fill().width(reducedWidth).height(reducedMenuBarHeight)
            )
          )
      ).position(new Position().gravity(compass("north_west" as any)))
    )
    //Margin left
    .overlay(
      source(
        text("a", new TextStyle("arial", 1))
          .backgroundColor("red")
          .transformation(
            new Transformation().resize(
              fill()
                .width(Math.round(reducedScreenMargin / 2))
                .height(Math.round(reducedScreenHeight))
            )
          )
      ).position(
        new Position()
          .gravity(compass("north_west" as any))
          .offsetY(reducedMenuBarHeight)
      )
    )
    //Margin right
    .overlay(
      source(
        text("a", new TextStyle("arial", 1))
          .backgroundColor("red")
          .transformation(
            new Transformation().resize(
              fill()
                .width(Math.round(reducedScreenMargin / 2))
                .height(Math.round(reducedScreenHeight))
            )
          )
      ).position(
        new Position()
          .gravity(compass("north_west" as any))
          .offsetY(reducedMenuBarHeight)
          .offsetX(
            Math.round(reducedScreenMargin / 2 + columns * reducedBoxWidth)
          )
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
          text("a", new TextStyle("arial", 1))
            .backgroundColor(rowColor)
            .transformation(
              new Transformation().resize(
                fill().width(reducedBoxWidth).height(reducedBoxHeight)
              )
            )
        ).position(
          new Position()
            .gravity(compass("north_west" as any))
            .offsetY(offsetY)
            .offsetX(offsetX)
        )
      );
    }
  }
  return myImage;
};

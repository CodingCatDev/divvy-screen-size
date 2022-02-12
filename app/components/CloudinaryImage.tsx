import React from "react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail, scale, fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";

// Import required qualifiers.
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";

// Create and configure your Cloudinary instance.
const cld = new Cloudinary({
  cloud: {
    cloudName: "ajonp",
  },
});

const CloudinaryImage = ({
  menuBarHeight,
  width,
  height,
  getScreenWidth,
  getScreenHeight,
  getScreenMargin,
  getBoxSize,
  rows,
  columns,
}: {
  menuBarHeight: number;
  width: number;
  height: number;
  getScreenWidth: () => number;
  getScreenHeight: () => number;
  getScreenMargin: () => number;
  getBoxSize: () => { width: number; height: number };
  rows: number;
  columns: number;
}) => {
  // Use the image with public ID, 'front_face'.
  const myImage =
    width > 3840
      ? cld.image("main-codingcatdev-photo/8k")
      : cld.image("main-codingcatdev-photo/4k");

  const screenMargin = getScreenMargin();
  const screenHeight = getScreenHeight();
  const box = getBoxSize();
  const boxWidth = Math.round(box.width);
  const boxHeight = Math.round(box.height);

  // Apply the transformation.
  myImage
    // Crop the image.
    .overlay(
      source(
        text("Menu Bar", new TextStyle("arial", 3))
          .textColor("#1B824D")
          .backgroundColor("#1B824D")
          .transformation(
            new Transformation().resize(
              fill().width(width).height(menuBarHeight)
            )
          )
      ).position(new Position().gravity(compass("north_west" as any)))
    )
    .overlay(
      source(
        text("Margin left", new TextStyle("arial", 3))
          .textColor("white")
          .backgroundColor("red")
          .transformation(
            new Transformation().resize(
              fill()
                .width(Math.round(screenMargin / 2))
                .height(Math.round(screenHeight))
            )
          )
      ).position(
        new Position()
          .gravity(compass("north_west" as any))
          .offsetY(menuBarHeight)
      )
    )
    .overlay(
      source(
        text("Margin right", new TextStyle("arial", 3))
          .textColor("red")
          .backgroundColor("red")
          .transformation(
            new Transformation().resize(
              fill()
                .width(Math.round(screenMargin / 2))
                .height(Math.round(screenHeight))
            )
          )
      ).position(
        new Position()
          .gravity(compass("north_west" as any))
          .offsetY(menuBarHeight)
          .offsetX(Math.round(screenMargin / 2 + columns * boxWidth))
      )
    );

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const offsetY = Math.round(menuBarHeight + Math.round(boxHeight * row));
      const offsetX = Math.round(
        screenMargin / 2 + Math.round(boxWidth * column)
      );
      myImage.overlay(
        source(
          text("Box 1", new TextStyle("arial", 3))
            .textColor("white")
            .backgroundColor(`#${randomColor}`)
            .transformation(
              new Transformation().resize(
                fill().width(boxWidth).height(boxHeight)
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

  // Render the transformed image in a React component.
  return (
    <a
      href={myImage
        .resize(fill().width(width).height(height))
        .format("png")
        .toURL()}
      target="_blank"
    >
      {height && width && menuBarHeight && (
        <AdvancedImage
          cldImg={myImage}
          plugins={[placeholder({ mode: "pixelate" })]}
        />
      )}
    </a>
  );
};

export default CloudinaryImage;

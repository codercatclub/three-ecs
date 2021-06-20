import {
  TransformC,
  Object3DC,
  GLTFModelC,
  CamC,
  GeometryC,
  PointLightC,
  HemisphereLightC,
} from "./components";
import { newEntity, Entity } from "./index";
import { Vector3 } from "three";

/** Helper functions to construct commonly used Entities */

interface AssetArchetype {
  src: string;
  position?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
}

export const Asset = ({
  src,
  position = new Vector3(),
  rotation = new Vector3(),
  scale = new Vector3(1, 1, 1)
}: AssetArchetype): Entity =>
  newEntity([
    { ...GLTFModelC, data: { src } },
    { ...TransformC, data: { position, rotation, scale } },
    Object3DC,
  ]);

export const Camera = (
  position = new Vector3(0, 0, 0),
  rotation = new Vector3(0, 0, 0),
  fov: number = 70,
  aspect: number = window.innerWidth / window.innerHeight,
  near: number = 0.01,
  far: number = 1000
) =>
  newEntity(
    [
      {
        ...TransformC,
        data: {
          ...TransformC.data,
          position,
          rotation,
        },
      },
      { ...CamC, data: { ...CamC.data, fov, aspect, near, far } },
    ],
    "Camera"
  );

export type GeometryType = "Box" | "Sphere";

export const StandardPrimitive = (
  type: GeometryType,
  position = new Vector3(0, 0, 0),
  rotation = new Vector3(0, 0, 0),
  scale = new Vector3(1, 1, 1)
) =>
  newEntity([
    {
      ...TransformC,
      data: {
        ...TransformC.data,
        position,
        rotation,
        scale,
      },
    },
    { ...GeometryC, data: { type } },
    Object3DC,
  ]);

export const PointLight = (
  color = 0xffffff,
  intensity = 20,
  position = new Vector3(0, 0, 0)
) =>
  newEntity([
    {
      ...PointLightC,
      data: { ...PointLightC.data, color, intensity },
    },
    Object3DC,
    {
      ...TransformC,
      data: { ...TransformC.data, position },
    },
  ]);

export const HemisphereLight = ({
  skyColor = 0xffffbb,
  groundColor = 0x080820,
  intensity = 2,
  position = new Vector3(0, 0, 0)
}) =>
  newEntity([
    {
      ...HemisphereLightC,
      data: { ...PointLightC.data, skyColor, groundColor, intensity },
    },
    Object3DC,
    {
      ...TransformC,
      data: { ...TransformC.data, position },
    },
  ]);
